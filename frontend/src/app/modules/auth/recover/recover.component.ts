import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {

  recoverForm:FormGroup;
  ocultar: boolean = true;
  isLogged:boolean=false;
  email:string="";
  password: string="";
  errMsj:string="";

  constructor(private formBuilder:FormBuilder, private router: Router,private authService:AuthService) {
    this.recoverForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]]}
  )}

  ngOnInit(): void {}

  // OnLogin
  onRecover(event: any) {
    //Usuario Harcodeado
    this.email = this.recoverForm.value;
    console.log("Datos del usuario:");
    console.log(this.email);
    console.log("Se llama al Servicio AuthService");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    this.authService.recoverPassword(this.email).subscribe({
      next: (res) => {
        console.log(res)        
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
    return this.recoverForm.get('email')
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
