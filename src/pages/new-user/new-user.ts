import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';

// Import User
import { User } from '../../models/user';

// Services
import { AuthService } from '../../providers/authservice';
import { GetUsers } from '../../providers/get-users';

// For setting root page to login page
import { LoginPage } from '../login/login';

// Validators
import { UsernameValidator } from  '../validators/v_username';

@Component({
  selector: 'page-new-user',
  templateUrl: 'new-user.html'
})
export class NewUserPage {

  signUpForm: FormGroup;
  submitAttempt: boolean = false;
  user: User;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, 
              public authservice: AuthService, public getUserService: GetUsers, public alertcontroller: AlertController) {

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

    if(this.signUpForm.valid){

      console.log(this.signUpForm.value);

      this.getUserService.newUser(this.signUpForm.value).subscribe( user_id => {

        var alert = this.alertcontroller.create({
          title: "Success!",
          subTitle: "User Created.",
          buttons: ["ok"]
        });
        alert.present();

      });

    }
  }



    // save(){
    //   this.submitAttempt = true;
    //   let newUser = this.signUpForm.value;
      
    //   if(newUser){

    //     this.authservice.adduser(newUser).then(data => {
    //       if(data){
    //         var alert = this.alertcontroller.create({
    //           title: "Success!",
    //           subTitle: "User Created.",
    //           buttons: ["ok"]
    //         });
    //         alert.present();

    //       }
    //     })
    //   }
    // }

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
