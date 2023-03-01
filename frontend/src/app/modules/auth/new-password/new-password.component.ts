import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  
  id:any;
  data:any;
  user:any;
  objeto:any;

  resetPasswordForm:FormGroup;
  ocultar: boolean = true;
  isLogged:boolean=false;
  password:string=""
  token: any;

  constructor(private authService:AuthService,private route:ActivatedRoute,private router:Router,private formBuilder:FormBuilder) {
    this.resetPasswordForm = this.formBuilder.group(
      {
        password: ['',[Validators.required, Validators.minLength(8),Validators.maxLength(25),Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/)]]
      }
    )
  }

  ngOnInit(): void {    
     const currentParams = this.route.snapshot.params;     
     this.saveParams(currentParams);     
  }

  saveParams(params:any){    
    const array = Object.entries(params)
    console.log(array[0][1]);
    //Token Recuperado
    this.token = array[0][1];
  }
  
  // RESET PASSWORD
  resetPassword(event: any) {    
    this.password = this.resetPasswordForm.value;
    console.log("Datos del usuario:");
    console.log(this.password);    
    console.log("Se llama al Servicio AuthService");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })    
    this.authService.resetPassword(this.password,this.token).subscribe({
      next: (res) => {
        console.log(res);
        alert("Todo OK")
      },
      error: (error) => {
        this.isLogged = false
        console.error(error)
        this.resetError()
      },
      complete: () => {}
    })
  }

  // Properties Validators  
  get Password() {
    return this.resetPasswordForm.get('password')
  }

  // Alert Incorrect User
  resetError() {
    Swal.fire({
      title: 'ERROR',
      text: 'Por algún motivo no se pudo actualizar su contraseña',
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

  success() {
    Swal.fire({
      title: 'Restauracion',
      text: 'La contraseña fue cambiada',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/auth/login')
      }
    })
  }
    
}
