import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Educacion } from '../../../models/educacion'
import { EducacionService } from 'src/app/servicios/educacion.service';


import Swal from 'sweetalert2';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SubirImagenesService } from 'src/app/servicios/subir-imagenes.service';



@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})

export class EducacionComponent implements OnInit {
  educacion: Educacion[] = [];
  formularioEducacion: FormGroup;
  formularioEducacioEditar: FormGroup;
  imagenSeleccionada: any;
  imgSubida: boolean = false;

  regfotoEditar: any;
  imagenSeleccionadaEditada: any;
  editable: boolean = false;

  constructor(private eduService: EducacionService,
              private formbulder: FormBuilder,
              private sesion: AngularFireAuth,
              private storageService: SubirImagenesService) {

    //FORMULARIO REGISTRO NUEVO 
    this.formularioEducacion = this.formbulder.group({
      id: [0],
      titulo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z . \u00E0-\u00FC , : ; ( ) ]{4,50}$/)]],
      descripcion: ['', [Validators.required, Validators.pattern(/^[a-zA-Z 0-9 ñ Ñ . \u00E0-\u00FC , : ; ( ) ]{4,200}$/)]],
      anio: ['', [Validators.required, Validators.min(1965), Validators.max(2022), Validators.pattern(/^[0-9]{4,4}$/)]],
      imagen: ['../../../../assets/sin-imagen.png']
    })

    //FORMULARIO PARA EDITAR
    this.formularioEducacioEditar = this.formbulder.group({
      idEditar: [0],
      tituloEditar: ['', [Validators.required, Validators.pattern(/^[a-zA-Z . \u00E0-\u00FC , : ; ( ) ]{4,50}$/)]],
      descripcionEditar: ['', [Validators.required, Validators.pattern(/^[a-zA-Z 0-9 ñ Ñ . \u00E0-\u00FC , : ; ( ) ]{4,200}$/)]],
      anioEditar: ['', [Validators.required, Validators.min(1965), Validators.max(2022), Validators.pattern(/^[0-9]{4,4}$/)]],
      imagenEditar: ['']
    })
  }



  ngOnInit(): void {
    this.mostrarEducaciones();
    //VER SI HAY SESION INICIADA PARA HABILITAR LA EDICION
    this.sesion.onAuthStateChanged((user: any) => {
      if (user) {
        this.editable = true;
      }
      else {
        this.editable = false;
      }
    });
  }


  //TRAER TODOS LOS REGISTROS DE EDUCACION GUARDADOS
  public mostrarEducaciones(): void {
    this.eduService.obtenerEducacion().subscribe({
      next: (res: Educacion[]) => {
        this.educacion = res;
      },
      error: (error: HttpErrorResponse) => {
        alert("Error en la consulta de educacion -->" + error.message);
      }
    })
  }


  //GUARDAR NUEVO REGISTRO
   guardarEducacion(): void {

    if (!this.formularioEducacion.invalid) {

      let nuevaEducacion: Educacion = {
        id: this.formularioEducacion.value.id,
        titulo: this.formularioEducacion.value.titulo,
        descripcion: this.formularioEducacion.value.descripcion,
        fecha: this.formularioEducacion.value.anio,
        img: this.formularioEducacion.value.imagen
      }


      this.eduService.crearEducacion(nuevaEducacion).subscribe({
        next: res => {
          Swal.fire({ position: 'top-end', icon: 'success', title: 'Guardado!', showConfirmButton: false, timer: 1000 })

          document.getElementById('cerrarModal')?.click();
          this.ngOnInit();
        },
        error: (error: HttpErrorResponse) => {
          alert("error")
          console.log(error.message)
        }
      })

      this.ngOnInit();

    }
    else {
      Swal.fire({ position: 'top-end', icon: 'error', title: 'Algo salio mal', showConfirmButton: false, timer: 1000 })
    }

  }

  //MOSTRAR INFO A EDITAR EN EL FORMULARIO 
   editarEducacion(i:number) {

    this.formularioEducacioEditar.setValue({
      idEditar: this.educacion[i].id,
      tituloEditar: this.educacion[i].titulo,
      descripcionEditar: this.educacion[i].descripcion,
      anioEditar: this.educacion[i].fecha,
      imagenEditar: this.educacion[i].img,
    });
  }


  //ACTUALIZAR EDUCACION 
   guardarEducacionEditada() {

    if (!this.formularioEducacioEditar.invalid) {
      let educacionEditada: Educacion = {
        id: this.formularioEducacioEditar.value.idEditar,
        titulo: this.formularioEducacioEditar.value.tituloEditar,
        descripcion: this.formularioEducacioEditar.value.descripcionEditar,
        fecha: this.formularioEducacioEditar.value.anioEditar,
        img: this.formularioEducacioEditar.value.imagenEditar

      }

      this.eduService.actualizarEducacion(educacionEditada).subscribe({
        next: res => {
          Swal.fire({
            position: 'top-end', icon: 'success', title: 'Actualizado!', showConfirmButton: false, timer: 1000
          })

          document.getElementById('cerrarModalEditar')?.click();
          this.ngOnInit();
          this.formularioEducacioEditar.reset();

        },
        error: (error: HttpErrorResponse) => {
          alert(error.message)
        }
      })

      document.getElementById('cerrarModalEditado')?.click();
      this.ngOnInit();
      this.formularioEducacion.reset();
    }
    else {
      Swal.fire({ position: 'top-end', icon: 'error', title: 'Algo salio mal y no se pudo actualizar', showConfirmButton: false, timer: 1000 })
    }
  }


  //BORRAR EDUCACION
  public borrarEducacion(id: number) {

    Swal.fire({title: '¿Estas seguro?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eduService.borrarEducacion(id).subscribe({
          next: () => {
            Swal.fire({ position: 'top-end', icon: 'success', title: 'Se elimino correctamente', showConfirmButton: false, timer: 1000 })
            this.ngOnInit();
          },
          error: (error: HttpErrorResponse) => {
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Algo salio mal' + error.message })
          }
        })
      }
    })
  }

  
 


  editarFoto(i: number) {
    this.regfotoEditar = this.educacion[i]    
  }

//CARGAR FOTO Y GUARDARLA 
  actualizarFotoPerfil() {
    let educacionActualizada: any = this.regfotoEditar
    educacionActualizada.img = this.imagenSeleccionada


    this.eduService.actualizarEducacion(educacionActualizada).subscribe({
      next: res => {
        Swal.fire({ position: 'top-end', icon: 'success', title: '!Foto actualizada¡', showConfirmButton: false, timer: 1000 })

        document.getElementById('cerrarmodalfoto')?.click();
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    })

    document.getElementById('cerrarmodalfoto')?.click();
    this.ngOnInit();
    this.imagenSeleccionada = '';
  }


  //ENVIAR FOTO A FIREBASE PARA GUARDARLA
  imagenes: any[] = [];
  editarimg(event: any) {
    if (event != null) {
      this.imagenSeleccionada = "../../../../assets/loader.gif";
      let archivos = event.target.files;
      let nombre = "fotoEducacion";
      for (let i = 0; i < archivos.length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(archivos[0]);
        reader.onloadend = () => {
          this.imagenes.push(reader.result);
          this.storageService.subirImagen(nombre + "_" + Date.now(), reader.result).then(urlImagen => {
            this.imgSubida = true;
            this.imagenSeleccionada = urlImagen;
         
          });
        }
      }
    }
  }





   //****** RESETEAR FORMULARIOS *******/
   resetearFormulario() {
    this.formularioEducacion.reset()
    this.imagenSeleccionada = '';
    this.imgSubida = false;

    this.formularioEducacioEditar.reset()
    this.imagenSeleccionadaEditada = '';
    
  }




}
