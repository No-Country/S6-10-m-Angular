import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LandingComponent } from './components/landing/landing.component';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';

const routes: Routes = [
	{path:'home', component:LandingComponent},
  	{path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
	{path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)},
	{path:'admin-dashboard',component:AdminDashboardComponent},
	{path:'patient-dashboard',component:PatientDashboardComponent},
	{ path: '**', redirectTo: 'home'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
