import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
 selector: 'app-turnos-search',
 templateUrl: './turnos-search.component.html',
 styleUrls: ['./turnos-search.component.css']
})
export class TurnosSearchComponent implements OnInit {
 specialties: any
 locations: any
 public isCollapsed = true

 public specialty = 'Especialidad'
 public location = 'Clínica/Hospital'
 public date = 'Fecha'

 constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.showSpecialties()
    this.showSedes()
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
