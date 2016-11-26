import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-patient-triage',
  templateUrl: 'patient-triage.html'
})
export class PatientTriagePage {

  patient_first_name: string;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.patient_first_name = navParams.get('patient_first_name');
  }

  ionViewDidLoad() {
    //console.log('Hello Patient Triage Page');
  }

}
