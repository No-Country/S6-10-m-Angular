import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hoja',
  templateUrl: './hoja.component.html',
  styleUrls: ['./hoja.component.css']
})
export class HojaComponent implements OnInit {

  patient_view:boolean=true;

  constructor() { }

  ngOnInit(): void {
  }

}
