import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { HttpClientModule } from '@angular/common/http'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'

<<<<<<< HEAD
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingComponent } from './components/landing/landing.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { AdminModule } from './modules/admin/admin.module';
import { DoctorModule } from './modules/doctor/doctor.module';
=======
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { LandingComponent } from './components/landing/landing.component'
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component'
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component'
>>>>>>> 73e45ced8c4f1d37b88bbcf70b3117f0829ac342

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AdminDashboardComponent,
    PatientDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    AuthModule,
<<<<<<< HEAD
    UserModule,
    AdminModule,
    DoctorModule
=======
    UserModule
>>>>>>> 73e45ced8c4f1d37b88bbcf70b3117f0829ac342
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
