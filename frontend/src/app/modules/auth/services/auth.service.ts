import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { LoginUsuario } from '../models/login-usuario'
import { NuevoUsuario } from '../models/nuevo-usuario'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  URL = environment.baseUrl + '/auth'

  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Origin': '*'
    })
  }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    console.log('El Servicio de Registro esta corriendo en la URL:')
    console.log(this.URL + '/registro')
    return this.httpClient.post<any>(this.URL + '/register', nuevoUsuario)
  }

  public login(
    loginUsuario: LoginUsuario /*_httpHeaders:HttpHeaders*/
  ): Observable<any> {
    console.log('El Servicio de Login esta corriendo en la URL')
    console.log(this.URL + '/login')
    return this.httpClient.post<any>(
      this.URL + '/login',
      loginUsuario,
      this.httpOptions.headers
    )
  }
}
