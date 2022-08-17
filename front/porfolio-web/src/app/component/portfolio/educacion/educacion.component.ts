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
  public formularioEducacioEditar: FormGroup;
  public imagenSeleccionada: any;
  public imgSubida: boolean = false;

  public imagenSeleccionadaEditada: any;
  public imgSubidaEditada: boolean = false;

  constructor(private eduService: EducacionService, private formbulder: FormBuilder, private storageService: SubirImagenesService) {
    this.formularioEducacion = this.formbulder.group({
      id: [0],
      titulo: ['', Validators.required],
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


    this.formularioEducacioEditar = this.formbulder.group({
      idEditar: [0],
      tituloEditar: ['', Validators.required],
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
    this.mostrarEducaciones();
  }



  // *********TRAER TODOS LOS REGISTROS DE EDUCACION GUARDADOS
  public mostrarEducaciones(): void {
    this.eduService.obtenerEducacion().subscribe({
      next: (res: Educacion[]) => {
        this.educacion = res;
      },
      error: (error: HttpErrorResponse) => {
        alert("Error en la consulta -->" + error.message);
      }
    })
  }


  // *********GUARDAR NUEVA EDUCACION
  public guardarEducacion(): void {

    if (!this.formularioEducacion.invalid && this.imgSubida) {
      let nuevaEducacion: Educacion = {
        id: this.formularioEducacion.value.id,
        titulo: this.formularioEducacion.value.titulo,
        descripcion: this.formularioEducacion.value.descripcion,
        fecha: this.formularioEducacion.value.anio,
        img: this.imagenSeleccionada

      }
      this.eduService.crearEducacion(nuevaEducacion).subscribe({
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
          this.formularioEducacion.reset();

        },
        error: (error: HttpErrorResponse) => {
          alert("error")
          console.log(error.message)
        }
      })

      this.ngOnInit();
      this.formularioEducacion.reset();
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


  public editarEducacion(i: number) {

    this.formularioEducacioEditar.setValue({
      idEditar: this.educacion[i].id,
      tituloEditar: this.educacion[i].titulo,
      descripcionEditar: this.educacion[i].descripcion,
      anioEditar: this.educacion[i].fecha,
      imagenEditar: this.educacion[i].img,
      imagenEditarNueva: ''
    });

  }



  public guardarEducacionEditada() {

    if (!this.formularioEducacioEditar.invalid && this.imgSubidaEditada) {
      let educacionEditada: Educacion = {
        id: this.formularioEducacioEditar.value.idEditar,
        titulo: this.formularioEducacioEditar.value.tituloEditar,
        descripcion: this.formularioEducacioEditar.value.descripcionEditar,
        fecha: this.formularioEducacioEditar.value.anioEditar,
        img: this.imagenSeleccionadaEditada



      }

      this.eduService.actualizarEducacion(educacionEditada).subscribe({
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
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Algo salio mal y no se pudo actualizar',
        showConfirmButton: false,
        timer: 1000
      })
    }
  }


  //// *********BORRAR EDUCACION
  public borrarEducacion(id: number) {

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

  //******RESETEAR FORMULARIOS */

  resetearFormulario() {
    this.formularioEducacion.reset()
    this.imagenSeleccionada = '';
    this.imgSubida = false;

    this.formularioEducacioEditar.reset()
    this.imagenSeleccionadaEditada = '';
    this.imgSubidaEditada = false;
  }


  //******IMAGENES */

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
            console.log(reader.result);
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
        let nombre = "educacion";
        for (let i = 0; i < archivos.length; i++) {
          let reader = new FileReader();
          reader.readAsDataURL(archivos[0]);
          reader.onloadend = () => {
            console.log(reader.result);
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
