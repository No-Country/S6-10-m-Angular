import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from './login/login.component'
import { NewPasswordComponent } from './new-password/new-password.component'
import { RecoverComponent } from './recover/recover.component'
import { RegistroComponent } from './registro/registro.component'

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'recover', component: RecoverComponent },
      { path: 'newpassword', component: NewPasswordComponent },
      { path: '**', redirectTo: 'home' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
