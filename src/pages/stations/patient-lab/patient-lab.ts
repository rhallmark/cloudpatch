import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';


import { Patient } from '../../../models/patient';
import { GetPatients } from '../../../providers/get-patients';

@Component({
  selector: 'page-patient-lab',
  templateUrl: 'patient-lab.html'
})
export class PatientLabPage {
  submitAttempt: boolean = false;
  labForm: FormGroup;
  patient: Patient;

  constructor(public navCtrl: NavController, private navParams: NavParams, private getPatientService: GetPatients, public formBuilder: FormBuilder ) {
    // Load patient details from parameters
    this.patient = navParams.get('patient');

    this.labForm = formBuilder.group({
        glucose: [this.patient.glucose],
        cholesterol: [this.patient.cholesterol],
        ldl: [this.patient.ldl],
        hdl: [this.patient.hdl],
        triglycerides: [this.patient.triglycerides],
        blood_other: [this.patient.blood_other],
        urinalysis: [this.patient.urinalysis]
    }); 
 }


  logForm() {
    console.log(this.patient);
  }

 
  save(){
    this.submitAttempt = true;

    if(this.labForm.valid){
      console.log("Form Vals");
      console.log(this.labForm.value);
      console.log("Patient ID "+String(this.patient._id) );

      this.getPatientService.updatePatient(this.labForm.value, String(this.patient._id)).subscribe( u_patient => {
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
