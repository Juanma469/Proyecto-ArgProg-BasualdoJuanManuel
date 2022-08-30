import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { SubirImagenesService } from 'src/app/servicios/subir-imagenes.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Proyectos } from 'src/app/models/proyectos';
import { ProyectosService } from 'src/app/servicios/proyectos.service';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  editable: boolean = true;
  proyectos: Proyectos[] = [];
  formularioProyecto: FormGroup;
  formularioProyectoEditar: FormGroup;
  imagenSeleccionada: any;
  imgSubida: boolean = false;
  regfotoEditar: any;
  imgSubidaEditada: any;

  constructor(private proService: ProyectosService,
    private formbulder: FormBuilder,
    private storageService: SubirImagenesService,
    private sesion: AngularFireAuth) {



    //FORMULARIO REGISTRO NUEVO 
    this.formularioProyecto = this.formbulder.group({
      id: [0],
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 . \u00E0-\u00FC , : ; ( ) ]{4,50}$/)]],
      tecno: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 . \u00E0-\u00FC , : ; ( ) ]{4,50}$/)]],
      descripcion: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ñ Ñ . \u00E0-\u00FC , : ; ( ) ]{4,200}$/)]],
      link: ['', [Validators.required, Validators.pattern(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)]],
      anio: ['', [Validators.required, Validators.min(1965), Validators.max(2022), Validators.pattern(/^[0-9]{4,4}$/)]],
      imagen: ['../../../../assets/sin-imagen.png']
    })


    //FORMULARIO PARA EDITAR
    this.formularioProyectoEditar = this.formbulder.group({
      idEditar: [0],
      nombreEditar: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 . \u00E0-\u00FC , : ; ( ) ]{4,50}$/)]],
      tecnoEditar: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 . \u00E0-\u00FC , : ; ( ) ]{4,50}$/)]],
      descripcionEditar: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ñ Ñ . \u00E0-\u00FC , : ; ( ) ]{4,200}$/)]],
      linkEditar: ['', [Validators.required, Validators.pattern(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)]],
      anioEditar: ['', [Validators.required, Validators.min(1965), Validators.max(2022), Validators.pattern(/^[0-9]{4,4}$/)]],
      imagenEditar: ['']

    })


  }

  ngOnInit(): void {
    this.mostrarProyectos();
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
  public mostrarProyectos() {
    this.proService.obtenerProyectos().subscribe({
      next: (res: Proyectos[]) => {
        this.proyectos = res
      },
      error: (error: HttpErrorResponse) => {
        alert("Error en la consulta  de proyectos-->" + error.message);
      }
    })
  }




  //GUARDAR NUEVO REGISTRO
  public guardarProyecto(): void {

    if (!this.formularioProyecto.invalid) {
      let nuevoProyecto: Proyectos = {
        id: this.formularioProyecto.value.id,
        nombre: this.formularioProyecto.value.nombre,
        tecno: this.formularioProyecto.value.tecno,
        descripcion: this.formularioProyecto.value.descripcion,
        link: this.formularioProyecto.value.link,
        fecha: this.formularioProyecto.value.anio,
        img: this.formularioProyecto.value.imagen
      }

      this.proService.crearProyecto(nuevoProyecto).subscribe({
        next: () => {
          Swal.fire({ position: 'top-end', icon: 'success', title: 'Guardado!', showConfirmButton: false, timer: 1000 })

          document.getElementById('cerrarModalProyecto')?.click();
          this.ngOnInit();
          this.formularioProyecto.reset();

        },
        error: (error: HttpErrorResponse) => {
          alert("error")
          console.log(error.message)
        }
      })

      this.ngOnInit();
      this.formularioProyecto.reset();
    }
    else {
      Swal.fire({ position: 'top-end', icon: 'error', title: 'Algo salio mal', showConfirmButton: false, timer: 1000 })
    }

  }




  //TRAER REGISTRO A ACTUALIZAR
  public editarProyecto(i: number) {
    this.formularioProyectoEditar.setValue({
      idEditar: this.proyectos[i].id,
      nombreEditar: this.proyectos[i].nombre,
      tecnoEditar: this.proyectos[i].tecno,
      descripcionEditar: this.proyectos[i].descripcion,
      linkEditar: this.proyectos[i].link,
      anioEditar: this.proyectos[i].fecha,
      imagenEditar: this.proyectos[i].img
    });

  }


  //ACTUALIZAR EDUCACION 
  public guardarProyectoEditado() {

    if (!this.formularioProyectoEditar.invalid) {
      let proyectoEditado: Proyectos = {
        id: this.formularioProyectoEditar.value.idEditar,
        nombre: this.formularioProyectoEditar.value.nombreEditar,
        tecno: this.formularioProyectoEditar.value.tecnoEditar,
        descripcion: this.formularioProyectoEditar.value.descripcionEditar,
        link: this.formularioProyectoEditar.value.linkEditar,
        fecha: this.formularioProyectoEditar.value.anioEditar,
        img: this.formularioProyectoEditar.value.imagen
      }


      this.proService.actualizarProyecto(proyectoEditado).subscribe({
        next: res => {
          Swal.fire({ position: 'top-end', icon: 'success', title: 'Actualizado!', showConfirmButton: false, timer: 1000 })

          document.getElementById('cerrarModalProyectoEditar')?.click();
          this.ngOnInit();
          this.formularioProyectoEditar.reset();

        },
        error: (error: HttpErrorResponse) => {
          alert(error.message)
        }
      })

      document.getElementById('cerrarModalProyectoEditar')?.click();
      this.ngOnInit();
      this.formularioProyecto.reset();
    }
    else {
      Swal.fire({ position: 'top-end', icon: 'error', title: 'Algo salio mal y no se pudo actualizar', showConfirmButton: false, timer: 1000 })
    }
  }



  //BORRAR EXPERIENCIA
  public borrarProyecto(id: number) {

    Swal.fire({ title: '¿Estas seguro?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Si, borrar' }).then((result) => {
      if (result.isConfirmed) {
        this.proService.borrarProyecto(id).subscribe({
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
    this.regfotoEditar = this.proyectos[i]
  }

  //CARGAR FOTO Y GUARDARLA 
  actualizarFotoPerfil() {
    let proyectoActualizado: any = this.regfotoEditar
    proyectoActualizado.img = this.imagenSeleccionada


    this.proService.actualizarProyecto(proyectoActualizado).subscribe({
      next: res => {
        Swal.fire({ position: 'top-end', icon: 'success', title: '!Foto actualizada¡', showConfirmButton: false, timer: 1000 })

        document.getElementById('cerrarmodalfotoProyecto')?.click();
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    })

    document.getElementById('cerrarmodalfotoProyecto')?.click();
    this.ngOnInit();
    this.imagenSeleccionada = '';
  }


  //ENVIAR FOTO A FIREBASE PARA GUARDARLA
  imagenes: any[] = [];
  editarimg(event: any) {
    if (event != null) {
      this.imagenSeleccionada = "../../../../assets/loader.gif";
      let archivos = event.target.files;
      let nombre = "fotoProyecto";
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
    this.formularioProyecto.reset()
    this.imagenSeleccionada = '';
    this.imgSubida = false;

    this.formularioProyectoEditar.reset()
    this.imgSubidaEditada = false;
  }





}




