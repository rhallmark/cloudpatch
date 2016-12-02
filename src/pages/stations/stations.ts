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

  stations_M: string[] = ["Triage", "Patient Care", "Lab", "Enmt", "Back", "Optical", "Respiratory", "Cardiovascular",
                        "Gastrointestinal", "Musculoskeletal", "Psychriatric"];
  stations_F: string[] = ["Triage", "Patient Care", "Lab", "Enmt", "Back", "Optical", "Respiratory", "Cardiovascular",
                        "Gastrointestinal", "Musculoskeletal", "Psychriatric", "Women's Health"];

  stations: string[] = this.stations_F;

  patient: Patient;

  constructor(public navCtrl: NavController, private navParams: NavParams, private getPatientService: GetPatients ) {
    this.patient = navParams.get('patient');

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

  ionViewDidEnter() {
    // currently this runs twice because of constructor.
    // This is so data updates even when navigating back to the page
    this.getPatientService.getPatient(String(this.patient._id)).subscribe(patient => {
    this.patient = patient;
    
    if(this.patient.sex == "male"){
      this.stations = this.stations_M;
    }
    else{
      this.stations = this.stations_F;
    }
    })

  }

}
