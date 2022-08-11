import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { HeaderService } from 'src/app/servicios/header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public usuario: Usuario | undefined;
  public editarUsuario: Usuario | undefined;
  constructor(private headerService: HeaderService ) { }

  ngOnInit(): void {
    this.obtenerUsuario()
  }

  public obtenerUsuario():void {   
   this.headerService.obtenerUsuario().subscribe({
    next:(response: Usuario) =>{
      this.usuario = response;
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
   })
  }



}
