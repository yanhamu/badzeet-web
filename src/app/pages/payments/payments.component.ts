import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/services/account-users/user';
import { Category } from 'src/app/services/categories/category';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Payment } from './payment';
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
  from: string;
  to: string;

  constructor(private paymentService: PaymentsService,
    private storageService: StorageService,
    private route: ActivatedRoute) {
  }

  isGroup(index, item): boolean {
    return item.date;
  }

  ngOnInit() {
    let accountId = this.storageService.getAccount().id;
    let params = this.route.snapshot.queryParams;

    this.budgetId = params['budgetId'] == '' ? null : params['budgetId'];
    this.from = params['from'];
    this.to = params['to'];

    this.paymentService.getCategories(accountId)
      .then((data) => {
        this.categories = data;
        return this.paymentService.getUsers(accountId);
      })
      .then((data) => {
        this.users = data;
        return this.loadPayments(accountId, this.budgetId, this.from, this.to, this.categories, this.users);
      });

  }

  loadPayments(accountId: number, budgetId: number, from: string, to: string, categoryMap: any, userMap: any) {
    this.paymentService.getPayments(accountId, budgetId, from, to)
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