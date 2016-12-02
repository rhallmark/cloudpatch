import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';


import { Patient } from '../../../models/patient';
import { GetPatients } from '../../../providers/get-patients';

@Component({
  selector: 'page-patient-triage',
  templateUrl: 'patient-triage.html'
})
export class PatientTriagePage {
  submitAttempt: boolean = false;
  triageForm: FormGroup;
  patient: Patient;

  constructor(public navCtrl: NavController, private navParams: NavParams, private getPatientService: GetPatients, public formBuilder: FormBuilder ) {
    // Load patient details from parameters
    this.patient = navParams.get('patient');

    this.triageForm = formBuilder.group({
        patient_first_name: [this.patient.patient_first_name, Validators.compose([Validators.required])],
        patient_last_name: [this.patient.patient_last_name, Validators.compose([Validators.required])],
        height: [this.patient.height],
        weight: [this.patient.weight],
        temperature: [this.patient.temperature],
        pulse: [this.patient.pulse],
        bloodPressureSystolic: [this.patient.bloodPressureSystolic],
        bloodPressureDiastolic: [this.patient.bloodPressureDiastolic],
        blood_type: [this.patient.blood_type],
        chiefComplaint: [this.patient.chiefComplaint],
    }); 

 }


  logForm() {
    console.log(this.patient);
  }

 
  save(){
    this.submitAttempt = true;

    if(this.triageForm.valid){
      console.log("Form Vals");
      console.log(this.triageForm.value);
      console.log("Patient ID "+String(this.patient._id) );

      this.getPatientService.updatePatient(this.triageForm.value, String(this.patient._id)).subscribe( u_patient => {
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
