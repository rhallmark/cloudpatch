import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
//import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
//import { ItemDetailsPage } from '../pages/item-details/item-details';
//import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { SelectPatientPage } from '../pages/select-patient/select-patient';
import { NewPatientPage } from '../pages/new-patient/new-patient';

import { PatientTriagePage } from '../pages/patient-triage/patient-triage';

import { GetPatients } from '../providers/get-patients';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    AboutPage,
    SelectPatientPage,
    NewPatientPage,
    PatientTriagePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AboutPage,
    SelectPatientPage,
    NewPatientPage,
    PatientTriagePage
  ],
  providers: [ GetPatients ]
})
export class AppModule {}
