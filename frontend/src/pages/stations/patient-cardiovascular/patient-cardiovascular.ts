import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';


import { Patient } from '../../../models/patient';
import { GetPatients } from '../../../providers/get-patients';

@Component({
  selector: 'page-patient-cardiovascular',
  templateUrl: 'patient-cardiovascular.html'
})
export class PatientCardiovascularPage {
  submitAttempt: boolean = false;
  cardiovascularForm: FormGroup;
  patient: Patient;

  constructor(public navCtrl: NavController, private navParams: NavParams, private getPatientService: GetPatients, public formBuilder: FormBuilder ) {
    // Load patient details from parameters
    this.patient = navParams.get('patient');

    this.cardiovascularForm = formBuilder.group({
        rythm: [this.patient.rythm],
        heart_sounds: [this.patient.heart_sounds],
        abnormal_heart_sounds: [this.patient.abnormal_heart_sounds],
        cardiovascular_other: [this.patient.cardiovascular_other]
    }); 
 }


  logForm() {
    console.log(this.patient);
  }

 
  save(){
    this.submitAttempt = true;

    if(this.cardiovascularForm.valid){
      console.log("Form Vals");
      console.log(this.cardiovascularForm.value);
      console.log("Patient ID "+String(this.patient._id) );

      this.getPatientService.updatePatient(this.cardiovascularForm.value, String(this.patient._id)).subscribe( u_patient => {
        console.log("updated pateient:");
        console.log(u_patient);
        this.navAway();
      })

      console.log("post success as well");


    }
  }

  discard(){
      this.getPatientService.getPatient(String(this.patient._id)).subscribe( patient =>{
      this.patient = patient;
      this.navAway();
    })
  }

  navAway(){
    this.navCtrl.pop();
  }

}
