import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRoutingModule } from './user-routing.module';
import { MedicosComponent } from './components/medicos/medicos.component';
import { TurnosComponent } from './components/turnos/turnos.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PruebaComponent } from './components/prueba/prueba.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MedicosComponent,
    TurnosComponent,
    PerfilComponent,
    PruebaComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
  ]

})
export class UserModule {}
