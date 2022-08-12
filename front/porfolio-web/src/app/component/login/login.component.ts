import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginService} from '../../servicios/login.service'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2'




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 form: FormGroup;
  constructor( private formbulder: FormBuilder, 
               private serviceLogin: LoginService, 
               private userLogeado:AngularFireAuth, 
               private router:Router) { 
    this.form = this.formbulder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      }
    )
  }

  ngOnInit(): void {
  }




  login (){
    // user: jmbasualdo@argprograma.com
   //  pass: jmArgPrograma
      this.serviceLogin.login(this.form.value.email, this.form.value.password)
      .then(response=>{        
        this.router.navigate(['porfolio'])

      })
      .catch(error =>{
        var tipoError = error.code;
        alert ("error" + error.code);

        })
        
       
  
  }

  //obtener valores de los inputs
   get Email(){
    return this.form.get('email');
   }

   
   get Password(){
    return this.form.get('password');
   }

   getUserLogged() {
    return console.log(this.userLogeado.authState);
  }

}
