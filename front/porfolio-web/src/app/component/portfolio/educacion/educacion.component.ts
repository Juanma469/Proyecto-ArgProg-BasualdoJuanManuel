import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/models/Educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
import Swal from 'sweetalert2';


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


public consultarOperacion(id:number, metodo:string){
  switch (metodo) {
    case 'borrar':
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.borrarEducacion(id);
        }
      })
      break;

    case 'actualizar':
      
      break;
  }
}

public borrarEducacion(id:number){
  return this.eduService.borrarEducacion(id).subscribe({
    next: (res) =>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    },
    error: (error:HttpErrorResponse)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  })
}


}
