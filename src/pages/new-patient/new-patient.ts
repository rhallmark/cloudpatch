import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

// Validators
import { PatientValidator } from  '../validators/v_patient';

@Component({
  selector: 'page-new-patient',
  templateUrl: 'new-patient.html'
})
export class NewPatientPage {

  newPatientForm: FormGroup;

  submitAttempt: boolean = false;


  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {

    this.newPatientForm = formBuilder.group({
        firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required]), PatientValidator.checkUsername]
    });
 
  }

 
    save(){
      this.submitAttempt = true;

      if(this.newPatientForm.valid){
        console.log("Success");
        console.log(this.newPatientForm.value);
      }
    }
 

}
