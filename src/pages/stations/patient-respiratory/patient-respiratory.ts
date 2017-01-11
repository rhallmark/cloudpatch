import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';


import { Patient } from '../../../models/patient';
import { GetPatients } from '../../../providers/get-patients';

@Component({
  selector: 'page-patient-respiratory',
  templateUrl: 'patient-respiratory.html'
})
export class PatientRespiratoryPage {
  submitAttempt: boolean = false;
  respiratoryForm: FormGroup;
  patient: Patient;

  constructor(public navCtrl: NavController, private navParams: NavParams, private getPatientService: GetPatients, public formBuilder: FormBuilder ) {
    // Load patient details from parameters
    this.patient = navParams.get('patient');

    this.respiratoryForm = formBuilder.group({
        resp_effort: [this.patient.resp_effort],
        auscultation: [this.patient.auscultation],
        respiratory_other: [this.patient.respiratory_other]
    }); 
 }


  logForm() {
    console.log(this.patient);
  }

 
  save(){
    this.submitAttempt = true;

    if(this.respiratoryForm.valid){
      console.log("Form Vals");
      console.log(this.respiratoryForm.value);
      console.log("Patient ID "+String(this.patient._id) );

      this.getPatientService.updatePatient(this.respiratoryForm.value, String(this.patient._id)).subscribe( u_patient => {
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
