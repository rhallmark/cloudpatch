import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Patient } from '../models/patient';

//@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@Injectable()
export class GetPatients {

  // apiUrl: string = 'https://api.github.com';
  apiUrl: string = 'http://159.203.167.54';

  constructor(public http: Http) {
    console.log('Hello GetPatients Provider');
  }


  //Load all 'patients'
  getPatientList(): Observable<Patient[]> {
    return this.http.get(`${this.apiUrl}/patientList`)
      .map(res => <Patient[]>res.json());
  }


  getPatient(patientID: string): Observable<Patient> {
    return this.http.get(`${this.apiUrl}/patient/id/${patientID}`)
      .map(res => <Patient>res.json());
  }

  updatePatient(patient): Observable<Patient> {
    return this.http.post(`${this.apiUrl}/patient`, patient)
      .map(res => <Patient>res.json());
  }


}

    // return this.http.get(`${this.apiUrl}/users`)
    //   .map(res => <Patient[]>res.json());