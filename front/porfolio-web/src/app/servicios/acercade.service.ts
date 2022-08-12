import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AcercadeService {
  private urlApi = environment.apiUrl
  constructor(private http:HttpClient) { }


  public obtenerUsuario():Observable<Usuario>{
    return this.http.get<Usuario>(this.urlApi + "/usuario/id/1");
  }

  public actualizarUsuario(usuario: Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(this.urlApi + "/usuario/update", usuario)
  }





}

