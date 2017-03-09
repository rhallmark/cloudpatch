import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

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

myUser: User;
users: User[];
originalUsers: User[];
options: string = "myDetails";

  constructor(public navCtrl: NavController, public authservice: AuthService, public alertcontroller: AlertController, 
  public getUserService: GetUsers, private navParams: NavParams,) {

    let username = navParams.get('username');

    getUserService.getUID(username).subscribe( user =>{
      if(user._id){
        let userID: string = user._id.toString();

        getUserService.getUser(userID).subscribe( user =>{
          this.myUser = user;
        });
      }
    });


    getUserService.getUserList().subscribe( users =>{
      this.users = users;
      this.originalUsers = users;
    });
  }



  deleteUser(e, user: User) {
    let alert = this.alertcontroller.create({
        title: 'Delete User?',
        subTitle: ('Are you sure you want to delete '+user.user_first_name)
        });

    alert.addButton({
      text: 'Delete',
      handler: data => {

        this.getUserService.deleteUser(user._id.toString()).subscribe( deleteData =>{
          console.log(deleteData)
        });

      }
    });

    alert.addButton({
      text: 'Cancel',
      handler: data => {
        //Insert Cancel stuff here?
      }
    });

    alert.present();
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
