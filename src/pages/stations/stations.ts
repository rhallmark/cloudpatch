import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GetPatients } from '../../providers/get-patients';

import { Patient } from '../../models/patient';
import { PatientTriagePage } from './patient-triage/patient-triage';
import { PatientCarePage } from './patient-care/patient-care';
import { PatientLabPage } from './patient-lab/patient-lab';
import { PatientEnmtPage } from './patient-enmt/patient-enmt';

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
      console.log("navigating to Triage");
      this.navCtrl.push(PatientTriagePage, {patient});
    }
    else if(location == "Patient Care"){
      console.log("navigating to Patient Care");
      this.navCtrl.push(PatientCarePage, {patient});
    }
    else if(location == "Lab"){
      this.navCtrl.push(PatientLabPage, {patient});
    }
    else if(location == "Enmt"){
      this.navCtrl.push(PatientEnmtPage, {patient});
    }
    else{
      console.log("could not navigate to requested page");
    }
  }


  navToTriage(patient: Patient) {
    
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
