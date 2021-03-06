import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';

// Data Members
import { Patient } from '../../models/patient';

// Pages
import { LoginPage } from '../login/login';
import { StationsPage } from '../stations/stations';
import { PatientTriagePage } from '../stations/patient-triage/patient-triage';
import { SelectPatientPage } from '../select-patient/select-patient';

// Services
import { GetPatients } from '../../providers/get-patients';
import { AuthService } from '../../providers/authservice';

// Validators
import { PatientValidator } from  '../validators/v_patient';

@Component({
  selector: 'page-new-patient',
  templateUrl: 'new-patient.html'
})
export class NewPatientPage {

  newPatientForm: FormGroup;
  submitAttempt: boolean = false;
  patient: Patient;
  patient_first_name: string;
  patient_last_name: string;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public authservice: AuthService, 
            private getPatientService: GetPatients, public alertcontroller: AlertController) {

    this.newPatientForm = formBuilder.group({
      // need to fix all the name validators
        patient_first_name: ["", Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        patient_last_name: ["", Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required]), PatientValidator.checkUsername]
    });
  }


 
  ionViewCanEnter(){
    // if(!this.authservice.AuthToken){
    //   let alert = this.alertcontroller.create({
    //       title: 'Error!',
    //       subTitle: 'Please Log in first.',
    //       buttons: ['OK']
    //       });
    //   alert.present();
    //   return false;
    // }
  }


  save(){
    this.submitAttempt = true;

    if(this.newPatientForm.valid){

      console.log(this.newPatientForm.value);
      this.patient_first_name = this.newPatientForm.value.patient_first_name;
      this.patient_last_name = this.newPatientForm.value.patient_last_name;

      this.getPatientService.newPatient(this.newPatientForm.value).subscribe( patient_id => {
        console.log("new pateient with id:");
        console.log(patient_id);

        var alert = this.alertcontroller.create({
          title: "Success!",
          subTitle: "Patient Created.",
          buttons: ["ok"]
        });
        alert.present();

        // Nav to patient list
        this.navToStations(String(patient_id), this.patient_first_name);
      })

      console.log("post success as well");
    }
  }


  discard(){
      this.patient.patient_first_name = "";
      this.patient.patient_last_name = "";
      this.navAway();
  }

  navAway(){
    //this.navCtrl.pop();
  }

  //almost works, instead of setting root and leaving them at select a patient
  //would like to nav directly to that patients details. Could pass a string and
  //test to see if string exists on selectpatientpage, but seems like theres a better way
  navToStations(_id: string, patient_first_name: string) {
    this.navCtrl.setRoot(SelectPatientPage);
    //.then(this.navCtrl.push(StationsPage, {_id, patient_first_name}));
    // this.navCtrl.pop();
    // this.navCtrl.push(StationsPage, {_id, patient_first_name});
  }



  logout(){
    this.authservice.destroyUserCredentials();
      let alert = this.alertcontroller.create({
          title: 'Logged Out',
          subTitle: 'You have successfully logged out.',
          buttons: ['OK']
          });
      alert.present();
    this.navCtrl.setRoot(LoginPage);
  }

}
