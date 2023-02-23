import { Component } from '@angular/core';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
})
export class MedicosComponent  {

  constructor() { }

  // ARREGLO A ITERAR SIMULANDO LA PETICION DEL ENDPOINT
  arr: number[] = [1, 2, 3, 4, 5, 6, 7, 7, 7, 6, 5, 5, 12, 12 ,11]


  // ESTAS VARIABLES SON DE EL SLIDER DOBLE
  columns : number = Math.round(this.arr.length / 2)
  sliderWidth: number = 0
  show: boolean = false
  sliderEndOneRow = (this.arr.length * 100) + (this.arr.length  * 30)
  sliderEndOneTwoColunms = ((this.arr.length * 100) + (this.arr.length  * 30)) / 2

// ESTOS SON LOS BOTONES DEL SLIDER DOBLE
  nextButton () {
    this.sliderWidth = this.sliderWidth + 180
    if(this.show == true) {
      console.log(this.sliderEndOneRow)
    }
  }

  prevButton () {
    this.sliderWidth = this.sliderWidth - 180
  }

  // ESTILOS INSERTABLES AL SLIDER (DINAMICOS)

  styles() {
    return {
      'display': `${this.show ? 'flex' : 'grid'}`,
      'grid-template-columns': `repeat(${this.columns + 1}, 1fr)`,
      'gap': '30px',
      'justify-items': 'center',
      'justify-content': 'center',
      'align-items': 'center',
      'margin-top': '-20px',
      'transform': `translateX(-${this.sliderWidth}px)`,
      'transition': 'all .5s'

    };
  }

  // ------------------------SLIDER FAVORITOS------------------------

  // VARIABLES
  sliderEndFavorite : number = this.arr.length * 50
  sliderFavoriteWidth: number = 0
  // ESTILOS INSERTABLES AL SLIDER (DINAMICOS) SLIDER DE FAVORITOS
  stylesFavorite() {

      return {
        'transform': `translateX(-${this.sliderFavoriteWidth}px)`,
        'display': 'flex',
        'transition': 'all.5s',
        'position': 'absolute',
        'margin-left': '30px',
        'gap' : '30px'
      }
  }

  stylesN () {
    return {
      'display' : 'none'
    }
  }

  nextButtonFavorite () {
    this.sliderFavoriteWidth = this.sliderFavoriteWidth + 180
  }

  prevButtonFavorite () {
    this.sliderFavoriteWidth = this.sliderFavoriteWidth - 180
  }


  showFavorite () {
      this.show = !this.show
  }


}
