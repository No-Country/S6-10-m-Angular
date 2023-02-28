export class DataEmail {
    nombre: string;
    apellido: string;
    email:string;
    profesional:string;
    especialidad:string;
    sede:string;
    dia:string;
    horario: string;
  
    constructor( nombre: string,apellido: string,email:string,profesional:string,especialidad:string,sede:string,dia:string,horario: string) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.email = email;
      this.profesional = profesional;
      this.especialidad = especialidad;
      this.sede = sede;
      this.dia = dia;
       this.horario = horario;
    }
}