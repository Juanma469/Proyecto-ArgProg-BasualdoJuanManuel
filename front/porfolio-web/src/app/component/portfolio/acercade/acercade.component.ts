import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AcercadeService } from 'src/app/servicios/acercade.service';


@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {
  public usuario: Usuario | undefined;
  constructor(private acercadeService: AcercadeService ) { }

  ngOnInit(): void {
    this.obtenerUsuario()
  }

  public obtenerUsuario():void {   
   this.acercadeService.obtenerUsuario().subscribe({
    next:(response: Usuario) =>{
      this.usuario = response;
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
   })
  }



}
