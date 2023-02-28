import { Component, OnInit } from '@angular/core';
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
  date: any
    

  constructor(private userService: UserService) {
    
  }

  ngOnInit(): void {
  
    this.specialty = JSON.parse(sessionStorage.getItem("selectedSpecialty")||"").name;
    this.location = JSON.parse(sessionStorage.getItem("selectedLocation")||"").name;
    this.date = sessionStorage.getItem("selectedDate")?.slice(0, 10);
  }

  showSpecialties(): void {
    this.userService.getSpeciality().subscribe({
      next: (res) => {
        this.specialties = res.specialities
        console.log(this.specialties)
      },
      error: (error) => {
        console.error('Los datos del servidor no llegan')
        console.log(error)
      }
    })
  }

  showSedes(): void {
    this.userService.getSedes().subscribe({
      next: (res) => {
        this.locations = res.sedes
        console.log(this.locations)
      },
      error: (error) => {
        console.error('Los datos del servidor no llegan')
        console.log(error)
      }
    })
  }

  selectDate() {
    const selectorFecha = document.getElementById('drop-box3') as HTMLSelectElement
    const fecha = selectorFecha.value
    this.date = fecha
  }

}


