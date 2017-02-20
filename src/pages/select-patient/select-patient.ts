import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// Data Members
import { Patient } from '../../models/patient';

// Pages
import { LoginPage } from '../login/login';
import { StationsPage } from '../stations/stations';
import { PatientTriagePage } from '../stations/patient-triage/patient-triage';

// Services
import { GetPatients } from '../../providers/get-patients';
import { AuthService } from '../../providers/authservice';

@Component({
  selector: 'page-select-patient',
  templateUrl: 'select-patient.html'
})
export class SelectPatientPage {

  patients: Patient[];
  originalPatients: Patient[];

  constructor(public navCtrl: NavController, private getPatientService: GetPatients, public authservice: AuthService,
              public alertcontroller: AlertController) {
    getPatientService.getPatientList().subscribe( patients =>{
      this.patients = patients;
      this.originalPatients = patients;
    })

  }

  // ionViewWillLeave(){
  //   this.patients=this.originalPatients;
  // }


  search(searchEvent){

      let searchterm: string = searchEvent.target.value;

      //only perform searches on terms greater than length 2
      if(searchterm.trim() == '' || searchterm.trim().length < 2){
        //load original users
        this.patients = this.originalPatients;
      }
      else {
        //get newly searched users
        var obj = { "searchTerm":searchterm};
        console.log(obj);
        var testSearch = this.getPatientService.searchPatients(obj).subscribe(updatedList => {
          console.log(updatedList);
          this.patients = updatedList;
        })
      }
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



  navToStations(patient: Patient) {
    this.navCtrl.push(StationsPage, {patient});
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
