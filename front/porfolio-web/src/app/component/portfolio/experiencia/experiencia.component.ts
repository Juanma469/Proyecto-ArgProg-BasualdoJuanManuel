import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { SubirImagenesService } from 'src/app/servicios/subir-imagenes.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  editable: boolean = true;
  experiencia: Experiencia[] = [];
  formularioExperiencia: FormGroup;
  formularioExperienciaEditar: FormGroup;
  imagenSeleccionada: any;
  imgSubida: boolean = false;
  imgSubidaEditada: boolean = false;
  regfotoEditar: any;


  constructor(private expService: ExperienciaService,
    private formbulder: FormBuilder,
    private storageService: SubirImagenesService,
    private sesion: AngularFireAuth) {



    //FORMULARIO REGISTRO NUEVO 
    this.formularioExperiencia = this.formbulder.group({
      id: [0],
      titulo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z . \u00E0-\u00FC , : ; ( ) ]{4,50}$/)]],
      puesto: ['', [Validators.required, Validators.pattern(/^[a-zA-Z . \u00E0-\u00FC , : ; ( ) ]{4,50}$/)]],
      descripcion: ['', [Validators.required, Validators.pattern(/^[a-zA-Z 0-9 ñ Ñ . \u00E0-\u00FC , : ; ( ) ]{4,200}$/)]],
      anio: ['', [Validators.required, Validators.min(1965), Validators.max(2022), Validators.pattern(/^[0-9]{4,4}$/)]],
      imagen: ['../../../../assets/sin-imagen.png']
    })

    //FORMULARIO PARA EDITAR
    this.formularioExperienciaEditar = this.formbulder.group({
      idEditar: [0],
      tituloEditar: ['', [Validators.required, Validators.pattern(/^[a-zA-Z . \u00E0-\u00FC , : ; ( ) ]{4,50}$/)]],
      puestoEditar: ['', [Validators.required, Validators.pattern(/^[a-zA-Z . \u00E0-\u00FC , : ; ( ) ]{4,50}$/)]],
      descripcionEditar: ['', [Validators.required, Validators.pattern(/^[a-zA-Z 0-9 ñ Ñ . \u00E0-\u00FC , : ; ( ) ]{4,200}$/)]],
      anioEditar: ['', [Validators.required, Validators.min(1965), Validators.max(2022), Validators.pattern(/^[0-9]{4,4}$/)]],
      imagenEditar: ['']
    })





  }


  ngOnInit(): void {
    this.mostrarExperiencias();
    
    //VERIFICAR SI TIENE SESION ACTIVA PARA EDITAR
    this.sesion.onAuthStateChanged((user: any) => {
      if (user) {
        this.editable = true;
      }
      else {
        this.editable = false;
      }
    });


  }




  //TRAER TODOS LOS REGISTROS 
  public mostrarExperiencias() {
    this.expService.obtenerExperiencia().subscribe({
      next: (res: Experiencia[]) => {
        this.experiencia = res

      },
      error: (error: HttpErrorResponse) => {
        alert("Error en la consulta  de experiencia-->" + error.message);
      }
    })
  }




  //GUARDAR NUEVO REGISTRO
  public guardarExperiencia(): void {

    if (!this.formularioExperiencia.invalid) {
      let nuevaExperiencia: Experiencia = {
        id: this.formularioExperiencia.value.id,
        titulo: this.formularioExperiencia.value.titulo,
        puesto: this.formularioExperiencia.value.puesto,
        descripcion: this.formularioExperiencia.value.descripcion,
        fecha: this.formularioExperiencia.value.anio,
        img: this.formularioExperiencia.value.imagen

      }

      this.expService.crearExperiencia(nuevaExperiencia).subscribe({
        next: res => {
          Swal.fire({ position: 'top-end', icon: 'success', title: 'Guardado!', showConfirmButton: false, timer: 1000 })

          document.getElementById('cerrarModalExperiencia')?.click();
          this.ngOnInit();
          this.formularioExperiencia.reset();

        },
        error: (error: HttpErrorResponse) => {
          alert("error")

        }
      })

      this.ngOnInit();
      this.formularioExperiencia.reset();
    }
    else {
      Swal.fire({ position: 'top-end', icon: 'error', title: 'Algo salio mal', showConfirmButton: false, timer: 1000 })
    }

  }




  //TRAER REGISTRO A ACTUALIZAR
  public editarExperiencia(i: number) {
    this.formularioExperienciaEditar.setValue({
      idEditar: this.experiencia[i].id,
      tituloEditar: this.experiencia[i].titulo,
      puestoEditar: this.experiencia[i].puesto,
      descripcionEditar: this.experiencia[i].descripcion,
      anioEditar: this.experiencia[i].fecha,
      imagenEditar: this.experiencia[i].img,
    });

  }


  //ACTUALIZAR  
  public guardarExperienciaEditada() {

    if (!this.formularioExperienciaEditar.invalid) {
      let experienciaeditada: Experiencia = {
        id: this.formularioExperienciaEditar.value.idEditar,
        titulo: this.formularioExperienciaEditar.value.tituloEditar,
        puesto: this.formularioExperienciaEditar.value.puestoEditar,
        descripcion: this.formularioExperienciaEditar.value.descripcionEditar,
        fecha: this.formularioExperienciaEditar.value.anioEditar,
        img: this.formularioExperienciaEditar.value.imagenEditar


      }

      this.expService.actualizarExperiencia(experienciaeditada).subscribe({
        next: res => {
          Swal.fire({ position: 'top-end', icon: 'success', title: 'Actualizado!', showConfirmButton: false, timer: 1000 })

          document.getElementById('cerrarModalEditarExperiencia')?.click();
          this.ngOnInit();
          this.formularioExperienciaEditar.reset();

        },
        error: (error: HttpErrorResponse) => {
          alert(error.message)
        }
      })

      document.getElementById('cerrarModalEditarExperiencia')?.click();
      this.ngOnInit();
      this.formularioExperiencia.reset();
    }
    else {
      Swal.fire({ position: 'top-end', icon: 'error', title: 'Algo salio mal y no se pudo actualizar', showConfirmButton: false, timer: 1000 })
    }
  }



  //BORRAR EXPERIENCIA
  public borrarExperiencia(id: number) {

    Swal.fire({ title: '¿Estas seguro?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Si, borrar' }).then((result) => {
      if (result.isConfirmed) {
        this.expService.borrarExperiencia(id).subscribe({
          next: () => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Se elimino correctamente',
              showConfirmButton: false,
              timer: 1000
            })
            this.ngOnInit();
          },
          error: (error: HttpErrorResponse) => {
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Algo salio mal' + error.message })
          }
        })
      }
    })
  }




//ACTUALIZAR Y EDITAR FOTO 
  editarFoto(i: number) {
    this.regfotoEditar = this.experiencia[i]

  }

  //CARGAR FOTO Y GUARDARLA 
  actualizarFotoPerfil() {
    let experienciaActualizada: any = this.regfotoEditar
    experienciaActualizada.img = this.imagenSeleccionada


    this.expService.actualizarExperiencia(experienciaActualizada).subscribe({
      next: res => {
        Swal.fire({ position: 'top-end', icon: 'success', title: '!Foto actualizada¡', showConfirmButton: false, timer: 1000 })

        document.getElementById('cerrarmodalfotoExperiencia')?.click();
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    })

    document.getElementById('cerrarmodalfotoExperiencia')?.click();
    this.ngOnInit();
    this.imagenSeleccionada = '';
  }


  //ENVIAR FOTO A FIREBASE PARA GUARDARLA
  imagenes: any[] = [];
  editarimg(event: any) {
    if (event != null) {
      this.imagenSeleccionada = "../../../../assets/loader.gif";
      let archivos = event.target.files;
      let nombre = "fotoExperiencia";
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
    this.formularioExperiencia.reset()
    this.imagenSeleccionada = '';
    this.imgSubida = false;

    this.formularioExperienciaEditar.reset()

    this.imgSubidaEditada = false;
  }




}
