import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(private http:HttpClient) { }

  URL = environment.baseUrl + "code/";
/*
  httpOptions : any    = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Origin': '*'
    })
  };*/
  
  // GET CODE
  public getCode():Observable<any>{
    return this.http.get<any>(this.URL)    
  }
}
