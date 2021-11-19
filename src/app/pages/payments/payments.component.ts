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
  categories: { [id: string]: string };
  users: { [id: string]: string };

  constructor(private paymentService: PaymentsService) {
  }

  isGroup(index, item): boolean {
    return item.date;
  }

  ngOnInit(): void {
    let categories: { [id: string]: string } = {};
    this.paymentService.getCategories(accountId).toPromise()
      .then((data: Category[]) => {
        data.forEach(category => {
          categories[category.id] = category.name;
        });
        this.categories = categories;
        return categories;
      })
      .then(() => {
        return this.paymentService.getUsers(accountId).toPromise();
      })
      .then((data: User[]) => {
        let users: { [id: string]: string } = {};
        data.forEach(user => {
          users[user.id] = user.nick;
        });
        this.users = users;
        return users;
      })
      .then(() => {
        this.loadPayments(accountId, budgetId, this.categories, this.users)
      })
  }

  loadPayments(accountId: number, budgetId: number, categoryMap: any, userMap: any) {
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
          owner: userMap[payment.userId],
          category: categoryMap[payment.categoryId]
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