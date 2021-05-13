import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { NewExpenseComponent } from './new-expense/new-expense.component';
import { AutoLoginGuard } from 'angular-auth-oidc-client';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AutoLoginGuard] },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'new-expense', component: NewExpenseComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
