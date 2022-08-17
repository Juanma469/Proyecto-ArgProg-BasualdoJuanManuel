import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = {email:'', password:''};

  constructor(private router:Router, private auth:AuthService) { }
  ngOnInit(): void {}

public ingresar(){
  this.auth.signIn(this.user.email, this.user.password)
}



}
