import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-hoja',
  templateUrl: './hoja.component.html',
  styleUrls: ['./hoja.component.css']
})
export class HojaComponent implements OnInit {

  patient_view:boolean=true;
  datos:any;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.obtenerDatos()
  }

  obtenerDatos(){
    this.userService.getSedes().subscribe({
      next: (res)=>{       
        this.datos =  res;
        console.log(res)
      },    
      error: (error)=> {
        console.error("Los datos del servidor no llegan");   
        console.log(error)          
      },
      complete: ()=>{
        console.log("Complete")
      }
  }); 
  }
}
