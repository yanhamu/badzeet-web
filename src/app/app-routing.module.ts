import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewExpenseComponent } from './new-expense/new-expense.component';
import { AutoLoginGuard } from 'angular-auth-oidc-client';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AutoLoginGuard] },
  { path: 'new-expense', component: NewExpenseComponent },
  { path: 'payments', component: PaymentsComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
