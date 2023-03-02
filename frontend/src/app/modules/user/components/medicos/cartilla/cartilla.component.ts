import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Sede } from '../../../interfaces/sede';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-cartilla',
  templateUrl: './cartilla.component.html',
  styleUrls: ['./cartilla.component.css']
})
export class CartillaComponent implements OnInit {

  dataSede:any=[];
  sedes:Sede[]=[];
  especialidades:any=[];
  sedeElegida:any;
  hospitalElegido:string="";
  selectedSede:any;
  selectedEspecialidad:any;
  constSede:string="elegir";
  sede:string="Clínica/Hospital";
  idSede:string="";
  especialidad:string="Especialidad";
  idEspecialidad:string=""

  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.obtenerEspecialidad();
    this.obtenerSedes()
  }

  // OBTENER SEDES
  obtenerSedes(){
    this.userService.getSedes().subscribe({
      next: (res) => {
        this.sedes=res.sedes;
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {}
    });   
  }

  // OBTENER ESPECIALIDADES
  obtenerEspecialidad(){
    this.userService.getSpeciality().subscribe({
      next: (res) => {        
        this.especialidades=res.specialities;        
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {}
    });   
  }

  // SELECTORES

  // Select Especialidad
  selectEspecialidad(idEspecialidad:string,especialidadName:string){
    this.especialidad=especialidadName;
    this.idEspecialidad=idEspecialidad
  }
  // Select Sede
  selectSede(idSede:string,sedeName:string){
    this.sede=sedeName ;
    this.idSede=idSede
  }

  // CONFIRM: Elegir sede y especialidad

  findDoctors(){ 
    if (this.idSede!=""&&this.idEspecialidad!=""){
      //Guardando en Sesión
      sessionStorage.setItem("especialidadElegida",this.idEspecialidad);
      sessionStorage.setItem("sedeElegida",this.idSede);
      //Redirigiendo
      this.router.navigate([ '/user/dashboard/inicio', { outlets: { izq: 'lista' } }])
    } else {
      this.eleccionIncorrecta()
    }    
  }

  // ALERT: Required Sede y Especialidad

  eleccionIncorrecta() {
    Swal.fire({
      title: 'Atención',
      text: "Debe elegir la especialidad requerida y el hospital donde desea ser atendido",
      icon: 'info',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.router.navigate([ '/user/dashboard/inicio', { outlets: { izq: null } }])
      } 
    })
  }  
    
}
  


