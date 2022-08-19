import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../models/skill';


@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private urlApi = environment.apiUrl
  constructor(private http: HttpClient) { }


  public obtenerSkill(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.urlApi + "/skill/ver");
  }

  public crearSkill(educacion: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.urlApi + "/experiencia/add", educacion)
  }


  public actualizarSkill(educacion: Skill): Observable<Skill> {
    return this.http.put<Skill>(this.urlApi + "/skill/update", educacion)
  }

  public borrarSkill(id: number): Observable<void> {
    return this.http.delete<void>(this.urlApi + "/skill/delete/" + id);
  }


}
