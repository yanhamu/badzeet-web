import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { BudgetService } from 'src/app/services/budget/budget.service';
import { Payment, PaymentTypeEnum } from '../payments/payment';
import { PaymentsService } from '../payments/payments.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private budgetService: BudgetService,
    private paymentService: PaymentsService,
    private accountService: AccountsService) { }

  isLoading: boolean = true;
  budgetId: number;
  hasBudget: boolean = false;
  pendingPayments: Payment[]
  accountId: number;

  async ngOnInit() {
    this.route.queryParamMap.subscribe(async value => {
      await this.init(value);
      this.isLoading = false;
    });
  }

  async init(value) {
    this.budgetId = Number(value.get("budgetId"));
    let budget = await this.budgetService.getBudget(this.budgetId);
    this.hasBudget = budget != null;
    let account = await this.accountService.getAccount();
    this.accountId = account.id;
    await this.loadPendingPayments(account.id);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }

  newBudget() {
    this.router.navigate(['/new-budget', { budgetId: this.budgetId }]);
  }

  setBudgetId(budgetId: number) {
    console.log("budget id was changed");
    this.budgetId = budgetId;
    this.router.navigate([], { relativeTo: this.route, queryParams: { budgetId: budgetId } });
  }

  async loadPendingPayments(accountId: number) {
    this.paymentService.getAllPayments(accountId, PaymentTypeEnum.Pending)
      .subscribe(x => this.pendingPayments = x);
  }

  hasPending(): boolean {
    if (this.pendingPayments == null || this.pendingPayments.length == 0) {
      return false
    }
    return true;
  }
}