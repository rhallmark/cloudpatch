import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GetPatients } from '../../providers/get-patients';

import { Patient } from '../../models/patient';
import { PatientTriagePage } from './patient-triage/patient-triage';
import { PatientCarePage } from './patient-care/patient-care';
import { PatientLabPage } from './patient-lab/patient-lab';
import { PatientEnmtPage } from './patient-enmt/patient-enmt';
import { PatientBackPage } from './patient-back/patient-back';
import { PatientOpticalPage } from './patient-optical/patient-optical';
import { PatientRespiratoryPage } from './patient-respiratory/patient-respiratory';
import { PatientCardiovascularPage } from './patient-cardiovascular/patient-cardiovascular';
import { PatientGastrointestinalPage } from './patient-gastrointestinal/patient-gastrointestinal';
import { PatientMusculoskeletalPage } from './patient-musculoskeletal/patient-musculoskeletal';
import { PatientPsychiatricPage } from './patient-psychiatric/patient-psychiatric';
import { PatientWomenPage } from './patient-women-health/patient-women';



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
    else if(location == "Back"){
      this.navCtrl.push(PatientBackPage, {patient});
    }
    else if(location == "Optical"){
      this.navCtrl.push(PatientOpticalPage, {patient});
    }
    else if(location == "Respiratory"){
      this.navCtrl.push(PatientRespiratoryPage, {patient});
    }
    else if(location == "Cardiovascular"){
      this.navCtrl.push(PatientCardiovascularPage, {patient});
    }
    else if(location == "Gastrointestinal"){
      this.navCtrl.push(PatientGastrointestinalPage, {patient});
    }
    else if(location == "Musculoskeletal"){
      this.navCtrl.push(PatientMusculoskeletalPage, {patient});
    }
    else if(location == "Psychriatric"){
      this.navCtrl.push(PatientPsychiatricPage, {patient});
    }
    else if(location == "Women's Health"){
      this.navCtrl.push(PatientWomenPage, {patient});
    }
    else{
      console.log("could not navigate to requested page: "+location);
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
