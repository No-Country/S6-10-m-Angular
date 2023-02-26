import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FechaService {

  mes:number=0
  mesR:string="";
  dia:number=0;
  diaR:string="";
  mesTexto:string="";

  constructor() { }

  public actual(){    
    const date = new Date();
    const dia = date.getDate();
    const mes = date.getMonth()+1;
    const año = date.getFullYear();    
    if (mes<10){
      this.mesR = "0" + mes;           
    } else {
      this.mesR = mes.toString()
    }
    if (dia<10){
      this.diaR = "0" + dia;           
    } else {
      this.diaR = dia.toString()
    }    
    const diaActual = año+"-"+this.mesR+"-"+this.diaR;
    return diaActual
  }
}
