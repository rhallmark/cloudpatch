import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { FormBuilder, Validators } from "@angular/forms";
import { NavController, AlertController } from 'ionic-angular';

import { DrProfile } from '../pages/dr-profile/dr-profile';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { SelectPatientPage } from '../pages/select-patient/select-patient';
import { NewPatientPage } from '../pages/new-patient/new-patient';
import { NewUserPage } from '../pages/new-user/new-user';

// Station Pages
import { StationsPage } from '../pages/stations/stations';
import { PatientTriagePage } from '../pages/stations/patient-triage/patient-triage';
import { PatientCarePage } from '../pages/stations/patient-care/patient-care';
import { PatientLabPage } from '../pages/stations/patient-lab/patient-lab';
import { PatientEnmtPage } from '../pages/stations/patient-enmt/patient-enmt';
import { PatientBackPage } from '../pages/stations/patient-back/patient-back';
import { PatientOpticalPage } from '../pages/stations/patient-optical/patient-optical';
import { PatientRespiratoryPage } from '../pages/stations/patient-respiratory/patient-respiratory';
import { PatientCardiovascularPage } from '../pages/stations/patient-cardiovascular/patient-cardiovascular';
import { PatientGastrointestinalPage } from '../pages/stations/patient-gastrointestinal/patient-gastrointestinal';
import { PatientMusculoskeletalPage } from '../pages/stations/patient-musculoskeletal/patient-musculoskeletal';
import { PatientPsychiatricPage } from '../pages/stations/patient-psychiatric/patient-psychiatric';
import { PatientWomenPage } from '../pages/stations/patient-women-health/patient-women';

// Services
import { GetUsers } from '../providers/get-users';
import { GetPatients } from '../providers/get-patients';
import { AuthService } from '../providers/authservice';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    AboutPage,
    SelectPatientPage,
    NewPatientPage,
    NewUserPage,
    StationsPage,
    PatientTriagePage,
    PatientCarePage,
    PatientLabPage,
    PatientEnmtPage,
    PatientBackPage,
    PatientOpticalPage,
    PatientRespiratoryPage,
    PatientCardiovascularPage,
    PatientGastrointestinalPage,
    PatientMusculoskeletalPage,
    PatientPsychiatricPage,
    PatientWomenPage,
    DrProfile,
  ],
  imports: [
    IonicModule.forRoot(MyApp), 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AboutPage,
    SelectPatientPage,
    NewPatientPage,
    NewUserPage,
    StationsPage,
    PatientTriagePage,
    PatientCarePage,
    PatientLabPage,
    PatientEnmtPage,
    PatientBackPage,
    PatientOpticalPage,
    PatientRespiratoryPage,
    PatientCardiovascularPage,
    PatientGastrointestinalPage,
    PatientMusculoskeletalPage,
    PatientPsychiatricPage,
    PatientWomenPage,
    DrProfile
  ],
  providers: [ GetUsers, GetPatients, AuthService ]
})
export class AppModule {}
