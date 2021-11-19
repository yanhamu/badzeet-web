import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthHttpConfigModule } from './auth/auth-http-config.module';
import { httpInterceptorProviders } from './http-interceptors';
import { PaymentsComponent } from './pages/payments/payments.component';
import { PaymentsService } from './pages/payments/payments.service';
import { NewPaymentComponent } from './pages/new-payment/new-payment.component';
import { CategoryService } from './services/categories/category.service';
import { AccountUserService } from './services/account-users/account-user.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewPaymentComponent,
    PaymentsComponent,
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
  providers: [httpInterceptorProviders, PaymentsService, CategoryService, AccountUserService],
  bootstrap: [AppComponent],
})
export class AppModule { }
