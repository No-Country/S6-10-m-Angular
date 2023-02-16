import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nombreUsuario:string = "Usuario";

  constructor(private authService:AuthService,private router:Router) {}

  ngOnInit(): void {
    const userName = sessionStorage.getItem('FirstName');
    if (userName){
      this.nombreUsuario=userName
    } else {
      this.nombreUsuario="Usuario"
    }
  }

  closeSession() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Seras redirigido a la landing page de CitaMed",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.authService.logOut();
        this.router.navigateByUrl('/home')
      }
    })
  }
}
