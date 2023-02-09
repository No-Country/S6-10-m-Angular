import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUsuario } from '../models/login-usuario';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import Swal from 'sweetalert2';

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
        password: ['',[Validators.required, Validators.minLength(6),Validators.maxLength(22)]]
      }
  )}

  ngOnInit(): void {
  }

  onLogin(event:any) {
    this.loginUsuario = this.loginForm.value;
    if (this.loginUsuario.email=="usuario@email.com" && this.loginUsuario.password=="123456"){      
      this.isLogged = true;     
      this.tokenService.setToken("Usuario Harcodeado");
      this.tokenService.setUserName("Usuario Harcodeado");
      this.router.navigate(['/dashboard'])
    } else {
      console.log("El usuario tiene estos datos:");
      console.log(this.loginUsuario);
      console.log("Se llama al servicio");
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      this.authService.login(this.loginUsuario,headers).subscribe({      
        next:(data) => {
          console.log(data);
          this.isLogged = true;     
          this.tokenService.setToken(data.response.jwt);
          this.tokenService.setUserName(data.response.firstName);
          this.tokenService.setLastName(data.response.lastName);
          this.router.navigate(['/dashboard']);
        },
        error:(error) => {
          this.isLogged = false;
          console.error("ERROR");
          this.usuarioIncorrecto();
        },
        complete:()=>{}
      });
    }
  }   
  
  
  get Email() { 
    return this.loginForm.get('email'); 
  }
  get Password() {
    return this.loginForm.get('password')
  }

  usuarioIncorrecto() {
    Swal.fire({
      title: 'Usuario NO registrado',
      text: "Datos incorrectos, o bien, no está registrado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Quiero registrarme'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/auth/registro')
      }
    })
  }

}
