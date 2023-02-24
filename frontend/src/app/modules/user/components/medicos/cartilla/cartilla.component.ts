import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  hospitalElegido:string=""

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
    //Guardando en Sesión
    sessionStorage.setItem("especialidadElegida",especialidad);
    sessionStorage.setItem("sedeElegida",sede);
    //Redirigiendo
    this.router.navigate([ '/user/dashboard/inicio', { outlets: { izq: 'lista' } }])
  }
    
}
  


