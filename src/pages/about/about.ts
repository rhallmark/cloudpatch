import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// Services
import { AuthService } from '../../providers/authservice';

// For setting root page to login page
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public authservice: AuthService, 
              public alertcontroller: AlertController) {}




  logout(){
    // If use is logged in, destroy token and display logout message
    if(this.authservice.AuthToken){
      this.authservice.destroyUserCredentials();
        let alert = this.alertcontroller.create({
            title: 'Logged Out',
            subTitle: 'You have successfully logged out.',
            buttons: ['OK']
            });
        alert.present();
    }
    this.navCtrl.setRoot(LoginPage);
  }

}
