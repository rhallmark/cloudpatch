import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;

  submitAttempt: boolean = false;


  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {

    this.loginForm = formBuilder.group({
        userName: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])]
    });
 
  }

 
  login(){
    this.submitAttempt = true;

    if(this.loginForm.valid){
      console.log("Success");
      console.log(this.loginForm.value);
    }
  }
 

}
