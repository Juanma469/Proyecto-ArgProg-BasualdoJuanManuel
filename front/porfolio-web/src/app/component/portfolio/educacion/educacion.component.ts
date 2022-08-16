import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Educacion } from '../../../models/educacion'
import { EducacionService } from 'src/app/servicios/educacion.service';


import Swal from 'sweetalert2';
import { SubirImagenesService } from 'src/app/servicios/subir-imagenes.service';



@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})

export class EducacionComponent implements OnInit {
  public educacion: Educacion[] = []; 
  public formularioEducacion: FormGroup;
  public tituloFormulario: string = "Agregar nueva educacion";

  constructor(private eduService: EducacionService, private formbulder:FormBuilder, private storageService:SubirImagenesService) { 
   // *********VALORES DE FORMULARIO POR DEFECTO Y VALIDACIONES
    this.formularioEducacion = this.formbulder.group({
      id: [0],
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      anio: ['', [Validators.required]],
      imagen: ['',[]]

    })
  }



  ngOnInit(): void {
    this.traerEducacion();
  }



// *********TRAER TODOS LOS REGISTROS DE EDUCACION GUARDADOS
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




//// *********CAMBIAR TITULO SI ES UN REG. NUEVO
nuevaEducacion(){
  this.tituloFormulario = "Agregar nueva Educacion";
}


//// *********CARGAR FORMULARIO CON DATOS A EDITAR
editarEducacion(i:number){
  this.tituloFormulario = "Editar educacion";
  this.formularioEducacion.setValue({
    id: this.educacion[i].id,
    titulo: this.educacion[i].titulo,
    descripcion: this.educacion[i].descripcion,
    anio: this.educacion[i].fecha,
    imagen: this.educacion[i].img
  });
  let abrirModal = document.getElementById('modalcrearEditar');
  abrirModal?.click();
  }





//// *********GUARDAR SI EL ID ES IGUAL A 0 O EDITAR SI ES MAYOR
public guardarEditarEducacion():void{
    if(!this.formularioEducacion.invalid){
  
      let nuevaEducacion:Educacion = {
        id:this.formularioEducacion.value.id,
        titulo:this.formularioEducacion.value.titulo,
        descripcion:this.formularioEducacion.value.descripcion,
        fecha:this.formularioEducacion.value.anio,
        img:this.formularioEducacion.value.img
        
      }
    
      if(nuevaEducacion.id<1){
        this.eduService.crearEducacion(nuevaEducacion).subscribe({
          next: res=>{ 
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Guardado!',
              showConfirmButton: false,
              timer: 1000
            })           
            
            document.getElementById('cerrarModal')?.click();
            this.ngOnInit();
            this.formularioEducacion.reset();
           
          },
          error: (error:HttpErrorResponse)=>{
            alert ("eraasdasdror" + error)
          }
        })

      }
       else{
        this.eduService.actualizarEducacion(nuevaEducacion).subscribe({
          next: res =>{
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: '¡Actualizado!',
              showConfirmButton: false,
              timer: 1000
            })
            
            document.getElementById('cerrarModal')?.click();
            this.ngOnInit();
            this.formularioEducacion.reset();
            
          },
          error: (error:HttpErrorResponse)=>{
            console.log(error)
          }
        })
      }
  
            this.ngOnInit();
            this.formularioEducacion.reset();
    }
    else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Algo salio mal',
        showConfirmButton: false,
        timer: 1000
      })
    }
   
  }



  
//// *********BORRAR EDUCACION
public borrarEducacion(id:number){
 
  Swal.fire({
      title: '¿Estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.eduService.borrarEducacion(id).subscribe({
          next: (res) =>{      
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Se elimino correctamente',
              showConfirmButton: false,
              timer: 1000
            })
            this.ngOnInit();
          },
          error: (error:HttpErrorResponse)=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo salio mal'       
            })
          }
      })
    }
 })     
}


//******IMAGENES */

imagenes: any[] = [];
cargarImagen(event: any) {
  let archivos = event.target.files;
  let nombre = "jonathan";

  for (let i = 0; i < archivos.length; i++) {

    let reader = new FileReader();
    reader.readAsDataURL(archivos[0]);
    reader.onloadend = () => {
      console.log(reader.result);
      this.imagenes.push(reader.result);
      this.storageService.subirImagen(nombre + "_" + Date.now(), reader.result).then(urlImagen => {
        // let usuario = {
        //   name: "jonathan",
        //   nickName: "yonykikok",
        //   password: "401325",
        //   imgProfile: urlImagen
        // }
        console.log(urlImagen);
      });
    }
  }




}

}
