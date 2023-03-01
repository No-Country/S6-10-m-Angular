export class DataEmail {
    user: string;
    email:string;
    profesional:string;
    especialidad:string;
    sanatorio:string;
    diaTurno:string;
    horarioTurno: string;
  
    constructor( user:string, email:string,profesional:string,especialidad:string,sanatorio:string,diaTurno:string,horarioTurno: string) {
      this.user = user;
      this.email = email;
      this.profesional = profesional;
      this.especialidad = especialidad;
      this.sanatorio = sanatorio;
      this.diaTurno = diaTurno;
      this.horarioTurno = horarioTurno;
    }
}