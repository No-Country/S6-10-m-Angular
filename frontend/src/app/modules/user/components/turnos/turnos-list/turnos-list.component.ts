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

  loc: any = "1065499c-70ef-479b-aefc-fe98922cc185";
  spec: any = "e68a947e-2eff-45d7-ab9f-c70184aa775c";
  dat: any = "2023-03-10T00:00:00.000Z"

  specialtyId: any;
  locationId: any;

  schedules: any;
  schedulesList: any;

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {

    this.specialty = JSON.parse(sessionStorage.getItem("selectedSpecialty") || "").name;
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
        console.log(res.schedules);
        this.schedulesList = this.divideArr(this.schedules,8);
      },
      error: (error) => {
        console.error('Los datos del servidor no llegan')
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

}


