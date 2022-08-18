import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user = {email:'', password:''};

  constructor(private router:Router, private auth:AuthService) { }
  ngOnInit(): void {}



  ingresar() {
    const { email, password } = this.user;
    this.auth.login(email, password).then(user => {    
      if(!user) {

         Swal.fire({
              icon: 'error',
              title: 'Error al intentar iniciar',
              text: 'revise los datos ingresados y vuelva a intentar'
            })
            
        return;
      };

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Ingresando!',
        showConfirmButton: false,
        timer: 1000
      })       
      this.router.navigate(['/portfolio'])
    }).catch(err=>{
      console.log(err)
    })
  }






  


}
