import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  URL = environment.baseUrl;

  //OBTENER SEDES
  public getSedes():Observable<any>{
    return this.http.get<any>(this.URL + "/sede")
  }

  //OBTENER ESPECIALIDAD
  public getSpeciality():Observable<any>{
    return this.http.get<any>(this.URL + "/speciality")
  }
}