import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-medico-turno',
  templateUrl: './medico-turno.component.html',
  styleUrls: ['./medico-turno.component.css']
})
export class MedicoTurnoComponent implements OnInit {

  medicoElegido:any;
  doctor:any; 
  especialidad:any;
  especialityId:any;
  sede:any; 

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getMedico()
  }

  getMedico(){
    this.medicoElegido = sessionStorage.getItem("MedicoElegido")
    this.userService.getDoctor(this.medicoElegido).subscribe({
      next: (res) => {
        console.log(res.doctor);
        this.doctor=res.doctor;
        this.especialityId=res.doctor.specialityId;
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {}
    })
  }

}
