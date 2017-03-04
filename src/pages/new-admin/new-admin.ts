import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/authservice';

// For setting root page to login page
import { LoginPage } from '../login/login';

// Validators
import { UsernameValidator } from  '../validators/v_username';

@Component({
  selector: 'page-new-admin',
  templateUrl: 'new-admin.html'
})
export class NewAdminPage {

  signUpForm: FormGroup;

  submitAttempt: boolean = false;


  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, 
              public authservice: AuthService, public alertcontroller: AlertController) {

    this.signUpForm = formBuilder.group({
        user_first_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        user_last_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required]), UsernameValidator.checkUsername],
        user_prefix: [''],
        username: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
        account_type: ['',Validators.compose([Validators.required])],
        contact_info: [''],
        bio: [''],
        password: ['', Validators.compose([Validators.required])],
        password_conf: ['', Validators.compose([Validators.required])]
    });
 
  }


  ionViewCanEnter(){
    if(!this.authservice.AuthToken){
      let alert = this.alertcontroller.create({
          title: 'Error!',
          subTitle: 'Please Log in first.',
          buttons: ['OK']
          });
      alert.present();
      return false;
    }
  }





    save(){
      this.submitAttempt = true;
      let newUser = this.signUpForm.value;
      
      if(newUser){

        this.authservice.adduser(newUser).then(data => {
          if(data){
            var alert = this.alertcontroller.create({
              title: "Success!",
              subTitle: "User Created.",
              buttons: ["ok"]
            });
            alert.present();

          }
        })
      }
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
