import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { AuthService } from './authservice';

// Import User
import { User } from '../models/user';

@Injectable()
export class GetUsers {

  //apiUrl: string = 'http://159.203.167.54:5000';
  apiUrl: string = 'http://hallmark.cloud:5000';
  AuthToken;
  headers;

  constructor(public http: Http) {
    this.loadUserCredentials();
  }

    setHeaders(){
      var headers = new Headers();
      // Here I should probably sanatize auth token somehow?
      var customHeaders = {headers: {
        "Authorization" : 'JWT ' + this.AuthToken
      }};

      var customAuth = {Authorization: {
        'JWT' : this.AuthToken
      }};

      var jwtString: String = 'JWT ' + this.AuthToken;

      console.log(customHeaders);
      this.headers = customHeaders;
    }

  //Loading user auth token
    useCredentials(token) {
        //this.isLoggedin = true;
        this.AuthToken = token;
        this.setHeaders();
    }
    
    loadUserCredentials() {
        var token = window.localStorage.getItem('token');
        this.useCredentials(token);
    }


  //Load all 'users'
  getUserList(): Observable<User[]> {
    //console.log(this.AuthToken);
    //console.log(`${this.apiUrl}/patientList`, this.headers);
    return this.http.get(`${this.apiUrl}/userList`, this.headers)
      .map(res => <User[]>res.json());
  }


  getUID(userName: string): Observable<User> {
    return this.http.get(`${this.apiUrl}/uid/${userName}`, this.headers)
      .map(res => <User>res.json());
  }


  getUser(userID: string): Observable<User> {
    return this.http.get(`${this.apiUrl}/user/${userID}`, this.headers)
      .map(res => <User>res.json());
  }


  updateUser(myProfileData, userID: string): Observable<User> {
    return this.http.post(`${this.apiUrl}/updateUser/${userID}`, myProfileData, this.headers)
      .map(res => <User>res.json());
  }


  newUser(user): Observable<number> {
    return this.http.post(`${this.apiUrl}/newUser`, user, this.headers)
      .map(res => <number>res.json());
  }

  deleteUser(userID: string): Observable<number> {
    return this.http.delete(`${this.apiUrl}/user/${userID}`, this.headers)
      .map(res => <number>res.json());
  }




}

    // return this.http.get(`${this.apiUrl}/users`)
    //   .map(res => <Patient[]>res.json());