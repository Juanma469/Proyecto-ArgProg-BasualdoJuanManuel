import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/models/Educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  public educacion: Educacion[] = []; 
  constructor(private eduService: EducacionService) { }

  ngOnInit(): void {
    this.traerEducacion();
  }

public traerEducacion():void{
  this.eduService.obtenerEducacion().subscribe({
    next: (res: Educacion[]) =>{
      this.educacion = res;
    },
    error: (error:HttpErrorResponse)=>{
        alert("Error en la consulta -->" + error.message);
    }
  })
}

public borrarEducacion(id:number){
  alert (id);
  Swal.fire({
    title: '¿Seguro?',
    text: "¿Estas seguro de querer borrar?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, ¡borrar!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '!Borrado!',
        'Se elimino correctamente',
        'success'
      )
    }
  })
}


}
