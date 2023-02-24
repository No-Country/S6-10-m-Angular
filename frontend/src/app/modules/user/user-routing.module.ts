import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HojaComponent } from './components/hoja/hoja.component'
import { InicioPacienteComponent } from './components/inicio-paciente/inicio-paciente.component'
import { MedicoPerfilComponent } from './components/medicos/medico-perfil/medico-perfil.component'
import { MedicoTurnoComponent } from './components/medicos/medico-turno/medico-turno.component'
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
        { path: 'inicio', component: InicioPacienteComponent },
        { path: 'medico-turno', component: MedicoTurnoComponent },
        { path: 'hoja', component: HojaComponent },
        { path: 'medico-perfil', component: MedicoPerfilComponent },
        { path: 'hoja', component: HojaComponent },
        { path: '**', redirectTo: 'inicio'}
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
