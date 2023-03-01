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
    const currentParams= this.route.snapshot.params;
    this.saveParams(currentParams);
    this.router.navigateByUrl('/auth/newpassword') 
  }  
  saveParams(params:any){      
    sessionStorage.setItem('a',params);
  }
    
    
}
