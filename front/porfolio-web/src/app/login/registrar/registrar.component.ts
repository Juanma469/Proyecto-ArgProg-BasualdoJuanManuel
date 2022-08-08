import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../../servicios/login.service'; 



@Component({
  selector: 'app-register',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegisterComponent implements OnInit {

  usuarios: any;
  usuario = {
    email: '',
    password: '',
    name: ''
  }

  ngOnInit() { }

  constructor(private authService: LoginService) { }

  registrarse() {
    const { email, password } = this.usuario;
    this.authService.register(email, password).then(user => {
      console.log("se registro: ", user);
      let lista = [...this.usuarios];
      
    }).catch(err => {
      console.log(err)
    })
  }



}