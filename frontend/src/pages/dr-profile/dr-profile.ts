import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  submitAttempt: boolean = false;
  profileForm: FormGroup;

  user: User;
  id: string;
  users: User[];
  originalUsers: User[];
  options: string = "myDetails";

  constructor(public navCtrl: NavController, public authservice: AuthService, public alertcontroller: AlertController, 
  public getUserService: GetUsers, private navParams: NavParams, public formBuilder: FormBuilder ) {

    this.id = navParams.get('userID');
    console.log(this.id);

    if(this.id){
      this.getUserService.getUser(this.id).subscribe( fullUser =>{
        console.log(fullUser);

        this.user = fullUser;

        // this.profileForm = formBuilder.group({
        //     username: [this.user.username],
        //     user_prefix: [this.user.user_prefix],
        //     user_first_name: [this.user.user_first_name],
        //     user_last_name: [this.user.user_last_name],
        //     account_type: [this.user.account_type],
        //     bio: [this.user.bio],
        //     contact_phone: [this.user.contact_phone],
        //     contact_email: [this.user.contact_email]
        // });

      });
    }

    getUserService.getUserList().subscribe( users =>{
      this.users = users;
      this.originalUsers = users;
    });
  }


  deleteUser(e, user: User, index) {
    let alert = this.alertcontroller.create({
        title: 'Delete User?',
        subTitle: ('Are you sure you want to delete '+user.user_first_name)
        });

    alert.addButton({
      text: 'Delete',
      handler: data => {
        //Delete user then reload user list
        this.getUserService.deleteUser(user._id.toString()).subscribe( deleteData =>{
          this.users.splice(index,1)
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





//  ionViewCanEnter(){
//    if(!this.authservice.AuthToken){
//      let alert = this.alertcontroller.create({
//          title: 'Error!',
//          subTitle: 'Please Log in first.',
//          buttons: ['OK']
//          });
//      alert.present();
//      return false;
//    }
//  }


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
