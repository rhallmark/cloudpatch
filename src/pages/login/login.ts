import { OnInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/authservice';

import { SelectPatientPage } from '../select-patient/select-patient';
import { DrProfile } from '../dr-profile/dr-profile';
import { AboutPage } from '../about/about';
import { NewPatientPage } from '../new-patient/new-patient';



import { MyApp } from '../../app/app.component';

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
        username: ['', Validators.compose([Validators.required])],
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
      let username = this.loginForm.value.username;

      // Now authenticate the user if the form is valid
      this.authservice.authenticate(user).then(data => {
        if(data){
          // Need to access the pages variable here
          //this.navCtrl.setPages(pages_auth);
          //MyApp.pages = pages_auth;
          this.navCtrl.setRoot(DrProfile, {username});
        }
      });

      // // Now authenticate the user if the form is valid
      // this.authservice.authenticate(user).then(data => {
      //   if(data){
      //     // Need to access the pages variable here
      //     //this.navCtrl.setPages(pages_auth);
      //     //MyApp.pages = pages_auth;
      //     console.log("made it to 1 ");
      //     console.log(data);

      //     this.getUserService.getUID(username).subscribe( user1 =>{
      //       let userID: string = user1._id.toString();
      //       console.log("made it to 2: "+userID);

      //       if(userID){
      //         console.log("made it to 3:" );
      //         this.getUserService.getUser(userID).subscribe( fullUser =>{
      //           console.log(fullUser);
      //           this.navCtrl.setRoot(DrProfile, {fullUser});
      //         });
      //       }
      //     });
      //   }
      //   else{
      //     console.log("welp that didnt work")
      //   }
      // });

    }
  }
 

}
