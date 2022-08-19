import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { SubirImagenesService } from 'src/app/servicios/subir-imagenes.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/servicios/skill.service';


@Component({
  selector: 'app-hardsoftskills',
  templateUrl: './hardsoftskills.component.html',
  styleUrls: ['./hardsoftskills.component.css']
})
export class HardsoftskillsComponent implements OnInit {

  editable: boolean = true;
  skill: Skill[] = [];
  formularioSkill: FormGroup;
  formularioSkillEditar: FormGroup;
  imagenSeleccionada: any;
  imgSubida: boolean = false;
  imagenSeleccionadaEditada: any;
  imgSubidaEditada: boolean = false;

  numero: number=100;


  constructor(private skillService: SkillService,
    private formbulder: FormBuilder,
    private storageService: SubirImagenesService,
    private sesion: AngularFireAuth) {



    //FORMULARIO REGISTRO NUEVO 
    this.formularioSkill = this.formbulder.group({
      id: [0],
      nombre: ['', Validators.required],
      porcentaje: ['', Validators.required],
      img: ['', Validators.required]
    })

    //FORMULARIO PARA EDITAR
    this.formularioSkillEditar = this.formbulder.group({
      idEditar: [0],
      nombreEditar: ['', Validators.required],
      porcentajeEditar: ['', Validators.required],
      imgEditar: ['', Validators.required],
      imagenEditarNueva: ['']

    })

  }












  ngOnInit(): void {
    this.mostrarSkill();

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
  public mostrarSkill() {
    this.skillService.obtenerSkill().subscribe({
      next: (res: Skill[]) => {
        this.skill = res
      },
      error: (error: HttpErrorResponse) => {
        alert("Error en la consulta  de skill-->" + error.message);
      }
    })
  }




  //GUARDAR NUEVO REGISTRO
  public guardarSkill(): void {

    if (!this.formularioSkill.invalid && this.imgSubida) {
      let nuevoSkill: Skill = {
        id: this.formularioSkill.value.id,
        nombre: this.formularioSkill.value.nombre,
        porcentaje: this.formularioSkill.value.porcentaje,
        img: this.formularioSkill.value.img,
      }
      this.skillService.crearSkill(nuevoSkill).subscribe({
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
          this.formularioSkill.reset();

        },
        error: (error: HttpErrorResponse) => {
          alert("error")
          console.log(error.message)
        }
      })

      this.ngOnInit();
      this.formularioSkill.reset();
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
  public editarSkill(i: number) {
    this.formularioSkillEditar.setValue({
      idEditar: this.skill[i].id,
      nombreEditar: this.skill[i].nombre,
      porcentajeEditar: this.skill[i].porcentaje,
   
      imgEditar: this.skill[i].img,
      imagenEditarNueva: ''
    });

  }


  //ACTUALIZAR EDUCACION 
  public guardarSkillEditada() {

    if (!this.formularioSkillEditar.invalid && this.imgSubidaEditada) {
      let skillEditado: Skill = {
        id: this.formularioSkillEditar.value.idEditar,
        nombre: this.formularioSkillEditar.value.nombre,
        porcentaje: this.formularioSkillEditar.value.porcentaje,      
        img: this.imagenSeleccionadaEditada



      }

      this.skillService.actualizarSkill(skillEditado).subscribe({
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
          this.formularioSkillEditar.reset();

        },
        error: (error: HttpErrorResponse) => {
          alert(error.message)
        }
      })

      document.getElementById('cerrarModalEditado')?.click();
      this.ngOnInit();
      this.formularioSkill.reset();
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



  //BORRAR SKILL
  public borrarSkill(id: number) {

    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.skillService.borrarSkill(id).subscribe({
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
    this.formularioSkill.reset()
    this.imagenSeleccionada = '';
    this.imgSubida = false;

    this.formularioSkillEditar.reset()
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
        let nombre = "skill";
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
        let nombre = "skill";
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
