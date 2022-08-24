import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { AcercadeService } from 'src/app/servicios/acercade.service';
import { SubirImagenesService } from 'src/app/servicios/subir-imagenes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {
  usuario: Usuario | undefined;
  editable: boolean = false;
  formularioUsuario: FormGroup;
  imagenSeleccionada: any = '';
  imgSubida: boolean = false;

  constructor(private acercadeService: AcercadeService,
    private storageService: SubirImagenesService,
    private formbulder: FormBuilder,
    private sesion: AngularFireAuth) {



    this.formularioUsuario = this.formbulder.group({
      id:       [''],
      nombre:   ['', [Validators.required, Validators.pattern(/^[a-zA-Z \u00E0-\u00FC ñ Ñ ]{4,40}$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-Z \u00E0-\u00FC ñ Ñ]{4,40}$/)]],
      linkedin: ['', [Validators.required, Validators.pattern(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)]],
      titulo:   ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]{4,50}$/)]],
      descripcion: ['', [Validators.required, Validators.pattern(/^[a-zA-Z 0-9 ñ Ñ . \u00E0-\u00FC , : ; ( ) ]{4,200}$/)]],
      img: ['', Validators.required]

    })
  }




  ngOnInit(): void {
    this.obtenerUsuario()

    this.sesion.onAuthStateChanged((user: any) => {
      if (user) {
        this.editable = true;
      }
      else {
        this.editable = false;
      }
    });
  }

  public obtenerUsuario(): void {
    this.acercadeService.obtenerUsuario().subscribe({
      next: (response: Usuario) => {
        this.usuario = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }



  //TRAER REGISTRO A ACTUALIZAR
  public editarUsuario() {


    this.formularioUsuario.setValue({
      id: this.usuario?.id,
      nombre: this.usuario?.nombre,
      apellido: this.usuario?.apellido,
      linkedin: this.usuario?.linkedin,
      titulo: this.usuario?.titulo,
      descripcion: this.usuario?.descripcion,
      img: this.usuario?.img
    });

  }


  //ACTUALIZAR EDUCACION 
  public guardarEdicionUsuario() {

    if (!this.formularioUsuario.invalid) {
      let usuarioEditado: Usuario = {
        id: this.formularioUsuario.value.id,
        nombre: this.formularioUsuario.value.nombre,
        apellido: this.formularioUsuario.value.apellido,
        linkedin: this.formularioUsuario.value.linkedin,
        titulo: this.formularioUsuario.value.titulo,
        descripcion: this.formularioUsuario.value.descripcion,
        img: this.formularioUsuario.value.img



      }

      this.acercadeService.actualizarUsuario(usuarioEditado).subscribe({
        next: res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario actualizado!',
            showConfirmButton: false,
            timer: 1000
          })

          document.getElementById('cerrarModalUsuario')?.click();
          this.ngOnInit();
          this.formularioUsuario.reset();

        },
        error: (error: HttpErrorResponse) => {
          alert(error.message)
        }
      })

      document.getElementById('cerrarModalUsuario')?.click();
      this.ngOnInit();
      this.formularioUsuario.reset();
    }
    else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Algo salio mal y no se pudo actualizar el usuario',
        showConfirmButton: false,
        timer: 1000
      })
    }
  }


  //****** RESETEAR FORMULARIO *******/
  resetearFormulario() {
    this.formularioUsuario.reset()

  }

  actualizarFotoPerfil(){
      let usuarioEditado: any = this.usuario
      usuarioEditado.img = this.imagenSeleccionada

      this.acercadeService.actualizarUsuario(usuarioEditado).subscribe({
        next: res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '!Foto actualizada¡',
            showConfirmButton: false,
            timer: 1000
          })

          document.getElementById('cerrarModalUsuarioFotoPerfil')?.click();
          this.ngOnInit();
          this.formularioUsuario.reset();

        },
        error: (error: HttpErrorResponse) => {
          alert(error.message)
        }
      })

      document.getElementById('cerrarModalUsuarioFotoPerfil')?.click();
      this.ngOnInit();
      this.formularioUsuario.reset();
    }
 


  //ACTUALIZAR FOTO PERFIL USUARIO
  imagenes: any[] = [];
  editarUsuarioFotoPerfil(event: any) {
    if (event != null) {
      this.imagenSeleccionada = "../../../../assets/loader.gif";
      let archivos = event.target.files;
      let nombre = "fotoUsuario";
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
}