import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// Models
import { User } from '../../models/user';

// Services
import { GetUsers } from '../../providers/get-users'
import { GetPatients } from '../../providers/get-patients';
import { AuthService } from '../../providers/authservice';

// For setting root page to login page
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-dr-profile',
  templateUrl: 'dr-profile.html',

})
export class DrProfile {

users: User[];
originalUsers: User[];
options: string = "myDetails";

  constructor(public navCtrl: NavController, public authservice: AuthService, public alertcontroller: AlertController, public getUserService: GetUsers) {

    getUserService.getUserList().subscribe( users =>{
      this.users = users;
      this.originalUsers = users;
    })
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
