import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private loginFire: AngularFireAuth) { }



  async register(email: string, pass: string) {
    try {
      return await this.loginFire.createUserWithEmailAndPassword(email, pass);
    }catch (err) {
      console.log("error en login: ", err);
      return null;
    }
  }



  login (email:string, pass:string){
    return  this.loginFire.signInWithEmailAndPassword(email, pass);          
    }

  logout(){
    return  this.loginFire.signOut();
    }




}
