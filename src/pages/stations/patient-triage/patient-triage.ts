import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { Patient } from '../../../models/patient';
import { GetPatients } from '../../../providers/get-patients';

@Component({
  selector: 'page-patient-triage',
  templateUrl: 'patient-triage.html'
})
export class PatientTriagePage {

  patient: Patient;

  constructor(public navCtrl: NavController, private navParams: NavParams, private getPatientService: GetPatients ) {
    // Load patient details from parameters
    this.patient = navParams.get('patient');
  }

  ionViewDidLoad() {
    //console.log('Hello Patient Triage Page');
  }

  logForm() {
    console.log(this.patient);
  }

}
