import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { NewPaymentComponent } from './pages/new-payment/new-payment.component';
import { AuthGuard } from './auth/auth-guard';
import { EditPaymentComponent } from './pages/edit-payment/edit-payment.component';
import { BudgetBuilderComponent } from './components/budget-builder/budget-builder.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'new-budget', component: BudgetBuilderComponent, canActivate: [AuthGuard] },
  { path: 'new-payment', component: NewPaymentComponent, canActivate: [AuthGuard] },
  { path: 'payments/:id', component: EditPaymentComponent, canActivate: [AuthGuard] },
  { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
