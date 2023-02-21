import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  editar:boolean=true;
  firstName:string="";
  lastName:string="";
  dni:string="";
  email:string="";
  code?:number;
  telefono:string="";

  constructor() { }

  ngOnInit(): void {
    const nombre = sessionStorage.getItem("FirstName");
    const apellido = sessionStorage.getItem("LastName");
    const email = sessionStorage.getItem("UserEmail");
    const dni = sessionStorage.getItem("Dni");
    const phone = sessionStorage.getItem("Phone");
    const code = sessionStorage.getItem("Code");
    if (nombre !==null){
      this.firstName=nombre
    }
    if (apellido !== null) {
      this.lastName = apellido
    }
    if (email !== null){
      this.email = email
    }
    if (dni !==null){
      this.dni=dni
    }
    if (phone !== null) {
      this.telefono = phone
    }
    if (email !== null){
      this.email = email
    }
  }

}
