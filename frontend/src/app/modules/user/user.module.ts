import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRoutingModule } from './user-routing.module';
import { MedicosComponent } from './components/medicos/medicos.component';
import { TurnosComponent } from './components/turnos/turnos.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { HojaComponent } from './components/hoja/hoja.component';
import { TurnosSearchComponent } from './components/turnos/turnos-search/turnos-search.component';
import { InicioPacienteComponent } from './components/inicio-paciente/inicio-paciente.component';
import { MedicoTurnoComponent } from './components/medicos/medico-turno/medico-turno.component';
import { MedicoPerfilComponent } from './components/medicos/medico-perfil/medico-perfil.component';
import { interceptorProvider } from 'src/app/interceptors/interceptor.service';
import { CartillaComponent } from './components/medicos/cartilla/cartilla.component';
import { ListaComponent } from './components/medicos/lista/lista.component';
import { OpinionesComponent } from './components/opiniones/opiniones.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MedicosComponent,
    TurnosComponent,
    PerfilComponent,
    PruebaComponent,
    HojaComponent,
    TurnosSearchComponent,
    InicioPacienteComponent,
    MedicoTurnoComponent,
    MedicoPerfilComponent,
    CartillaComponent,
    ListaComponent,
    OpinionesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgbModule
  ],
  providers: [interceptorProvider],
  exports: [
  ]

})
export class UserModule {}
