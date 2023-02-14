import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
	{path:'home', component:LandingComponent},
  	{path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
	{path:'dashboard',component:AdminDashboardComponent},
	{ path: '**', redirectTo: 'home'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
