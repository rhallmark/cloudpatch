import { OnInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';

import { SelectPatientPage } from '../select-patient/select-patient';
import { DrProfile } from '../dr-profile/dr-profile';
import { AboutPage } from '../about/about';
import { NewPatientPage } from '../new-patient/new-patient';

import { GetUsers } from '../../providers/get-users'
import { GetPatients } from '../../providers/get-patients';
import { AuthService } from '../../providers/authservice';

import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public authservice: AuthService, 
  public getUserService: GetUsers, public alertcontroller: AlertController) {

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
    // var alert = this.alertcontroller.create({
    //   title: "Logging in now",
    //   subTitle: ":)",
    //   buttons: ["ok"]
    // });

    // alert.present();
    //console.log("is this working?");
    this.submitAttempt = true;

    // If the login form is valid (need to check there is info in both)
    if(this.loginForm.valid){

      let user = this.loginForm.value;
      let username = this.loginForm.value.username;

      let data = null;
      this.authservice.auth(user).subscribe(
        data => console.log(this.valid_login(username)),
        err => console.log(this.login_error_alert()),
      );
    }
  }


  login_error_alert(){

    var alert = this.alertcontroller.create({
      title: "Error",
      subTitle: "Invalid Credentials.",
      buttons: ["ok"]
    });
    alert.present();
  }


  valid_login(username){
    console.log("logging in user "+username);
    this.getUserService.getUID(username).subscribe( uid =>{
      let userID:string = uid._id.toString();
      this.navCtrl.setRoot(DrProfile,{userID});
    });
  }


      // Now authenticate the user if the form is valid
      // try {
      //   try {
      //     this.authservice.authenticate(user)
      //     .then(data => {
      //         //console.log(data);
      //         if(data){
      //           this.getUserService.getUID(username).subscribe( uid =>{
      //             //console.log(user1);
      //             let userID:string = uid._id.toString();

      //             //console.log(userID);
      //             this.navCtrl.setRoot(DrProfile,{userID});
      //           });
      //         }
      //       });
      //   } catch(e) {
      //     console.log(e);
      //     console.log("error1");
      //   }
      // } catch(e) {
      //   console.error(e);
      //   console.log("error2");
      // }


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
              // else{
              //   console.log("ERRRRRRRRRRRRRRRRRORRRRRRZ");
              //   var alert = this.alertcontroller.create({
              //     title: "Error",
              //     subTitle: "Invalid Credentials.",
              //     buttons: ["ok"]
              //   });
              //   alert.present();
              // }



 

}
