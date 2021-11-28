import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { NewPaymentComponent } from './pages/new-payment/new-payment.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'new-payment', component: NewPaymentComponent },
  { path: 'payments', component: PaymentsComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
