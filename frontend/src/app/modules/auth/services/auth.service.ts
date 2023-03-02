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

  URL = environment.baseUrl

  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Origin': '*'
    })
  }

  // REGISTRARSE
  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    console.log('El Servicio de Registro esta corriendo en la URL:')
    console.log(this.URL + '/auth/registro')
    return this.httpClient.post<any>(this.URL + '/auth/register', nuevoUsuario)
  }

  // LOGIN
  public login(loginUsuario: LoginUsuario): Observable<any> {
    console.log('El Servicio de Login esta corriendo en la URL')
    console.log(this.URL + '/auth/login')
    return this.httpClient.post<any>(
      this.URL + '/auth/login',
      loginUsuario,
      this.httpOptions.headers
    )
  }

  // LOGOUT
  public logOut(): void{
    window.sessionStorage.clear();
  }

  // RECUPERAR CONTRASEÑA
  public recoverPassword(email:string){
    console.log('El Servicio de Login esta corriendo en la URL')
    console.log(this.URL + '/password/password')
    return this.httpClient.post<any>(this.URL + '/password/password',email,this.httpOptions.headers)    
  }

  // RESETEAR CONTRASEÑA
  public resetPassword(password:string,token:string){
    console.log('El Servicio de Login esta corriendo en la URL')
    console.log(this.URL + '/password/password/'+token)
    return this.httpClient.post<any>(this.URL + '/password/password/'+token,password,this.httpOptions.headers)
  }
}
