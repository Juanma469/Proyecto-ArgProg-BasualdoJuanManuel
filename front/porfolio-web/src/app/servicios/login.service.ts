import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private loginFire: AngularFireAuth) { }



  async register(email: string, pass: string) {
    try {
      return await this.loginFire.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("error en login: ", err);
      return null;
    }
  }



  async login (email:string, pass:string){
 
    try {
      return await this.loginFire.signInWithEmailAndPassword(email, pass);
    } catch (e) {
      console.log("error en login: ", e);
      return null;
    }

  }
}
