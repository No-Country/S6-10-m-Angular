import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataEmail } from '../interfaces/dataEmail';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  URL = environment.baseUrl;

  constructor(private http:HttpClient) { }

  //RESERVAR TURNO por scheduleId y userId
  public enviaEmail(data:DataEmail){
    console.log("El Servicio de Registro esta corriendo en la URL:")
    console.log(this.URL + "/view")
    return this.http.post<any>(this.URL + "/view",data)
  }
}