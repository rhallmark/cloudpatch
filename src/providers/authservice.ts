import {Injectable, Inject} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Patient } from '../models/patient';

@Injectable()
export class AuthService {

    isLoggedin: boolean;
    AuthToken;

    //apiUrl: string = 'http://159.203.167.54';
    apiUrl: string = 'http://hallmark.cloud:5000';

    constructor(public http: Http, public alertcontroller: AlertController) {
        this.http = http;
        this.isLoggedin = false;
        this.AuthToken = null;
    }
    
    storeUserCredentials(token) {
        window.localStorage.setItem('token', token);
        this.useCredentials(token);
    }
    
    useCredentials(token) {
        this.isLoggedin = true;
        this.AuthToken = token;
    }
    
    loadUserCredentials() {
        var token = window.localStorage.getItem('token');
        this.useCredentials(token);
    }
    
    destroyUserCredentials() {
        this.isLoggedin = false;
        this.AuthToken = null;
        window.localStorage.clear();
    }
    

    //attempt to auth dr
    auth(doctor): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //console.log(this.AuthToken);
        //console.log(`${this.apiUrl}/patientList`, this.headers);

        return this.http.post(`${this.apiUrl}/auth`, doctor, headers)
        .map(res => <any>res.json())
        .catch(this.handleError);
    }


    handleError(error){
        //console.log(error);

        let new_err = {'error': 'Invalid Credentials'};
        return Observable.throw(error);
    }

    authenticate(doctor) {
        //var creds = "name=" + user.userName + "&password=" + user.password;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return new Promise((resolve,reject) => {
            this.http.post(`${this.apiUrl}/auth`, doctor, {headers: headers}).subscribe(data => {
                console.log(data.json());
                if(data.json().success){
                    this.storeUserCredentials(data.json().access_token);
                    resolve(true),(error=>{
                        let err_data = JSON.parse(error._body);
                        console.log("got to error data");
                        resolve(err_data);
                    })
                }
                reject("Testing");
            });
        });

    }

    adduser(doctor) {
        //var creds = "name=" + user.name + "&password=" + user.password;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        return new Promise(resolve => {
            this.http.post(`${this.apiUrl}/adduser`, doctor, {headers: headers}).subscribe(data => {
                if(data.json().success){
                    resolve(true);
                }
                else
                    resolve(false);
            });
        });
    }
    
    getinfo() {
        return new Promise(resolve => {
            var headers = new Headers();
            this.loadUserCredentials();
            console.log(this.AuthToken);
            headers.append('Authorization', 'Bearer ' +this.AuthToken);
            this.http.get('http://localhost:3333/getinfo', {headers: headers}).subscribe(data => {
                if(data.json().success)
                    resolve(data.json());
                else
                    resolve(false);
            });
        })
    }
    
    logout() {
        this.destroyUserCredentials();
    }
}