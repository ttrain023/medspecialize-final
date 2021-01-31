import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user: { email: any; password: any; name: any; role: any; }) {
    if(user.email == undefined || user.password == undefined || user.name == undefined || user.role == undefined){
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateLogin(user: { email: string; password: String;}){
    if(user.email == undefined || user.password == undefined){
      return false;
    } else {
      return true;
    }
  }
}
