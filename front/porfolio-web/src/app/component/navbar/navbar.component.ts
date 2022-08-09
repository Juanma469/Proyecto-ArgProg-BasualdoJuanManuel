import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logeado:boolean = true;

  
  constructor(private loginServ: LoginService,
              private router: Router) { }

  ngOnInit(): void {
  }

 cerrarSesion(){
  this.loginServ.logout()
  .then(()=>{
    this.router.navigate(['login']);
  })
  .catch(error =>console.log(error))
  
 }

}
