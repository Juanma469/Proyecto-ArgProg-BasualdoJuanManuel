import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginService} from '../../servicios/login.service'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 form: FormGroup;
  constructor( private formbulder: FormBuilder, private serviceLogin: LoginService, private router:Router) { 
    this.form = this.formbulder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      }
    )
  }

  ngOnInit(): void {
  }



  //
  login (){
    // user: jmbasualdo@argprograma.com
   //  pass: jmArgPrograma
    if(this.form.valid){
      console.log(this.form.value.email)
      this.serviceLogin.login(this.form.value.email, this.form.value.password).then(res=>{
        // console.log("Respuesta del servidor: =======> ", res);
       if(res){
        this.router.navigate(['/porfolio'])
       }
        else{
          alert ("Datos incorrectos")
        }
      })
    }
  }

  //obtener valores de los inputs
   get Email(){
    return this.form.get('email');
   }

   
   get Password(){
    return this.form.get('password');
   }

}
