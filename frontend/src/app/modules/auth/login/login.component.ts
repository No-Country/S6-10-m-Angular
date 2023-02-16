import { HttpHeaders } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { LoginUsuario } from '../models/login-usuario'
import { AuthService } from '../services/auth.service'
import { TokenService } from '../services/token.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm:FormGroup;
  ocultar: boolean = true;
  isLogged:boolean=false;
  loginUsuario: LoginUsuario={email:"",password:""};
  emailUsuario: string="";
  password: string="";
  errMsj:string="";

  constructor(private formBuilder:FormBuilder, private router: Router,private authService:AuthService,private tokenService:TokenService) {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['',[Validators.required, Validators.minLength(8),Validators.maxLength(25),Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/)]]
      }
  )}


  ngOnInit(): void {}

  // OnLogin
  onLogin(event: any) {
    //Usuario Harcodeado
    this.loginUsuario = this.loginForm.value;/*{email:"usuario@email.com",password:"12E45678"};*/
    console.log("Datos del usuario:");
    console.log(this.loginUsuario);
    console.log("Se llama al Servicio AuthService");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    this.authService.login(this.loginUsuario /*,headers*/).subscribe({
      next: (res) => {
        console.log(res)
        this.isLogged = true
        this.tokenService.setToken(res.data.token)
        this.tokenService.setUserName(res.data.user.firstName)
        const rol = res.data.user.role
        if (rol == 'patient') {
          /*this.router.navigate(['/patient-dashboard'])*/
          this.router.navigateByUrl('/user/dashboard')
        } else if (rol=="doctor") {
          this.router.navigate(['/doctor/dashboard'])
        } else if (rol=="admin"){
          this.router.navigate(['/admin/dashboard'])
        } else {
          this.usuarioIncorrecto();
        }
      },
      error: (error) => {
        this.isLogged = false
        console.error(error)
        this.usuarioIncorrecto()
      },
      complete: () => {}
    })
  }

  // Properties Validators
  get Email() {
    return this.loginForm.get('email')
  }
  get Password() {
    return this.loginForm.get('password')
  }

  // Alert Incorrect User
  usuarioIncorrecto() {
    Swal.fire({
      title: 'Usuario NO registrado',
      text: 'Datos incorrectos, o bien el usuario no está registrado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Quiero registrarme'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/auth/registro')
      }
    })
  }
}
