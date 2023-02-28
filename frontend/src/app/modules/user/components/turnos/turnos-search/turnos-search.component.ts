import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
 selector: 'app-turnos-search',
 templateUrl: './turnos-search.component.html',
 styleUrls: ['./turnos-search.component.css']
})
export class TurnosSearchComponent implements OnInit {
 specialties: any
 locations: any

 public specialtyName = 'Especialidad'
 public locationName = 'Clínica/Hospital'
 public date = 'Fecha'

 selectedSpecialty: any;
 selectedLocation: any;
 selectedDate: any;
 specialtyId: any;
 locationId: any;


 constructor(private userService: UserService, private router: Router) {}

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
    if (fecha!=null){
      this.date = fecha;
      this.selectedDate = fecha + "T00:00:00.000Z";
      console.log(this.selectedDate);      
    } 
    
  }

  selectSpecialty(specialtyId: any, specName: any){
    this.specialtyName = specName;
    this.userService.getSpecialityById(specialtyId).subscribe({
      next: (res) => {
        this.selectedSpecialty = res.speciality;
        sessionStorage.setItem("selectedSpecialty", JSON.stringify(this.selectedSpecialty));
        console.log(this.selectedSpecialty);
      },
      error: (error) => {
        console.error('Los datos del servidor no llegan')
        console.log(error)
      }
    });
  }

  selectLocation(locationId: any, locName: any){
    this.locationName = locName;
    this.userService.getSede(locationId).subscribe({
      next: (res) => {
        this.selectedLocation = res.sede;
        sessionStorage.setItem("selectedLocation", JSON.stringify(this.selectedLocation));
        console.log(this.selectedLocation);
      },
      error: (error) => {
        console.error('Los datos del servidor no llegan')
        console.log(error)
      }
    })
  }

  searchTurnos(){
    sessionStorage.setItem("selectedDate", this.selectedDate);
    this.router.navigate([ '/user/dashboard/inicio', { outlets: { der: 'turnoslist' } }]);
  }

}
