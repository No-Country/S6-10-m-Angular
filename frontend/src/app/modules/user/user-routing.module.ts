import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PerfilComponent } from './components/perfil/perfil.component'
import { PruebaComponent } from './components/prueba/prueba.component'
import { DashboardComponent } from './dashboard/dashboard.component'

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'dashboard', component: DashboardComponent,
      children: [
        { path: 'prueba', component: PruebaComponent },
        { path: 'perfil', component: PerfilComponent },
        { path: '**', redirectTo: 'prueba'}
      ] },
      { path: '**', redirectTo: 'home' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
