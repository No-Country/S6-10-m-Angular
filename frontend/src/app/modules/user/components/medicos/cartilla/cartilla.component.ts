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
  selectSede:any;
  selectEspecialidad:any;
  constSede:string="elegir";

  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.obtenerEspecialidad();
    this.obtenerSedes()
  }

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

  findDoctors(){ 
    //Capturando Especialidad     
    const selectorEspecialidad = document.getElementById("especialidad")as HTMLSelectElement;
    const especialidad = selectorEspecialidad.value;
    console.log(especialidad);
    //Capturando Sede
    const selectorSede = document.getElementById("sede")as HTMLSelectElement;
    const sede = selectorSede.value;
    console.log(sede);
    if (sede!="elegir"&&especialidad!="elegir"){
      //Guardando en Sesión
      sessionStorage.setItem("especialidadElegida",especialidad);
      sessionStorage.setItem("sedeElegida",sede);
      //Redirigiendo
      this.router.navigate([ '/user/dashboard/inicio', { outlets: { izq: 'lista' } }])

    } else {
      this.eleccionIncorrecta()
    }
    
  }

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
        this.router.navigateByUrl('/user/dashboard/inicio')
      } 
    })
  }

  
    
}
  


