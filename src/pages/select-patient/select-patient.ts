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

  constructor(public navCtrl: NavController, private getPatientService: GetPatients) {
    getPatientService.getPatientList().subscribe( patients =>{
      this.patients = patients;
      //console.log(patients);
    })

  }

  navToTriage(_id: string, patient_first_name: string) {
    this.navCtrl.push(PatientTriagePage, {_id, patient_first_name});
  }


}
