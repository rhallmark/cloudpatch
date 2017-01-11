import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';


import { Patient } from '../../../models/patient';
import { GetPatients } from '../../../providers/get-patients';

@Component({
  selector: 'page-patient-musculoskeletal',
  templateUrl: 'patient-musculoskeletal.html'
})
export class PatientMusculoskeletalPage {
  submitAttempt: boolean = false;
  musculoskeletalForm: FormGroup;
  patient: Patient;

  constructor(public navCtrl: NavController, private navParams: NavParams, private getPatientService: GetPatients, public formBuilder: FormBuilder ) {
    // Load patient details from parameters
    this.patient = navParams.get('patient');

    this.musculoskeletalForm = formBuilder.group({
        musculoskeletal_other: [this.patient.musculoskeletal_other]
    }); 
 }


  logForm() {
    console.log(this.patient);
  }

 
  save(){
    this.submitAttempt = true;

    if(this.musculoskeletalForm.valid){
      console.log("Form Vals");
      console.log(this.musculoskeletalForm.value);
      console.log("Patient ID "+String(this.patient._id) );

      this.getPatientService.updatePatient(this.musculoskeletalForm.value, String(this.patient._id)).subscribe( u_patient => {
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
