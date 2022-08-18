import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {


  private urlApi = environment.apiUrl
  constructor(private http: HttpClient) { }


  public obtenerExperiencia(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(this.urlApi + "/experiencia/ver");
  }

  public crearExperiencia(educacion: Experiencia): Observable<Experiencia> {
    return this.http.post<Experiencia>(this.urlApi + "/experiencia/add", educacion)
  }


  public actualizarExperiencia(educacion: Experiencia): Observable<Experiencia> {
    return this.http.put<Experiencia>(this.urlApi + "/experiencia/update", educacion)
  }

  public borrarExperiencia(id: number): Observable<void> {
    return this.http.delete<void>(this.urlApi + "/experiencia/delete/" + id);
  }


}

