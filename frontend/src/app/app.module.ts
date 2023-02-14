import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './modules/auth/auth.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingComponent } from './components/landing/landing.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

@NgModule({
	declarations: [AppComponent, LandingComponent, AdminDashboardComponent],
	imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule, AuthModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
