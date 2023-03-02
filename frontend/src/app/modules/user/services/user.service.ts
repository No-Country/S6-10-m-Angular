import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../interfaces/appointment';

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

  //OBTENER SEDE POR ID
  public getSede(sedeId:any):Observable<any>{
    return this.http.get<any>(this.URL + "/sede/" + sedeId)
  }

  //OBTENER ESPECIALIDAD
  public getSpeciality():Observable<any>{
    return this.http.get<any>(this.URL + "/speciality")
  }

  //OBTENER ESPECIALIDAD POR ID
  public getSpecialityById(id:any):Observable<any>{
    return this.http.get<any>(this.URL + "/speciality/" + id)
  }

  //OBTENER MEDICOS POR ESPECIALIDAD Y SEDE
  public getDoctors(specialityId:string,sedeId:string):Observable<any>{
    return this.http.get<any>(this.URL + "/doctor/"+specialityId+"/"+sedeId)    
  }

  //OBTENER MEDICO POR ID
  public getDoctor(id:string):Observable<any>{
    return this.http.get<any>(this.URL + "/doctor/" + id)    
  }

  //OBTENER HORARIOS POR doctorId y fecha
  public getSchedules(id:string,fecha:string):Observable<any>{
    return this.http.get<any>(this.URL + "/schedule/" + id + "/" + fecha)    
  }

  //RESERVAR TURNO por scheduleId y userId
  public createCita(newAppointment:Appointment){
    return this.http.post<any>(this.URL + "/appointment",newAppointment)
  }
  
  //OBTENER HORARIOS POR ESPECIALIDAD SEDE Y FECHA
  public getSchedulesByEspSedeDate(sedeId:string,specialityId:string,fecha:string):Observable<any>{
    return this.http.get<any>(this.URL + "/schedule/"+sedeId+"/"+specialityId+"/"+fecha)    
  }



  
}
