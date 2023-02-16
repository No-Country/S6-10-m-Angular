import { Component} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import Swal from 'sweetalert2'
import { NuevoUsuario } from '../models/nuevo-usuario'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent {

  registroForm: FormGroup
  ocultar: boolean = true
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router:Router) {

    this.registroForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['',[Validators.required, Validators.minLength(8),Validators.maxLength(22),Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/)]],
        code:54,
        phone:5555555
      }
  )}

  ngOnInit(): void {
  }

  user: NuevoUsuario = {
    firstName: '',
    lastName: '',
    password: '',
    email: ''
  }

  createUser() {
    this.authService
      .nuevo(this.user)
      .subscribe((data) => console.log('data:', data))
  }

  nuevoUsuario: any

  onRegister() {
    this.nuevoUsuario = this.registroForm.value
    console.log(this.nuevoUsuario)
    this.authService.nuevo(this.nuevoUsuario).subscribe({
      next: (data) => {
        console.log(data)
        this.usuarioRegistrado()
      },
      error: (error) => {
        this.registroIncorrecto()
        console.log(error)
      },
      complete:()=>{}
    })
  }

    usuarioRegistrado() {
      Swal.fire({
        title: 'Usuario Registrado',
        text: "Hemos enviado un correo a tu email, para que verifiques tu cuenta y comiences a usar CitaMed",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Iniciar Sesión'
      }).then((result:any) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl('/auth/login')
        } else {
          this.router.navigateByUrl('/home')
        }
      })
    }

    registroIncorrecto() {
      Swal.fire({
        title: 'Error en el registro',
        text: "Por algún motivo relacionado con unos y ceros, no podemos registrarte",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Intentar nuevamente'
      }).then((result:any) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl('/auth/registro')
        } else {
          this.router.navigateByUrl('/home')
        }
      })
    }
  

  /*=================================================*/

  // VALIDATORS
  get Nombre() {
    return this.registroForm.get('firstName')
  }
  get Apellido() {
    return this.registroForm.get('lastName')
  }
  get Email() {
    return this.registroForm.get('email')
  }
  get Password() {
    return this.registroForm.get('password')
  }
}
