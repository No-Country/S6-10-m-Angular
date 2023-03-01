import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  id:any;
  data:any;
  user:any

  constructor(private route:ActivatedRoute) {
    
   }

  ngOnInit(): void {
    this.id= this.route.snapshot.params;
    this.data = this.route.snapshot.url.join('');
    this.user = this.route.snapshot.data;
    sessionStorage.setItem('a',this.id);
    sessionStorage.setItem('b',this.data);
    sessionStorage.setItem('c',this.user);
  }
}
