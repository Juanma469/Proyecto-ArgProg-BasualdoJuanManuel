import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private auth:AngularFireAuth) { }


async register(email: string, password: string) {
  try{
    return await this.auth.createUserWithEmailAndPassword(email, password)
  } catch (error){
      return error
  }
}




async signIn(email: string, password: string) {
  try{
    return await this.auth.signInWithEmailAndPassword(email, password); 
  } catch (error) { 
      return error;
  }
}




}
