import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  id:any;
  data:any;
  user:any;
  objeto:any;

  constructor(private route:ActivatedRoute,private router:Router) {
    
   }

  ngOnInit(): void {
    //this.route.params.subscribe(params => {
      // Guardar los parámetros para su uso posterior
      //this.saveParams(params);
    //});
     // Obtener los parámetros de la ruta actual
     const currentParams = this.route.snapshot.params;

     // Guardar los parámetros para su uso posterior
     this.saveParams(currentParams);
  }

  saveParams(params:any){     
    sessionStorage.setItem('a',params);
    this.objeto=params;
    console.log(this.objeto)
    console.log(this.objeto.token)
    console.log(params.url)
  }
  //Token Recuperado

   //0b0b29e1-f19f-4637-a29a-24eb62c0729a 
  
   recuperar(){
    console.log(this.objeto)
    console.log(this.objeto.token)
   }
    
}
