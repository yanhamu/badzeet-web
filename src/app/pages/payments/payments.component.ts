import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/services/account-users/user';
import { Category } from 'src/app/services/categories/category';
import { Payment } from './payment';
import { PaymentsService } from './payments.service';

const budgetId: number = 15
const accountId: number = 2

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  paymentsGrouped: (PaymentDto | PaymentGroup)[];
  categories: { [id: string]: Category };
  users: { [id: string]: User };

  constructor(private paymentService: PaymentsService) {
  }

  isGroup(index, item): boolean {
    return item.date;
  }

  async ngOnInit() {
    await this.paymentService.getCategories(accountId)
      .then((data) => {
        this.categories = data;
        return this.paymentService.getUsers(accountId);
      })
      .then((data) => {
        this.users = data;
        return this.loadPayments(accountId, budgetId, this.categories, this.users);
      });
  }

  loadPayments(accountId: number, budgetId: number, categoryMap:any, userMap: any) {
    this.paymentService.getPayments(accountId, budgetId).subscribe((data: Payment[]) => {
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