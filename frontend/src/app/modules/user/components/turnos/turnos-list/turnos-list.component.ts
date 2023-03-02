import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Appointment } from '../../../interfaces/appointment';
import { EmailService } from '../../../services/email.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-turnos-list',
  templateUrl: './turnos-list.component.html',
  styleUrls: ['./turnos-list.component.css']
})
export class TurnosListComponent implements OnInit {

  specialties: any
  locations: any
  specialty: any
  location: any
  address:string=""
  date: any
  doctor:string=""
  horario:string=""
  nombrePaciente:string=""
  idSchedule:string=""
  nuevoTurno?:Appointment;
  userId:any;
  datosTurno:any;

  loc: any = "1065499c-70ef-479b-aefc-fe98922cc185";
  spec: any = "e68a947e-2eff-45d7-ab9f-c70184aa775c";
  dat: any = "2023-03-10T00:00:00.000Z"

  specialtyId: any;
  locationId: any;

  schedules: any;
  schedulesList: any;

  constructor(private userService: UserService, private router:Router,private emailService:EmailService) {

  }

  ngOnInit(): void {
    const firstName = sessionStorage.getItem('FirstName');
    const lastName = sessionStorage.getItem('LastName');
    const USERID = sessionStorage.getItem('UserId');
    this.userId = USERID; 
    this.nombrePaciente = firstName + " " + lastName;


    this.specialty = JSON.parse(sessionStorage.getItem("selectedSpecialty") || "").name;
    this.address = JSON.parse(sessionStorage.getItem("selectedLocation") || "").address;

    this.location = JSON.parse(sessionStorage.getItem("selectedLocation") || "").name;
    this.date = sessionStorage.getItem("selectedDate")?.slice(0, 10);
    this.specialtyId = JSON.parse(sessionStorage.getItem("selectedSpecialty") || "").id;
    this.locationId = JSON.parse(sessionStorage.getItem("selectedLocation") || "").id;
    this.showResults();

  }

  showResults() {
    this.userService.getSchedulesByEspSedeDate(this.locationId, this.specialtyId, this.date).subscribe({
      next: (res) => {
        this.schedules = res.schedules;
        this.schedulesList = this.divideArr(this.schedules,8);
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  divideArr(arr: any, n: number) {
    const newArr = []
    for (let i = 0; i < arr.length; i += n) {
      newArr.push(arr.slice(i, i + n))
    }
    return newArr
  }

  reserve(idSchedule:string,doctor:string,horario:string){
    this.doctor=doctor;
    this.horario=horario;
    this.idSchedule=idSchedule
  }

  // CONFIRMAR TURNO

  confirmarTurno(){
    this.nuevoTurno={userId:this.userId,scheduleId:this.idSchedule};
    this.userService.createCita(this.nuevoTurno).subscribe({
      next: (res) => {        
      },
      error: (error) => {
        this.mensajeError()
      },
      complete: () => {
        this.sendEmail()
        this.mensajeConfirm()
      }
    })    
  }

  // ALERT: Turno Confirmado
  mensajeConfirm(){
    Swal.fire({
      title: 'Turno Confirmado',
      text: "Hemos enviado un correo a tu email, con los datos del turno agendado",
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('user/dashboard/inicio')
      }
    })
  }

  /*-----------------------------------------------------*/

  // ALERT: Error:"No se pudo agendar el turno"
  mensajeError(){
    Swal.fire({
      title: 'Error',
      text: "Por algún motivo no se pudo agendar el turno, intente nuevamente",
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('user/dashboard/inicio')
      }
    })
  }

  /*-----------------------------------------------------*/

  // ENVIA EMAIL
  sendEmail(/*datosTurno:DataEmail*/){
    const email = sessionStorage.getItem("UserEmail");
    this.datosTurno={
      user:this.nombrePaciente,
      email:email,
      profesional:this.doctor,
      especialidad:this.specialty,
      sanatorio:this.location,
      diaTurno:this.date,
      horaTurno: this.horario    
    }
    this.emailService.enviaEmail(this.datosTurno).subscribe({
      next: (res) => {        
      },
      error: (error) => {
        console.log(error)
      },
      complete:()=>{}
    })
  }


}


