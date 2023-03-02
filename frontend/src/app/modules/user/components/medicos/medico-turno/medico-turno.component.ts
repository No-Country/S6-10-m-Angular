import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Appointment } from '../../../interfaces/appointment';
import { DataEmail } from '../../../interfaces/dataEmail';
import { EmailService } from '../../../services/email.service';
import { FechaService } from '../../../services/fecha.service';
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
  fechaElegida:any;
  diaActual:any;
  scheduleList:any=[];
  notPosibility:boolean=false;
  showSchedules:boolean=false;
  userId:any;
  horarioElegido:any;
  selectRatioHour:any;
  nuevoTurno?:Appointment;
  nombrePaciente:any;
  fechaMod:any;
  horarioMod:any;
  inputs:any;
  active:boolean=false;
  datosTurno:any;

  constructor(private userService:UserService,private fechaService:FechaService, private router:Router, private emailService:EmailService) { }

  ngOnInit(): void {
    this.getDiaActual();
    this.getMedico();
    this.getDataSede();
    this.getDataEspecialidad();
    this.dataPaciente()
  }

  //Data del médico
  getMedico(){
    this.medicoElegido = sessionStorage.getItem("MedicoElegido");
    this.userService.getDoctor(this.medicoElegido).subscribe({
      next: (res) => {
        this.doctor=res.doctor;
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
        this.especialidad=res.speciality;      
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {}
    })

  }

  //Data de horarios
  getSchedules(){
    const dateControl = document.querySelector('input[type="date"]') as HTMLSelectElement;
    if (dateControl!=null){
      this.fechaElegida = dateControl.value + "T00:00:00.000Z";
    }   
    this.userService.getSchedules(this.medicoElegido,this.fechaElegida).subscribe({
      next: (res) => {
        if (Array.from(res.schedule).length==0){
          this.notPosibility=true;
        } else {
          this.notPosibility=false;
          this.showSchedules=true;
          this.scheduleList = res.schedule;
        }       
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {}
    })
  }

  // DATA PACIENTE
  dataPaciente(){
    const nombre = sessionStorage.getItem("FirstName");
    const apellido = sessionStorage.getItem("LastName");
    this.nombrePaciente = nombre + " " + apellido;
  } 

  // SOLICITAR TURNO - Abrir Modal de confirmación
  solicitarTurno(){
    this.selectRatioHour = document.querySelector('input[name="options"]:checked')as HTMLInputElement;
    this.userId=sessionStorage.getItem("UserId");
    this.horarioElegido=this.selectRatioHour.id;
    this.horarioMod=this.selectRatioHour.value;
    const dia = this.horarioElegido;
    this.fechaMod = this.fechaService.fechaTransform(this.fechaElegida)    
  }

  /*-----------------------------------------------------*/

  // CONFIRMAR TURNO

  confirmarTurno(){
    this.nuevoTurno={userId:this.userId,scheduleId:this.horarioElegido};
    this.userService.createCita(this.nuevoTurno).subscribe({
      next: (res) => {
        console.log(res);        
      },
      error: (error) => {
        this.mensajeError()
        console.error(error)
      },
      complete: () => {
        this.sendEmail()
        this.mensajeConfirm()
      }
    })    
  }

  /*-----------------------------------------------------*/

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
      profesional:this.doctor.firstName + " " + this.doctor.lastName,
      especialidad:this.especialidad.name,
      sanatorio:this.sede.name,
      diaTurno:this.fechaMod,
      horaTurno: this.horarioMod    
    }
    this.emailService.enviaEmail(this.datosTurno).subscribe({
      next: (res) => {
        console.log(res)        
      },
      error: (error) => {
        console.log(error)
      },
      complete:()=>{}
    })
  }

  // MOSTRAR FECHA ACTUAL
  getDiaActual(){
    this.diaActual=this.fechaService.actual();
  }
  
  /*------------------------------*/
  
  habilitarBoton() {
    this.active=true
  }
  reload(){
    this.active=false;
    location.reload();
  } 

}
