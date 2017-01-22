import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class AuthService {

    isLoggedin: boolean;
    AuthToken;

    apiUrl: string = 'http://159.203.167.54';

    constructor(public http: Http) {
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
    
    authenticate(doctor) {
        //var creds = "name=" + user.userName + "&password=" + user.password;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        console.log(doctor);
        console.log(headers);

        return new Promise(resolve => {
            this.http.post(`${this.apiUrl}/authenticate`, doctor, {headers: headers}).subscribe(data => {
                if(data.json().success){
                    // Once they are authenticated, store user creds
                    this.storeUserCredentials(data.json().token);
                    resolve(true);
                }
                else
                    resolve(false);
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