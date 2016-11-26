import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Patient } from '../../models/patient';

import { PatientTriagePage } from '../patient-triage/patient-triage';

import { GetPatients } from '../../providers/get-patients';

@Component({
  selector: 'page-select-patient',
  templateUrl: 'select-patient.html'
})
export class SelectPatientPage {

  patients: Patient[];

  constructor(public navCtrl: NavController, private getPatientsService: GetPatients) {
    getPatientsService.getPatientList().subscribe( patients =>{
      this.patients = patients;
      //console.log(patients);
    })

  }

  navToTriage(patient_first_name: string) {
    this.navCtrl.push(PatientTriagePage, {patient_first_name});
  }




}
