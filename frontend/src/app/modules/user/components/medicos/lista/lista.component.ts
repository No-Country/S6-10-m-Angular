import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  listaMedicos:any;
  especialidadId:any;
  sedeId:any;
  medicoElegido:string=""

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.medicosDisponibles()
  }
  
  // GET Medicos By IdSede and IdEspecialidad
  medicosDisponibles(){
    this.especialidadId = sessionStorage.getItem("especialidadElegida");
    this.sedeId = sessionStorage.getItem("sedeElegida");   
    this.userService.getDoctors(this.especialidadId,this.sedeId).subscribe({
      next: (res) => {        
        this.listaMedicos=res.doctors;
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {}
    })
  }

  // Seleccion del médico
  medicoId(doctorId:any){
    this.medicoElegido = doctorId;
    sessionStorage.setItem("MedicoElegido",this.medicoElegido)
  }
}
