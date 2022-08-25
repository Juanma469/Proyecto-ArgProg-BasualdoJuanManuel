import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AcercadeService } from 'src/app/servicios/acercade.service';
import { SubirImagenesService } from 'src/app/servicios/subir-imagenes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styleUrls: ['./modal-img.component.css']
})
export class ModalImgComponent implements OnInit {
 


  @Input() usuario:any;
  imagenSeleccionada:any;
  imgSubida = false;

  
  constructor(private acercadeService: AcercadeService,
              private storageService: SubirImagenesService) { }

  ngOnInit(): void {}


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
       

      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    })

    document.getElementById('cerrarModalUsuarioFotoPerfil')?.click();
    this.ngOnInit();
   
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
