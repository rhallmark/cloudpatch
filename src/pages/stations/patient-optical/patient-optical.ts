import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';


import { Patient } from '../../../models/patient';
import { GetPatients } from '../../../providers/get-patients';

@Component({
  selector: 'page-patient-optical',
  templateUrl: 'patient-optical.html'
})
export class PatientOpticalPage {
  submitAttempt: boolean = false;
  opticalForm: FormGroup;
  patient: Patient;

  constructor(public navCtrl: NavController, private navParams: NavParams, private getPatientService: GetPatients, public formBuilder: FormBuilder ) {
    // Load patient details from parameters
    this.patient = navParams.get('patient');

    this.opticalForm = formBuilder.group({
        eyelids: [this.patient.eyelids],
        conjunctive: [this.patient.conjunctive],
        sciera: [this.patient.sciera],
        fundus: [this.patient.fundus],
        optical_other: [this.patient.optical_other]
    }); 
 }


  logForm() {
    console.log(this.patient);
  }

 
  save(){
    this.submitAttempt = true;

    if(this.opticalForm.valid){
      console.log("Form Vals");
      console.log(this.opticalForm.value);
      console.log("Patient ID "+String(this.patient._id) );

      this.getPatientService.updatePatient(this.opticalForm.value, String(this.patient._id)).subscribe( u_patient => {
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
