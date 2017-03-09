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
  sortedPatients: Patient[];

  constructor(public navCtrl: NavController, private getPatientService: GetPatients, public authservice: AuthService,
              public alertcontroller: AlertController) {

      // getPatientService.getPatientList2().then(patients=> {
      //   if(patients){
      //     this.patients = patients;
      //     this.originalPatients = patients;
      //   }
      // });


    getPatientService.getPatientList().subscribe( patients =>{
      this.patients = patients;
      this.originalPatients = patients;
    })
  }

  // Potentially will help with searching stuff?
  // ionViewWillLeave(){
  //   this.patients=this.originalPatients;
//}


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
        });
      }
  }


  sortingOptions() {
    let alert = this.alertcontroller.create();
    alert.setTitle('Sorting Options');


    alert.addInput({
      type: 'radio',
      label: 'A-Z First Name',
      value: 'A-Z First Name',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Z-A First Name',
      value: 'Z-A First Name',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'A-Z Last Name',
      value: 'A-Z Last Name',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Z-A Last Name',
      value: 'Z-A Last Name',
      checked: false
    });

      alert.addInput({
      type: 'radio',
      label: 'Ascending ID',
      value: 'Ascending ID',
      checked: false
    });

      alert.addInput({
      type: 'radio',
      label: 'Descending ID',
      value: 'Descending ID',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        //this.testRadioOpen = false;
        //this.testRadioResult = data;
        this.sort(data);
      }
    });
    alert.present();
  }

  sort(data){
    if(data == "A-Z Last Name"){
      this.getPatientService.getPatientList().subscribe( patients =>{
        this.patients = patients;
      });
    }
    else if(data == "Z-A Last Name"){
      this.getPatientService.getPatientList().subscribe( patients =>{
        this.patients = patients.reverse();
      });
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

  deletePatient(e, patient: Patient, index) {
    let alert = this.alertcontroller.create({
        title: 'Delete Patient?',
        subTitle: ('Are you sure you want to delete '+patient.patient_first_name)
        });

    alert.addButton({
      text: 'Delete',
      handler: data => {
        //Delete user then reload user list
        this.getPatientService.deletePatient(patient._id.toString()).subscribe( deleteData =>{
          this.patients.splice(index,1)
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
