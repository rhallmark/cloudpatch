import { FormControl } from '@angular/forms';
 
export class PatientValidator {
 
  static checkUsername(control: FormControl): any {
 
    return new Promise(resolve => {
 
      //Fake a slow response from server
 
      setTimeout(() => {
        if(control.value.toLowerCase() === "greg"){
 
          resolve({
            "patient already exists": true
          });
 
        } else {
          resolve(null);
        }
      }, 2000);
 
    });
  }
 
}