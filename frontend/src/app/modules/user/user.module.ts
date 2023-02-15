import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from './dashboard/dashboard.component'
import { UserRoutingModule } from './user-routing.module'

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, UserRoutingModule]
})
export class UserModule {}
