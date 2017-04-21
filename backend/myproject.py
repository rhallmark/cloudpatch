from flask import Flask, jsonify, url_for, redirect, request, render_template
from flask_pymongo import PyMongo
from pymongo import MongoClient
from pymongo.collation import Collation

from flask_restful import Resource, Api, abort
from flask_jwt import JWT, jwt_required, current_identity
from werkzeug.security import safe_str_cmp
from functools import wraps

from flask_restful.utils import cors

import hashlib, uuid
import datetime

#from flask_cors import CORS, cross_origin
#TO RUN

app = Flask(__name__, static_url_path='')
app.config["MONGO_DBNAME"] = "cloudpatch"
mongo = PyMongo(app, config_prefix='MONGO')
APP_URL = "http://127.0.0.1:8100" #http://159.203.167.54/
api = Api(app)
#CORS(app)



##DEFAULT JWT STUFF###############################################4
app.config['SECRET_KEY'] = 'super-secret'

app.config['JWT_EXPIRATION_DELTA'] = datetime.timedelta(seconds=86400)

class User(object):
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password

    def __str__(self):
        return "User(id='%s')" % self.id

users = [
    User(1, 'derek', 'password'),
    User(2, 'user2', 'abcxyz'),
    User(100, 'russ', 'password')
]

username_table = {u.username: u for u in users}
userid_table = {u.id: u for u in users}

#@cors.crossdomain(origin='*',headers='*')
def authenticate(username, password):
  #user = username_table.get(username, None)

  user_id = 0
  user_info = mongo.db.users.find_one({'username':username}, {'_id':1, 'username':1,'password':1, 'salt':1})
  print("AUTHENTICATING USER")
  print("PRINTING USER")
  print(user_info)
  print(type(user_info))

  if not user_info:
    print("USER DOES NOT EXIST")
    return

  print("username: " + user_info['username'])
  print("user ID: " + str(user_info['_id']))
  user_id = int(user_info['_id'])
  

  hashed_password = hashlib.sha512(password + user_info['salt']).hexdigest()
  user1 = User(user_id, username = user_info['username'], password = hashed_password)
  print(user1)
  print(hashed_password)
  print(user_info['password'])
  print(userid_table)
  if user1 and safe_str_cmp(hashed_password.encode('utf-8'), user_info['password'].encode('utf-8')):
    print("GOOD")
    return user1

  elif user1:
    print("USERNAME IS EXISTS, PASSWORD IS INCORRECT")

  else:
    print("USER DOES NOT EXIST")




def identity(payload):
    print("IDENTIFYING USER")
    user_id = payload['identity']
    print(payload['identity'])
    user_info = mongo.db.users.find_one({'_id':user_id},{'_id':1, 'username':1})

    if user_info:
      print(userid_table.get(user_id, None))
      return userid_table.get(user_id, None)

jwt = JWT(app, authenticate, identity)

def checkuser(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if current_identity.username == 'russ':
            return func(*args, **kwargs)
        return abort(401)
    return wrapper


####END JWT STUFF ###############################################


@app.route("/")
#@cross_origin()
def hello():
  return "<h1 style='color:blue'>Hello There!</h1>"

# @app.route("/cloudpatch")
# def cloudpatch():
#   return render_template("www/index.html", title="cp")

@app.route("/cloudpatch")
def cloudpatch1():
  return app.send_static_file("index.html")


@app.route("/user/<username>")
def show_user(username):
  return "hello %s" %username

class HelloWorld(Resource):
  def get(self):
    return {'hello': 'world'}




#for creating a new patient, assigns them the next ID in the sequence
def getNextSequence(name):
  ret = mongo.db.counters.find_and_modify(
                      query={'_id':name}, 
                      update={"$inc": {'seq': 1}}, 
                      upsert=False, 
                      full_response= True)

  return ret['value']['seq']

#Patient resource
#get /patient/<int:id>
#    gets data about patient with specified id
#post /patient/<int:id> 
#    updates data for patient with specified id
#delete /patient/<int:id>
#    deletes patient with the specified id
class Patient(Resource):

  @cors.crossdomain(origin='*',headers='Authorization')
  @jwt_required()
  def get(self, id=None):
    data=[]

    if id:
      patient_info = mongo.db.patients.find_one({"_id": id})

      if patient_info:
        print patient_info
        return jsonify(patient_info)
      else:
         return jsonify({"response": "no patient found for " + str(id)})


  @cors.crossdomain(origin='*',headers='Authorization')
  @jwt_required()
  def post(self, id=None):

    data = request.get_json()
    if id:
      if not data:
        data = jsonify({"response" : "ERROR"})
        return jsonify(data)
      else:
        print data
        print id
        print mongo.db.patients.update({"_id":id}, {'$set': data})
        return jsonify({"response" : "success"})

    if not data:
      data = jsonify({"response" : "ERROR"})
      return jsonify(data)
    else:
      print data
      id = data.get('_id')
      print id
      print mongo.db.patients.update({"_id":id}, {'$set': data})
      return jsonify({"response" : "success"})

  @jwt_required()
  def delete(self, id=None):
    if id:
      print id
      print mongo.db.patients.remove({"_id":id})
      return jsonify({"response" : "success"})
    else:
      return jsonify({"response" : "ERROR"})


  @cors.crossdomain(origin='*',headers='Content-Type, Authorization')
  def options (self):
    return {'Allow' : 'GET,POST,DELETE,OPTIONS' }, 200, \
    { 'Access-Control-Allow-Origin': '*', \
      'Access-Control-Headers': 'Content-Type, Authorization', \
      'Access-Control-Allow-Methods' : 'GET,POST,DELETE,OPTIONS' }


#endpoint for newpatient
#post /newPatient.
#expects json data as follows:
#{ 
#  "patient_first_name":"Robert",
#  "patient_last_name":"Paulson"
#}
class NewPatient(Resource):
  #decorators = [jwt_required()]

  @cors.crossdomain(origin='*',headers='Authorization')
  @jwt_required()
  def post(self):
    print("CREATING NEW PATIENT")
    data = request.get_json()
    if not data:
      data = {"response" : "ERROR"}
      return jsonify(data)
    else:
      print("DATA SENT:")
      print data
      first_name = data.get('patient_first_name')
      last_name = data.get('patient_last_name')
      id = getNextSequence('patient_id')
      print("NEW PATIENT HERE")
      mongo.db.patients.insert({'_id':id,
        'patient_first_name':first_name,
        'patient_last_name':last_name})
      
      #print("NEW PATIENT HERE 2")
      return jsonify({'_id':id})

  @cors.crossdomain(origin='*',headers='Content-Type, Authorization')
  def options (self):
    return {'Allow' : 'GET' }, 200, \
    { 'Access-Control-Allow-Origin': '*', \
      'Access-Control-Headers': 'Content-Type, Authorization', \
      'Access-Control-Allow-Methods' : 'GET,POST' }



#gets a full list of patients
# /patientList
class PatientList(Resource):

  #decorators = [jwt_required()]

  @cors.crossdomain(origin='*',headers='Authorization,Content-Type')
  @jwt_required()
  def get(self):
    data = []

    patient_info = mongo.db.patients.find({}, {'_id':1, 'patient_first_name':1,'patient_last_name':1}) \
    .sort([('patient_last_name', 1), ('patient_first_name', 1)]) \
    .collation(Collation(locale='en'))
    
    for patient in patient_info:
      data.append(patient)

    return jsonify(data)


  @cors.crossdomain(origin='*',headers='Content-Type, Authorization')
  def options (self):
    return {'Allow' : 'GET, HEAD, OPTIONS' }, 200, \
    { 'Access-Control-Allow-Origin': '*', \
      'Access-Control-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization', \
      'Access-Control-Allow-Methods' : 'GET, HEAD, OPTIONS' }

class SeqNumber(Resource):
  def get(self):
    lol = getNextSequence("patient_id")
    print lol


#searchs by first name and last name
class Search(Resource):
  #decorators = [jwt_required()]

  @cors.crossdomain(origin='*',headers='Content-Type, Authorization')
  @jwt_required()
  def post(self):
    data = request.get_json()
    if not data:
      data = {"response" : "ERROR"}
      return jsonify(data)
    else:
      print data
      searchTerm = data.get('searchTerm')
      print searchTerm

      return_data = []
      patients = mongo.db.patients.find({"$or":[ {'patient_first_name': {"$regex": searchTerm, "$options": 'i'}},
        {'patient_last_name': {"$regex": searchTerm, "$options": 'i'}} ]},
        {'_id':1, 'patient_first_name':1, 'patient_last_name':1}) \
        .sort([('patient_last_name', 1), ('patient_first_name', 1)]) \
        .collation(Collation(locale='en'))

      for patient in patients:
        return_data.append(patient)

      return jsonify(return_data)

  @cors.crossdomain(origin='*',headers='Content-Type, Authorization')
  def options (self):
    return {'Allow' : 'GET' }, 200, \
    { 'Access-Control-Allow-Origin': '*', \
      'Access-Control-Headers': 'Content-Type, Authorization', \
      'Access-Control-Allow-Methods' : 'GET,POST' }


class NewUser(Resource):

  @cors.crossdomain(origin='*')
  @jwt_required()
  def post(self):
    data = request.get_json()
    if not data:
      data = {"response" : "ERROR"}
      return jsonify(data)
    else:
      print data
      first_name = data.get('user_first_name')
      last_name = data.get('user_last_name')
      user_name = data.get('username')
      password = data.get('password')
      password_conf = data.get('password_conf')
      uid = getNextSequence('user_id')
      account_type = data.get('account_type')
      bio = data.get('bio')
      user_prefix = data.get('user_prefix')
      contact_info = data.get('contact_info')


      salt = uuid.uuid4().hex
      hashed_password = hashlib.sha512(password + salt).hexdigest()


      mongo.db.users.insert({'_id':uid,
        'user_first_name':first_name,
        'user_last_name':last_name,
        'username':user_name,
        'salt':salt,
        'password':hashed_password,
        'account_type':account_type,
        'bio':bio,
        'user_prefix':user_prefix,
        'contact_info':contact_info})
      
      return jsonify({'_id':uid})

  @cors.crossdomain(origin='*',headers='Content-Type, Authorization')
  def options (self):
    return {'Allow' : 'POST' }, 200, \
    { 'Access-Control-Allow-Origin': '*', \
      'Access-Control-Headers': 'Content-Type, Authorization', \
      'Access-Control-Allow-Methods' : 'POST' }

#User resource
#get /user/<int:id>
#    gets data about user with specified id
#post /user/<int:id> 
#    updates data for user with specified id
#delete /user/<int:id>
#    deletes user with the specified id
class UserResource(Resource):

  @cors.crossdomain(origin='*',headers='Authorization')
  @jwt_required()
  def get(self, id=None):
    data=[]

    if id:
      user_info = mongo.db.users.find_one({"_id": id})

      if user_info:
        print user_info
        return jsonify(user_info)
      else:
         return jsonify({"response": "no user found for " + str(id)})

  @cors.crossdomain(origin='*',headers='Authorization')
  @jwt_required()
  def post(self, id=None):

    data = request.get_json()
    if id:
      if not data:
        data = jsonify({"response" : "ERROR"})
        return jsonify(data)
      else:
        print data
        print id
        print mongo.db.users.update({"_id":id}, {'$set': data})
        return jsonify({"response" : "success"})

    if not data:
      data = jsonify({"response" : "ERROR"})
      return jsonify(data)
    else:
      print data
      id = data.get('_id')
      print id
      print mongo.db.users.update({"_id":id}, {'$set': data})
      return jsonify({"response" : "success"})

  @jwt_required()
  def delete(self, id=None):
    if id:
      print id
      print mongo.db.users.remove({"_id":id})
      return jsonify({"response" : "success"})
    else:
      return jsonify({"response" : "ERROR"})

  @cors.crossdomain(origin='*',headers='Content-Type, Authorization')
  def options (self):
    return {'Allow' : 'GET,POST,DELETE,OPTIONS' }, 200, \
    { 'Access-Control-Allow-Origin': '*', \
      'Access-Control-Headers': 'Content-Type, Authorization', \
      'Access-Control-Allow-Methods' : 'GET,POST,DELETE,OPTIONS' }

#gets a full list of users
# /userList
class UserList(Resource):

  #decorators = [jwt_required()]

  @cors.crossdomain(origin='*',headers='Authorization,Content-Type')
  #@jwt_required()
  def get(self):
    data = []

    user_info = mongo.db.users.find({}, {'_id':1, 'user_first_name':1,'user_last_name':1}) \
    .sort([('user_last_name', 1), ('user_first_name', 1)]) \
    .collation(Collation(locale='en'))
    
    for u in user_info:
      data.append(u)

    return jsonify(data)

  @cors.crossdomain(origin='*',headers='Content-Type, Authorization')
  def options (self):
    return {'Allow' : 'OPTIONS, GET' }, 200, \
    { 'Access-Control-Allow-Origin': '*', \
      'Access-Control-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization', \
      'Access-Control-Allow-Methods' : 'OPTIONS, GET' }


class Uid(Resource):

  @cors.crossdomain(origin='*',headers='Authorization')
  #@jwt_required()
  def get(self, username=None):
    print("USERNAME: " + username)

    if username == "undefined":
      return jsonify({"ERROR": "recieved 'undefined' as uid"})

    user_id = 0
    user_info =  mongo.db.users.find_one({'username':username}, {'_id':1, 'username':1})
    print("PRINTING USER")
    print(user_info)
    print(type(user_info))
    #print("username: " + user_info['username'])
    print("user ID: " + str(user_info['_id']))
    user_id = str(int(user_info['_id']))
    return jsonify({"_id" : user_id})

  # def options (self):
  #   return {'Allow' : 'GET' }, 200, \
  #   { 'Access-Control-Allow-Origin': '*', \
  #     'Access-Control-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization', \
  #     'Access-Control-Allow-Methods' : 'GET' }

api.add_resource(HelloWorld, '/hello')
#api.add_resource(Patient, "/patient/id/<int:id>")
api.add_resource(Patient, "/patient/<int:id>", endpoint="id")
api.add_resource(Patient, "/patient")
api.add_resource(PatientList, "/patientList")
api.add_resource(NewPatient, "/newPatient")
api.add_resource(SeqNumber, "/seqNum")
api.add_resource(Search, "/search")

#post to create a new user
api.add_resource(NewUser, "/newUser")

#TODO THESE
api.add_resource(UserResource, "/user/<int:id>")
api.add_resource(UserList, "/userList")
api.add_resource(Uid, "/uid/<string:username>")


if __name__ == "__main__":
    app.run(host='0.0.0.0')



#TODO
#PDF functionality
#store everything in lowercase
#except usernames
#or capitalize first letter 
#
