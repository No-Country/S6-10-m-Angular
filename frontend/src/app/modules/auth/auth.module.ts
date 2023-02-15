import { NgModule } from '@angular/core'

import { CommonModule } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { RegistroComponent } from './registro/registro.component'

import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { AuthRoutingModule } from './auth-routing.module'

@NgModule({
  declarations: [LoginComponent, RegistroComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AuthRoutingModule]
})
export class AuthModule {}
