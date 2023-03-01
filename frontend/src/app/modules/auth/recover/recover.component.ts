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

  // OnRecover
  onRecover(event: any) {    
    this.email = this.recoverForm.value;
    console.log("Datos del usuario:");
    console.log(this.email);
    console.log("Se llama al Servicio AuthService");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    this.authService.recoverPassword(this.email).subscribe({
      next: (res) => {
        console.log(res);
        this.sendEmail();
      },
      error: (error) => {        
        console.error(error);
        this.recoverError()
      },
      complete: () => {}
    })
  }

  // Properties Validators
  get Email() {
    return this.recoverForm.get('email')
  }

  // Alert: se ha enviado un link a su email
  sendEmail() {
    Swal.fire({
      title: 'Verifique su email',
      text: 'Hemos enviado a su email un mensaje para recuperar la contraseña',
      icon: 'info',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/home')
      }
    })
  }

  // Alert: Incorrect User
  recoverError() {
    Swal.fire({
      title: 'ERROR',
      text: 'El email introducido no esta registrado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Intentar nuevamente'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/auth/recover')
      } else {
        this.router.navigateByUrl('/home')
      }
    })
  }
}
