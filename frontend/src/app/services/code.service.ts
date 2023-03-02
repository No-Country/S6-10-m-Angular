import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Code } from '../interfaces/code';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(private http:HttpClient) { }

  URL = environment.baseUrl + "/code";

  // GET CODE
  public getCode():Observable<Code>{
    return this.http.get<any>(this.URL)    
  }
}
