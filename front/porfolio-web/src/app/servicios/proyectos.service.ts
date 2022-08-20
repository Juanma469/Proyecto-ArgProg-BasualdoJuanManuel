import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyectos } from '../models/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {


  private urlApi = environment.apiUrl
  constructor(private http: HttpClient) { }


  public obtenerProyectos(): Observable<Proyectos[]> {
    return this.http.get<Proyectos[]>(this.urlApi + "/proyectos/ver");
  }

  public crearProyecto(proyecto: Proyectos): Observable<Proyectos> {
    return this.http.post<Proyectos>(this.urlApi + "/proyectos/add", proyecto)
  }


  public actualizarProyecto(proyecto: Proyectos): Observable<Proyectos> {
    return this.http.put<Proyectos>(this.urlApi + "/proyectos/update", proyecto)
  }

  public borrarProyecto(id: number): Observable<void> {
    return this.http.delete<void>(this.urlApi + "/proyectos/delete/" + id);
  }


}

