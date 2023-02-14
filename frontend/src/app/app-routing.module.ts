import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
	{ path: 'home', component: LandingComponent },
	{ path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule) },
	{ path: '**', redirectTo: 'home' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
