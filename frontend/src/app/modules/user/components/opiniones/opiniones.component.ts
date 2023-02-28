import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.css']
})
export class OpinionesComponent implements OnInit {

  constructor() { }


  userArr = [
    {
      name: 'maria Ricci',
      fecha: '01/03/2022',
      title: 'exelente doctora',
      descripccion: 'La Doctora Lara ha sido de gran ayuda en la transformación de mi cuerpo.  Después de evaluar los exámenes me atendio',
      image: '../../../../../assets/img/paciente-opiniones-1.png'

    },
    {
      name: 'Esteban Lucre',
      fecha: '03/03/2022',
      title: 'La recomiendo.',
      descripccion: 'La verdad que me atendió super bien y super rápido, quien busque una buena profesional no dude en consultarle.',
      image: '../../../../../assets/img/paciente-opiniones-2.png'
    },
    {
      name: 'Martin Riio',
      fecha: '05/03/2022',
      title: 'Bien',
      descripccion: 'Todo ok.',
      image: '../../../../../assets/img/paciente-opiniones-3.png'
    },
    {
      name: 'Marta Mort',
      fecha: '06/03/2022',
      title: 'Muy atenta',
      descripccion: 'Excelente atención, respondió todas mis dudas e inquietudes. Salí chocha de  la consulta! no dudaría un segundo en volver a consultarle.',
      image: '../../../../../assets/img/paciente-opiniones-4.png'
    },
    {
      name: 'Josefina Jowell',
      fecha: '08/03/2022',
      title: 'Muy cálida',
      descripccion: 'Me hizo sentir muy conforme dentro del consultorio. Todo el tiempo que pasé ahi fue muy amigable para mi.',
      image: '../../../../../assets/img/paciente-opiniones-5.png'
    },
    {
      name: 'Emilia Rucu',
      fecha: '09/03/2022',
      title: 'Todo ok.',
      descripccion: 'Me atendió muy rápido y bien. La recomiendo',
      image: '../../../../../assets/img/paciente-opiniones-6.png'
    },
    {
      name: 'Mercedes Briol',
      fecha: '9/03/2022',
      title: '¡Espectacular!',
      descripccion: 'Me cuida casi tanto como mi mamá.',
      image: '../../../../../assets/img/paciente-opiniones-7.png'
    },
    {
      name: 'Ana Manzo',
      fecha: '10/03/2022',
      title: 'Buena atención',
      descripccion: 'La atención es muy buena, es una excelente profesional. Le pongo 4 estrellas por la demora que tuvo al llegar al consultorio.',
      image: '../../../../../assets/img/paciente-opiniones-8.png'
    }
  ]

  ngOnInit(): void {
  }

}
