import { Component, ViewChild } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from 'ionic-native';

import { DrProfile } from '../pages/dr-profile/dr-profile';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { SelectPatientPage } from '../pages/select-patient/select-patient';
import { NewPatientPage } from '../pages/new-patient/new-patient';
import { NewAdminPage } from '../pages/new-admin/new-admin';

// needed?
import { StationsPage } from '../pages/stations/stations';

// Services
import { GetPatients } from '../providers/get-patients';
import { AuthService } from '../providers/authservice';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any}>;

  pages_auth: Array<{title: string, component: any}> = [
      { title: 'My Profile', component: DrProfile },
      { title: 'Select Patient', component: SelectPatientPage },
      { title: 'New Patient', component: NewPatientPage },
      { title: 'New Administrator', component: NewAdminPage },
      { title: 'About CloudPatch', component: AboutPage }
    ];

  pages_unauth: Array<{title: string, component: any}> = [
      { title: 'Login', component: LoginPage },
      { title: 'About CloudPatch', component: AboutPage }
    ];


  constructor(public platform: Platform, public menu: MenuController, public authservice: AuthService, public alertcontroller: AlertController) {
    this.initializeApp();

    // set our app's pages
    // This is like router in Angular2
    // If logged in with JWT, display auth pages
    // Currently merely checking to see if token jwt exists
    // need a method on backend to check to see if it is valid
    // This should load auth token, create local variable if it exists
    this.authservice.loadUserCredentials();
    let AuthToken = this.authservice.AuthToken;
    console.log(AuthToken);

    if(AuthToken){
      this.rootPage = DrProfile;
      this.pages = this.pages_auth;
    }
    else{
      this.pages = this.pages_unauth;
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
