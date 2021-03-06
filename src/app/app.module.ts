import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExpencesComponent } from './pages/expences/expences.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, ExpencesComponent, ExpensesComponent],
  imports: [BrowserModule, RouterModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
