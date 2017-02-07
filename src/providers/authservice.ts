import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class AuthService {

    isLoggedin: boolean;
    AuthToken;

    //apiUrl: string = 'http://159.203.167.54';
    apiUrl: string = 'http://hallmark.cloud';
    
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
        headers.append('Content-Type', 'application/json');
        
        console.log(doctor);
        console.log(headers);

        return new Promise(resolve => {
            this.http.post(`${this.apiUrl}/auth`, doctor, {headers: headers}).subscribe(data => {
                console.log(data)
                if(data){
                    this.storeUserCredentials(data.json().access_token);
                    resolve(true);
                }
                resolve(false);
            });
        });

        // if(doctor.userName == "russ"){
        //     if(doctor.password == "123"){
        //         let token = "supersecretstuff";
        //         this.storeUserCredentials(token);
        //         return new Promise(resolve => {
        //             token;
        //             resolve(true);
        //         });
        //     }
        // }


        // return new Promise(resolve => {
        //     this.http.post(`${this.apiUrl}/auth`, doctor, {headers: headers}).subscribe(data => {
        //         console.log(data)
        //         if(data.json().success){
        //             console.log(data);
        //             // Once they are authenticated,
        //             this.storeUserCredentials(data.json().access_token);
        //             resolve(true);
        //         }
        //         else
        //             resolve(false);
        //     });
        // });
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