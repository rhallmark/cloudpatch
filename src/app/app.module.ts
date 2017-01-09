import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { FormBuilder, Validators } from "@angular/forms";
//import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
//import { ItemDetailsPage } from '../pages/item-details/item-details';
//import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { SelectPatientPage } from '../pages/select-patient/select-patient';
import { NewPatientPage } from '../pages/new-patient/new-patient';
import { NewAdminPage } from '../pages/new-admin/new-admin';

import { StationsPage } from '../pages/stations/stations';
import { GetPatients } from '../providers/get-patients';
import { PatientTriagePage } from '../pages/stations/patient-triage/patient-triage';
import { PatientCarePage } from '../pages/stations/patient-care/patient-care';
import { PatientLabPage } from '../pages/stations/patient-lab/patient-lab';
import { PatientEnmtPage } from '../pages/stations/patient-enmt/patient-enmt';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    AboutPage,
    SelectPatientPage,
    NewPatientPage,
    NewAdminPage,
    StationsPage,
    PatientTriagePage,
    PatientCarePage,
    PatientLabPage,
    PatientEnmtPage
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
    NewAdminPage,
    StationsPage,
    PatientTriagePage,
    PatientCarePage,
    PatientLabPage,
    PatientEnmtPage
  ],
  providers: [ GetPatients ]
})
export class AppModule {}
