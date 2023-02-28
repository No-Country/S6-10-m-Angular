/* eslint-disable no-mixed-spaces-and-tabs */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LandingComponent } from './components/landing/landing.component';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';

const routes: Routes = [
	{path:'home', component:LandingComponent},
	{path:'about-us',component:AboutUsComponent},	
  	{path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
	{path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)},
	{path: 'doctor', loadChildren: () => import('./modules/doctor/doctor.module').then(m => m.DoctorModule)},
	{path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
	{path:'admin-dashboard',component:AdminDashboardComponent},
	{path:'patient-dashboard',component:PatientDashboardComponent},
	{ path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
