import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Patient } from '../../models/patient';

import { StationsPage } from '../stations/stations';
import { PatientTriagePage } from '../stations/patient-triage/patient-triage';

import { GetPatients } from '../../providers/get-patients';

@Component({
  selector: 'page-select-patient',
  templateUrl: 'select-patient.html'
})
export class SelectPatientPage {

  patients: Patient[];
  originalPatients: Patient[];

  constructor(public navCtrl: NavController, private getPatientService: GetPatients) {
    getPatientService.getPatientList().subscribe( patients =>{
      this.patients = patients;
      this.originalPatients = patients;
    })

  }

  // ionViewWillLeave(){
  //   this.patients=this.originalPatients;
  // }


  search(searchEvent){

      let searchterm: string = searchEvent.target.value;

      //only perform searches on terms greater than length 2
      if(searchterm.trim() == '' || searchterm.trim().length < 2){
        //load original users
        this.patients = this.originalPatients;
      }
      else {
        //get newly searched users
        var obj = { "searchTerm":searchterm};
        console.log(obj);
        var testSearch = this.getPatientService.searchPatients(obj).subscribe(updatedList => {
          console.log(updatedList);
          this.patients = updatedList;
        })
      }
  }


  navToStations(patient: Patient) {
    this.navCtrl.push(StationsPage, {patient});
  }


}
