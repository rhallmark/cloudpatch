import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Patient } from '../../models/patient';

import { GetPatients } from '../../providers/get-patients';

@Component({
  selector: 'page-patient-triage',
  templateUrl: 'patient-triage.html'
})
export class PatientTriagePage {

  _id: string;
  patient_first_name: string;

  patient: Patient;

  constructor(public navCtrl: NavController, private navParams: NavParams, private getPatientService: GetPatients ) {
    this._id = navParams.get('_id');
    this.patient_first_name = navParams.get('patient_first_name');

    // Load Patient Triage Details
    getPatientService.getPatient(this._id).subscribe(patient => {
      this.patient = patient;
      console.log(patient);
    })
  }

  ionViewDidLoad() {
    //console.log('Hello Patient Triage Page');
  }

}
