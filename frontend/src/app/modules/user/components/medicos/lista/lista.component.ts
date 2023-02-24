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
  
  medicosDisponibles(){
    this.especialidadId = sessionStorage.getItem("especialidadElegida");
    this.sedeId = sessionStorage.getItem("sedeElegida");   
    this.userService.getDoctors(this.especialidadId,this.sedeId).subscribe({
      next: (res) => {
        console.log(res.doctor);
        this.listaMedicos=res.doctor;
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {}
    })
  }
  medicoId(doctorId:any){
    this.medicoElegido = doctorId;
    console.log(this.medicoElegido);
    sessionStorage.setItem("MedicoElegido",this.medicoElegido)
  }
}
