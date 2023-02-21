import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  public aux: boolean;
  
  constructor() { this.aux = true}

  ngOnInit(): void {
    this.aux = true;
  }

  hide(){
    this.aux = false;
  }

}
