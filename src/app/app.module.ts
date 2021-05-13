import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { HttpClientModule } from '@angular/common/http';
import { NewExpenseComponent } from './new-expense/new-expense.component';
import { AuthHttpConfigModule } from './auth/auth-http-config.module';
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ExpensesComponent,
    NewExpenseComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthHttpConfigModule,
  ],
  exports: [AppMaterialModule],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
