import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// Services
import { GetPatients } from '../../providers/get-patients';
import { AuthService } from '../../providers/authservice';

// For setting root page to login page
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-dr-profile',
  templateUrl: 'dr-profile.html',

})
export class DrProfile {

  constructor(public navCtrl: NavController, public authservice: AuthService, public alertcontroller: AlertController) {}

  ionViewDidLoad() {

  }


  logout(){
    this.authservice.destroyUserCredentials();
    this.navCtrl.setRoot(LoginPage);
    window.location.reload(true);
  }

}
