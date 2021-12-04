import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { PaymentsComponent } from './pages/payments/payments.component';
import { NewPaymentComponent } from './pages/new-payment/new-payment.component';
import { NavigationComponent } from './components/navigation.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthHttpConfigModule } from './auth/auth-http-config.module';
import { httpInterceptorProviders } from './http-interceptors';
import { PaymentsService } from './pages/payments/payments.service';
import { CategoryService } from './services/categories/category.service';
import { AccountUserService } from './services/account-users/account-user.service';
import { AuthGuard } from './auth/auth-guard';
import { NewPaymentservice } from './pages/new-payment/new-payment.service';
import { AccountsService } from './services/accounts/accounts.service';
import { StorageService } from './services/storage/storage.service';
import { NavigationService } from './services/navigations/navigation.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewPaymentComponent,
    PaymentsComponent,
    NavigationComponent
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
  providers: [httpInterceptorProviders, 
    PaymentsService, 
    CategoryService, 
    AccountUserService, 
    NewPaymentservice,
    AccountsService,
    StorageService,
    NavigationService,
    AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
