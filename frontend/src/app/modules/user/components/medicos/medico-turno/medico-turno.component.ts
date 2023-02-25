import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-medico-turno',
  templateUrl: './medico-turno.component.html',
  styleUrls: ['./medico-turno.component.css']
})
export class MedicoTurnoComponent implements OnInit {

  medicoElegido:any;
  doctor:any=[]; 
  especialidad:any=[];
  specialityId:any;
  sede:any=[];
  sedeId:any; 

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getMedico();
    this.getDataSede();
    this.getDataEspecialidad();
  }
  //Data del médico
  getMedico(){
    this.medicoElegido = sessionStorage.getItem("MedicoElegido");
    this.userService.getDoctor(this.medicoElegido).subscribe({
      next: (res) => {
        console.log(res.doctor);
        this.doctor=res.doctor;
        console.log(this.sedeId)
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {}
    })
  }
  //Data de la sede
  getDataSede(){
    this.sedeId=sessionStorage.getItem("sedeElegida");
    this.userService.getSede(this.sedeId).subscribe({
      next: (res) => {
        console.log(res.sede);
        this.sede=res.sede;       
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {}
    })
  }
  //Data de la especialidad
  getDataEspecialidad(){
    this.specialityId=sessionStorage.getItem("especialidadElegida");
    this.userService.getSpecialityById(this.specialityId).subscribe({
      next: (res) => {
        console.log(res.speciality); 
        this.especialidad=res.speciality;      
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {}
    })

  }
 

  //  SOLICITAR TURNO
  solicitarTurno(){
    
  }

}
