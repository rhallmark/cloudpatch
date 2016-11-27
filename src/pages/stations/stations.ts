import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GetPatients } from '../../providers/get-patients';

import { Patient } from '../../models/patient';
import { PatientTriagePage } from './patient-triage/patient-triage';

@Component({
  selector: 'page-stations',
  templateUrl: 'stations.html'
})
export class StationsPage {

  stations: string[] = ["Triage", "Patient Care", "Lab", "Enmt", "Back", "Optical", "Respiratory", "Cardiovascular",
                        "Gastrointestinal", "Musculoskeletal", "Psychriatric", "Women's Health"];

  _id: string;
  patient_first_name: string;

  patient: Patient;

  constructor(public navCtrl: NavController, private navParams: NavParams, private getPatientService: GetPatients ) {
    this._id = navParams.get('_id');
    this.patient_first_name = navParams.get('patient_first_name');

    // Load Patient Details
    getPatientService.getPatient(this._id).subscribe(patient => {
      this.patient = patient;
      //console.log(patient);
    })
  }

  
  nav(patient: Patient, location:string){
    if(location == "Triage"){
      console.log("navigating to navtotriage");
      this.navToTriage(patient);
    }
    else{
      console.log("could not navigate to requested page");
    }
  }


  navToTriage(patient: Patient) {
    this.navCtrl.push(PatientTriagePage, {patient});
  }

  ionViewDidLoad() {
    console.log('Hello StationsPage Page');
  }

}
