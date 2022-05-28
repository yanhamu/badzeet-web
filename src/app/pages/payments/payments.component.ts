import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/services/account-users/user';
import { BudgetService } from 'src/app/services/budget/budget.service';
import { Category } from 'src/app/services/categories/category';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Payment, PaymentTypeEnum } from './payment';
import { PaymentsService } from './payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  paymentsGrouped: (PaymentDto | PaymentGroup)[];
  categories: { [id: string]: Category };
  users: { [id: string]: User };
  budgetId: number;
  from: Date;
  to: Date;

  constructor(private paymentService: PaymentsService,
    private storageService: StorageService,
    private budgetService: BudgetService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  isLoading: boolean = true;

  isGroup(index, item): boolean {
    return item.date;
  }

  async ngOnInit() {
    let accountId = this.storageService.getAccount().id;
    let params = this.route.snapshot.queryParams;

    this.budgetId = params['budgetId'] == '' ? null : params['budgetId'];
    let intervals = await this.budgetService.getBudgetInterval(this.budgetId);
    this.from = intervals.from;
    this.to = intervals.to;

    this.paymentService.getCategories(accountId)
      .then((data) => {
        this.categories = data;
        return this.paymentService.getUsers(accountId);
      })
      .then((data) => {
        this.users = data;
        return this.loadPayments(accountId, this.budgetId, this.categories, this.users);
      })
      .then(() => this.isLoading = false);
  }

  loadPayments(accountId: number, budgetId: number, categoryMap: any, userMap: any) {
    this.paymentService.getPayments(accountId, this.from, this.to, PaymentTypeEnum.Normal)
      .subscribe((data: Payment[]) => {
        let date: Date = null;
        let result: (PaymentDto | PaymentGroup)[] = [];

        data.forEach(payment => {
          if (date != payment.date) {
            result.push({ date: payment.date })
            date = payment.date;
          }
          result.push({
            id: payment.id,
            amount: payment.amount,
            description: payment.description,
            owner: userMap[payment.userId].nick,
            category: categoryMap[payment.categoryId].name
          });
        });
        this.paymentsGrouped = result;
      });
  }

  async setBudgetId(budgetId: number) {
    this.budgetId = budgetId;
    let intervals = await this.budgetService.getBudgetInterval(this.budgetId);
    this.from = intervals.from;
    this.to = intervals.to;
    this.loadPayments(this.storageService.getAccount().id, this.budgetId, this.categories, this.users);
  }
}

export interface PaymentGroup {
  date: Date
}

export interface PaymentDto {
  id: number,
  amount: number,
  category: string,
  description: string,
  owner: string
}