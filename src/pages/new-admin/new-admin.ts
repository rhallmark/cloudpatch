import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

// Validators
import { UsernameValidator } from  '../validators/v_username';

@Component({
  selector: 'page-new-admin',
  templateUrl: 'new-admin.html'
})
export class NewAdminPage {

  signUpForm: FormGroup;

  submitAttempt: boolean = false;


  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {

    this.signUpForm = formBuilder.group({
        firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required]), UsernameValidator.checkUsername],
        username: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
        type: ['',Validators.compose([Validators.required])],
        bio: [''],
        password: ['', Validators.compose([Validators.required])],
        passwordConf: ['', Validators.compose([Validators.required])]
    });
 
  }

 
    save(){
      this.submitAttempt = true;

      if(this.signUpForm.valid){
        console.log("Success");
        console.log(this.signUpForm.value);
      }
    }
 

}
