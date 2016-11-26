import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-new-patient',
  templateUrl: 'new-patient.html'
})
export class NewPatientPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello New Patient Page');
  }

}
