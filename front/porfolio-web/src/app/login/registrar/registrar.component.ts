import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegisterComponent implements OnInit {
  public user = {email:'', password:''};

  ngOnInit() { }

  constructor(private auth:AuthService) { }

  public registrarUsuario(){
      this.auth.register(this.user.email, this.user.password).then((res:any)=>{
       
          console.log (res)
       
      })
  }


}