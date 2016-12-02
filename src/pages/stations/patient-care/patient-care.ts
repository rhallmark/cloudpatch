import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';


import { Patient } from '../../../models/patient';
import { GetPatients } from '../../../providers/get-patients';

@Component({
  selector: 'page-patient-care',
  templateUrl: 'patient-care.html'
})
export class PatientCarePage {
  submitAttempt: boolean = false;
  careForm: FormGroup;
  patient: Patient;

  constructor(public navCtrl: NavController, private navParams: NavParams, private getPatientService: GetPatients, public formBuilder: FormBuilder ) {
    // Load patient details from parameters
    this.patient = navParams.get('patient');

    this.careForm = formBuilder.group({
        hpi: [this.patient.hpi],
        pmf: [this.patient.pmf],
        shx: [this.patient.shx],
        allergies: [this.patient.allergies],
        current_meds: [this.patient.current_meds],
        family_history: [this.patient.family_history],
        post_surgery_history: [this.patient.post_surgery_history],
        current_illness_history: [this.patient.current_illness_history],
        diagnosis: [this.patient.diagnosis]
    }); 
 }


  logForm() {
    console.log(this.patient);
  }

 
  save(){
    this.submitAttempt = true;

    if(this.careForm.valid){
      console.log("Form Vals");
      console.log(this.careForm.value);
      console.log("Patient ID "+String(this.patient._id) );

      this.getPatientService.updatePatient(this.careForm.value, String(this.patient._id)).subscribe( u_patient => {
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
