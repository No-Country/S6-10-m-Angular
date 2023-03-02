import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HojaComponent } from './components/hoja/hoja.component'
import { InicioPacienteComponent } from './components/inicio-paciente/inicio-paciente.component'
import { CartillaComponent } from './components/medicos/cartilla/cartilla.component'
import { ListaComponent } from './components/medicos/lista/lista.component'
import { MedicoPerfilComponent } from './components/medicos/medico-perfil/medico-perfil.component'
import { MedicoTurnoComponent } from './components/medicos/medico-turno/medico-turno.component'
import { MedicosComponent } from './components/medicos/medicos.component'
import { OpinionesComponent } from './components/opiniones/opiniones.component'
import { PerfilComponent } from './components/perfil/perfil.component'
import { PruebaComponent } from './components/prueba/prueba.component'
import { TurnosListComponent } from './components/turnos/turnos-list/turnos-list.component'
import { TurnosSearchComponent } from './components/turnos/turnos-search/turnos-search.component'
import { TurnosComponent } from './components/turnos/turnos.component'
import { DashboardComponent } from './dashboard/dashboard.component'

const routes: Routes = [  
  {
    path: '',
    children:[
      { path: 'dashboard', component: DashboardComponent,
      children: [
        { path: 'inicio', component: InicioPacienteComponent,
        children: [
          {
              path: '',
              component: CartillaComponent,
              outlet: 'izq'
          },          
          {
              path: '',
              component: TurnosComponent,
              outlet: 'der'
          },
          {
            path: 'lista',
            component: ListaComponent,
            outlet: 'izq'
          },
          {
            path: 'medicoperfil',
            component: MedicoPerfilComponent,
            outlet: 'der'
        },
        {
            path: 'turnossearch',
            component: TurnosSearchComponent,
            outlet: 'der'
        },
        {
          path: 'turnoslist',
          component: TurnosListComponent,
          outlet: 'der'
      }
      ]},
        { path: 'perfil', component: PerfilComponent},
        { path: 'medico-turno', component: MedicoTurnoComponent },
        { path: 'hoja', component: TurnosListComponent },
        { path: 'opiniones', component: OpinionesComponent }
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
