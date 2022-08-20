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
  editable:boolean = true;
  proyectos: Proyectos[] = [];
   formularioProyecto: FormGroup;
   formularioProyectoEditar: FormGroup;
   imagenSeleccionada: any;
   imgSubida: boolean = false;
   imagenSeleccionadaEditada: any;
   imgSubidaEditada: boolean = false;


  constructor(private proService: ProyectosService, 
              private formbulder: FormBuilder, 
              private storageService: SubirImagenesService,                   
              private sesion: AngularFireAuth) {


 
//FORMULARIO REGISTRO NUEVO 
this.formularioProyecto = this.formbulder.group({
  id: [0],
  nombre: ['', Validators.required],
  tecno: ['', Validators.required],
  descripcion: ['', Validators.required],
  anio: ['',
    [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4)
    ]
  ],
  img: ['', Validators.required]
})

                
//FORMULARIO PARA EDITAR
this.formularioProyectoEditar = this.formbulder.group({
  idNombre: [0],
  nombreEditar: ['', Validators.required],
  tecnoEditar: ['', Validators.required],
  descripcionEditar: ['', Validators.required],
  anioEditar: ['',
    [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(5)
    ]
  ],
  imgEditar: ['', Validators.required],
  imagenEditarNueva: ['']

})

                
               }

  ngOnInit(): void {


    this.mostrarProyectos();

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
  public mostrarProyectos(){
    this.proService.obtenerProyectos().subscribe({
      next: (res:Proyectos[]) =>{
        this.proyectos = res
      },
      error: (error: HttpErrorResponse) => {
        alert("Error en la consulta  de proyectos-->" + error.message);
      }
    })
  }




  //GUARDAR NUEVO REGISTRO
  public guardarExperiencia(): void {

    if (!this.formularioProyecto.invalid && this.imgSubida) {
      let nuevoProyecto: Proyectos = {
        id: this.formularioProyecto.value.id,
        nombre: this.formularioProyecto.value.nombre,
        tecno: this.formularioProyecto.value.tecno,
        descripcion: this.formularioProyecto.value.descripcion,
        fecha: this.formularioProyecto.value.anio,
        img: this.imagenSeleccionada
        

      }
      this.proService.crearProyecto(nuevoProyecto).subscribe({
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
    this.formularioProyectoEditar.setValue({
      idEditar:          this.proyectos[i].id,
      nombreEditar:      this.proyectos[i].nombre,
      tecnoEditar:      this.proyectos[i].tecno,
      descripcionEditar: this.proyectos[i].descripcion,
      anioEditar:        this.proyectos[i].fecha,
      imgEditar:      this.proyectos[i].img,
      imagenEditarNueva: ''
    });

  }


  //ACTUALIZAR EDUCACION 
  public guardarExperienciaEditada() {

    if (!this.formularioProyectoEditar.invalid && this.imgSubidaEditada) {
      let proyectoEditado: Proyectos = {
        id: this.formularioProyectoEditar.value.idEditar,
        nombre: this.formularioProyectoEditar.value.nombreEditar,
        tecno: this.formularioProyectoEditar.value.tecnoEditar,
        descripcion: this.formularioProyectoEditar.value.descripcionEditar,
        fecha: this.formularioProyectoEditar.value.anioEditar,
        img: this.imagenSeleccionadaEditada



      }

      this.proService.actualizarProyecto(proyectoEditado).subscribe({
        next: res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Actualizado!',
            showConfirmButton: false,
            timer: 1000
          })

          document.getElementById('cerrarModalEditarExperiencia')?.click();
          this.ngOnInit();
          this.formularioProyectoEditar.reset();

        },
        error: (error: HttpErrorResponse) => {
          alert(error.message)
        }
      })

      document.getElementById('cerrarModalEditado')?.click();
      this.ngOnInit();
      this.formularioProyecto.reset();
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
  public borrarProyecto(id: number) {

    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.proService.borrarProyecto(id).subscribe({
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
    this.formularioProyecto.reset()
    this.imagenSeleccionada = '';
    this.imgSubida = false;

    this.formularioProyectoEditar.reset()
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
        let nombre = "proyecto";
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
        let nombre = "proyecto";
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




