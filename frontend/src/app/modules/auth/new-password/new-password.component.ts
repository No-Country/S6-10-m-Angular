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
  user:any

  constructor(private route:ActivatedRoute,private router:Router) {
    
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Guardar los parámetros para su uso posterior
      this.saveParams(params);
    });
  }  
  saveParams(params:any){      
    sessionStorage.setItem('a',params);
  }
    
    
}
