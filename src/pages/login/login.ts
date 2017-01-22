import { OnInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/authservice';
import { SelectPatientPage } from '../select-patient/select-patient';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public authservice: AuthService) {

    // this.loginForm = formBuilder.group([
    //   userName: ['',[Validators.required]],
    //   password: ['', Validators.required]
    // ]);

    this.loginForm = formBuilder.group({
        userName: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])]
    });
 
    // this.loginForm = formBuilder.group({
    //     userName: [''],
    //     password: ['']
    // });
  }

 
  login(){
    this.submitAttempt = true;

    // If the login form is valid (need to check there is info in both)
    if(this.loginForm.valid){

      let user = this.loginForm.value;
      //console.log(user);
      // Now authenticate the user if the form is valid
      this.authservice.authenticate(user).then(data => {
        if(data){
          this.navCtrl.setRoot(SelectPatientPage)
        }
      })
    }
  }
 

}
