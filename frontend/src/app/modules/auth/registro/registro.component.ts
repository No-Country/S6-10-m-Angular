import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NuevoUsuario } from '../models/nuevo-usuario';

@Component({
	selector: 'app-registro',
	templateUrl: './registro.component.html',
	styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
	constructor(private authService: AuthService ) {}

	ngOnInit(): void {}

	user: NuevoUsuario = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }


  createUser() {
    this.authService.nuevo(this.user)
    .subscribe(data => console.log(data))
  }

}
