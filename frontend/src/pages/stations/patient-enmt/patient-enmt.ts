import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';


import { Patient } from '../../../models/patient';
import { GetPatients } from '../../../providers/get-patients';

@Component({
  selector: 'page-patient-enmt',
  templateUrl: 'patient-enmt.html'
})
export class PatientEnmtPage {
  submitAttempt: boolean = false;
  enmtForm: FormGroup;
  patient: Patient;

  constructor(public navCtrl: NavController, private navParams: NavParams, private getPatientService: GetPatients, public formBuilder: FormBuilder ) {
    // Load patient details from parameters
    this.patient = navParams.get('patient');

    this.enmtForm = formBuilder.group({
        auditory: [this.patient.auditory],
        tympanic: [this.patient.tympanic],
        nasal_cavity: [this.patient.nasal_cavity],
        lips_mouth: [this.patient.lips_mouth],
        teeth: [this.patient.teeth],
        gums: [this.patient.gums],
        throat_tonsils: [this.patient.throat_tonsils],
        enmt_other: [this.patient.enmt_other]
    }); 
 }


  logForm() {
    console.log(this.patient);
  }

 
  save(){
    this.submitAttempt = true;

    if(this.enmtForm.valid){
      console.log("Form Vals");
      console.log(this.enmtForm.value);
      console.log("Patient ID "+String(this.patient._id) );

      this.getPatientService.updatePatient(this.enmtForm.value, String(this.patient._id)).subscribe( u_patient => {
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
