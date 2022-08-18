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
  public editable:boolean = true;
  public experiencia: Experiencia[] = [];
  public formularioExperiencia: FormGroup;
  public formularioExperienciaEditar: FormGroup;
  public imagenSeleccionada: any;
  public imgSubida: boolean = false;
  public imagenSeleccionadaEditada: any;
  public imgSubidaEditada: boolean = false;


  constructor(private expService: ExperienciaService, 
              private formbulder: FormBuilder, 
              private storageService: SubirImagenesService,                   
              private sesion: AngularFireAuth) { 


    
//FORMULARIO REGISTRO NUEVO 
this.formularioExperiencia = this.formbulder.group({
  id: [0],
  titulo: ['', Validators.required],
  puesto: ['', Validators.required],
  descripcion: ['', Validators.required],
  anio: ['',
    [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4)
    ]
  ],
  imagen: ['', Validators.required]
})

//FORMULARIO PARA EDITAR
this.formularioExperienciaEditar = this.formbulder.group({
  idEditar: [0],
  tituloEditar: ['', Validators.required],
  puestoEditar: ['', Validators.required],
  descripcionEditar: ['', Validators.required],
  anioEditar: ['',
    [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(5)
    ]
  ],
  imagenEditar: ['', Validators.required],
  imagenEditarNueva: ['']

})





  }

  
  ngOnInit(): void {
    this.mostrarExperiencias();

    this.sesion.onAuthStateChanged((user:any) => {
      if (user) {           
       this.editable = true;      
      } 
      else {   
        this.editable = false;
      }   
  });


  }


  

  //TRAER TODOS LOS REGISTROS DE EDUCACION GUARDADOS
  public mostrarExperiencias(){
    this.expService.obtenerExperiencia().subscribe({
      next: (res:Experiencia[]) =>{
        this.experiencia = res
      },
      error: (error: HttpErrorResponse) => {
        alert("Error en la consulta  de experiencia-->" + error.message);
      }
    })
  }




  //GUARDAR NUEVO REGISTRO
  public guardarExperiencia(): void {

    if (!this.formularioExperiencia.invalid && this.imgSubida) {
      let nuevaExperiencia: Experiencia = {
        id: this.formularioExperiencia.value.id,
        titulo: this.formularioExperiencia.value.titulo,
        puesto: this.formularioExperiencia.value.puesto,
        descripcion: this.formularioExperiencia.value.descripcion,
        fecha: this.formularioExperiencia.value.anio,
        img: this.imagenSeleccionada
        

      }
      this.expService.crearExperiencia(nuevaExperiencia).subscribe({
        next: res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Guardado!',
            showConfirmButton: false,
            timer: 1000
          })

          document.getElementById('cerrarModal')?.click();
          this.ngOnInit();
          this.formularioExperiencia.reset();

        },
        error: (error: HttpErrorResponse) => {
          alert("error")
          console.log(error.message)
        }
      })

      this.ngOnInit();
      this.formularioExperiencia.reset();
    }
    else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Algo salio mal',
        showConfirmButton: false,
        timer: 1000
      })
    }

  }



  
  //TRAER REGISTRO A ACTUALIZAR
  public editarExperiencia(i: number) {
    console.log(this.experiencia[i])
    this.formularioExperienciaEditar.setValue({
      idEditar:          this.experiencia[i].id,
      tituloEditar:      this.experiencia[i].titulo,
      puestoEditar:      this.experiencia[i].puesto,
      descripcionEditar: this.experiencia[i].descripcion,
      anioEditar:        this.experiencia[i].fecha,
      imagenEditar:      this.experiencia[i].img,
      imagenEditarNueva: ''
    });

  }


  //ACTUALIZAR EDUCACION 
  public guardarExperienciaEditada() {

    if (!this.formularioExperienciaEditar.invalid && this.imgSubidaEditada) {
      let experienciaeditada: Experiencia = {
        id: this.formularioExperienciaEditar.value.idEditar,
        titulo: this.formularioExperienciaEditar.value.tituloEditar,
        puesto: this.formularioExperienciaEditar.value.puestoEditar,
        descripcion: this.formularioExperienciaEditar.value.descripcionEditar,
        fecha: this.formularioExperienciaEditar.value.anioEditar,
        img: this.imagenSeleccionadaEditada



      }

      this.expService.actualizarExperiencia(experienciaeditada).subscribe({
        next: res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Actualizado!',
            showConfirmButton: false,
            timer: 1000
          })

          document.getElementById('cerrarModalEditar')?.click();
          this.ngOnInit();
          this.formularioExperienciaEditar.reset();

        },
        error: (error: HttpErrorResponse) => {
          alert(error.message)
        }
      })

      document.getElementById('cerrarModalEditado')?.click();
      this.ngOnInit();
      this.formularioExperiencia.reset();
    }
    else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Algo salio mal y no se pudo actualizar',
        showConfirmButton: false,
        timer: 1000
      })
    }
  }


  
  //BORRAR EXPERIENCIA
  public borrarExperiencia(id: number) {

    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
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
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo salio mal' + error.message
            })
          }
        })
      }
    })
  }

  //****** RESETEAR FORMULARIOS *******/
  resetearFormulario() {
    this.formularioExperiencia.reset()
    this.imagenSeleccionada = '';
    this.imgSubida = false;

    this.formularioExperienciaEditar.reset()
    this.imagenSeleccionadaEditada = '';
    this.imgSubidaEditada = false;
  }



  

  //SUBIR IMAGENES A FIREBASE
  imagenes: any[] = [];
  cargarImagen(event: any, op: string) {
    if (op == "nueva") {
      if (event != null) {
        this.imagenSeleccionada = "../../../../assets/loader.gif";
        let archivos = event.target.files;
        let nombre = "educacion";
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
    } if (op == 'editar') {
      if (event != null) {
        this.imagenSeleccionada = "../../../../assets/loader.gif";
        let archivos = event.target.files;
        let nombre = "experiencia";
        for (let i = 0; i < archivos.length; i++) {
          let reader = new FileReader();
          reader.readAsDataURL(archivos[0]);
          reader.onloadend = () => {
            this.imagenes.push(reader.result);
            this.storageService.subirImagen(nombre + "_" + Date.now(), reader.result).then(urlImagen => {
              this.imgSubidaEditada = true;
              this.imagenSeleccionadaEditada = urlImagen;
            });
          }
        }
      }
    }

  }






}
