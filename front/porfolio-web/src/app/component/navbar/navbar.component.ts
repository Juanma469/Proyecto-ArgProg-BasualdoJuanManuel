import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private usuarioLogeado: AuthService,
    private sesion: AngularFireAuth) { }
  public user: string = '';
  ngOnInit(): void {
    this.sesion.onAuthStateChanged((user: any) => {
      if (user) {
        this.user = user.email.split('@');
      }
      else {
        this.user = '';
      }
    });


  }

  logOut() {
    this.usuarioLogeado.logout();
  }

}