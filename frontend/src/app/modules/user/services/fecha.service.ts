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

  public fechaTransform(dataFecha:string){
    const fechita=dataFecha.substring(0,10)
    const diaElegido = new Date(fechita);
    const dia = diaElegido.getDate()+1;
    const mes = diaElegido.getMonth()+1;
    const año = diaElegido.getFullYear();
    switch (mes){
      case 1: this.mesTexto="Enero";
      break;
      case 2: this.mesTexto="Febrero";
      break;
      case 3: this.mesTexto="Marzo";
      break;
      case 4: this.mesTexto="Abril";
      break;
      case 5: this.mesTexto="Mayo";
      break;
      case 6: this.mesTexto="Junio";
      break;
      case 7: this.mesTexto="Julio";
      break;
      case 8: this.mesTexto="Agosto";
      break;
      case 9: this.mesTexto="Septiembre";
      break;
      case 10: this.mesTexto="Octubre";
      break;
      case 11: this.mesTexto="Noviembre";
      break;
      case 12: this.mesTexto="Diciembre";
      break;
      default:
      break
    }
    const diaTurno = dia+" de "+this.mesTexto+" de "+año;
    return diaTurno;    
  }
  
}
