import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Educacion} from '../models/educacion';


@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  private urlApi = environment.apiUrl
  constructor(private http:HttpClient) { }


public obtenerEducacion():Observable<Educacion[]>{
  return this.http.get<Educacion[]>(this.urlApi + "/educacion/ver");
}
 
public crearEducacion(educacion: Educacion):Observable<Educacion>{
  return this.http.post<Educacion>(this.urlApi + "/educacion/add", educacion)
}


public actualizarEducacion(educacion: Educacion): Observable<Educacion>{
  return this.http.put<Educacion>(this.urlApi + "/educacion/update", educacion)
}

public borrarEducacion(id: number): Observable<void>{
  return this.http.delete<void>(this.urlApi + "/educacion/delete/" + id);
}


}

