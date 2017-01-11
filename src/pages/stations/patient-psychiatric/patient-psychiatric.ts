import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';


import { Patient } from '../../../models/patient';
import { GetPatients } from '../../../providers/get-patients';

@Component({
  selector: 'page-patient-psychiatric',
  templateUrl: 'patient-psychiatric.html'
})
export class PatientPsychiatricPage {
  submitAttempt: boolean = false;
  psychiatricForm: FormGroup;
  patient: Patient;

  constructor(public navCtrl: NavController, private navParams: NavParams, private getPatientService: GetPatients, public formBuilder: FormBuilder ) {
    // Load patient details from parameters
    this.patient = navParams.get('patient');

    this.psychiatricForm = formBuilder.group({
        judgement: [this.patient.judgement],
        orientation_AO: [this.patient.orientation_AO],
        psychiatric_other: [this.patient.psychiatric_other]
    }); 
 }


  logForm() {
    console.log(this.patient);
  }

 
  save(){
    this.submitAttempt = true;

    if(this.psychiatricForm.valid){
      console.log("Form Vals");
      console.log(this.psychiatricForm.value);
      console.log("Patient ID "+String(this.patient._id) );

      this.getPatientService.updatePatient(this.psychiatricForm.value, String(this.patient._id)).subscribe( u_patient => {
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
