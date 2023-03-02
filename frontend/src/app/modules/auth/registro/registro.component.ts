import { Component} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Code } from 'src/app/interfaces/code'
import { CodeService } from 'src/app/services/code.service'
import Swal from 'sweetalert2'
import { NuevoUsuario } from '../models/nuevo-usuario'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent {

  patient_view:boolean=true;
  listCodes:any;
  registroForm: FormGroup;
  ocultar: boolean = true;
  nuevoUsuario!: NuevoUsuario;

  constructor(
    private authService: AuthService,
    private codeService:CodeService,
    private formBuilder: FormBuilder,
    private router:Router) {

    this.registroForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['',[Validators.required, Validators.minLength(8),Validators.maxLength(22),Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/)]],
        dni:['',[Validators.required]],
        phone:['',[Validators.required]],
        codeId:['',[Validators.required]]
      }
    )
  }

  ngOnInit(): void {
    this.showCodes()
  }  

  // REGISTER
  onRegister() {
    this.nuevoUsuario = this.registroForm.value;
    this.authService.nuevo(this.nuevoUsuario).subscribe({
      next: (data) => {
        this.usuarioRegistrado()
      },
      error: (error) => {
        this.registroIncorrecto()
      },
      complete:()=>{}
    })
  }

  // ALERT: Usuario registrado 
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

  // ALERT: Registro Incorrecto
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
  get Dni() {
    return this.registroForm.get('dni')
  }  
  get CodeId() {
    return this.registroForm.get('codeId')
  }
  get Phone() {
    return this.registroForm.get('phone')
  }

  /*=================================================*/

  // GetCodes
  showCodes(){
    this.codeService.getCode().subscribe({
      next: (res)=>{ 
        this.listCodes=res.code
      },    
      error: (error)=> {
        console.log(error);  
      },
      complete: ()=>{}
  })

  }
}