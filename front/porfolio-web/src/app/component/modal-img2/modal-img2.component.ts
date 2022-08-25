import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { SubirImagenesService } from 'src/app/servicios/subir-imagenes.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-img2',
  templateUrl: './modal-img2.component.html',
  styleUrls: ['./modal-img2.component.css']
})
export class ModalImg2Component implements OnInit {

  @Input() regEditar:any;
  imagenSeleccionada:any;
  imgSubida = false;
  @Input() nombreModal:any;

  
  constructor(private actualizarEducacion:EducacionService,
              private storageService: SubirImagenesService) { 
              }



  ngOnInit(): void {
 
  }
              
  actualizarFotoPerfil(){
    let educacionActualizada: any = this.regEditar
    educacionActualizada.img = this.imagenSeleccionada


console.log(educacionActualizada)


    this.actualizarEducacion.actualizarEducacion(educacionActualizada).subscribe({
      next: res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '!Foto actualizada¡',
          showConfirmButton: false,
          timer: 1000
        })

        document.getElementById('cerrarmodalfoto')?.click();
        this.ngOnInit();
       

      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    })

    document.getElementById('cerrarmodalfoto')?.click();
    this.ngOnInit();
    this.imagenSeleccionada='';
  }


  //ACTUALIZAR FOTO PERFIL USUARIO
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
          console.log(urlImagen)
          });
        }
      }
    }
  }

 


}
