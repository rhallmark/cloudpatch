import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { AuthService } from './authservice';

import { Patient } from '../models/patient';

@Injectable()
export class GetPatients {

  apiUrl: string = 'http://159.203.167.54:5000';
  //apiUrl: string = 'http://hallmark.cloud';
  AuthToken;
  headers;

  constructor(public http: Http) {
    this.loadUserCredentials();
  }

    setHeaders(){
      var headers = new Headers();
      // Here I should probably sanatize auth token somehow?
      //headers.append('Authorization', 'JWT '+this.AuthToken);
     // headers.append('Authorization', 'JWT '+this.AuthToken);
      var customHeaders = {headers: {
        //"Content-Type" : 'application/x-www-form-urlencoded; charset=UTF-8',
        //"Content-Type": "text/plain charset=UTF-8",
        "Authorization" : 'JWT ' + this.AuthToken
      }};

      var customAuth = {Authorization: {
        'JWT' : this.AuthToken
      }};

      //console.log(headers);

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


  //Load all 'patients'
  getPatientList(): Observable<Patient[]> {
    //console.log(this.AuthToken);
    //console.log(`${this.apiUrl}/patientList`, this.headers);
    return this.http.get(`${this.apiUrl}/patientList`, this.headers)
      .map(res => <Patient[]>res.json());
  }


  getPatient(patientID: string): Observable<Patient> {
    return this.http.get(`${this.apiUrl}/patient/${patientID}`, this.headers)
      .map(res => <Patient>res.json());
  }

  //Search For patients
  searchPatients(searchTerm): Observable<Patient[]> {
    return this.http.post(`${this.apiUrl}/search`, searchTerm, this.headers)
      .map(res => <Patient[]>res.json());
      //no .items?
  }

  updatePatient(patientFormData, patientID: string): Observable<Patient> {
    return this.http.post(`${this.apiUrl}/patient/${patientID}`, patientFormData, this.headers)
      .map(res => <Patient>res.json());
  }

  newPatient(patient): Observable<number> {
    return this.http.post(`${this.apiUrl}/newPatient`, patient, this.headers)
      .map(res => <number>res.json());
  }


}

    // return this.http.get(`${this.apiUrl}/users`)
    //   .map(res => <Patient[]>res.json());