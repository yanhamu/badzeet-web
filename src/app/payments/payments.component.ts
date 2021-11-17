import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category';
import { Payment } from './payment';
import { PaymentsService } from './payments.service';
import { User } from './user';

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
    this.paymentsGrouped = groups;
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
        return this.paymentService.getUsers(accountId).toPromise()
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

const groups: (PaymentDto | PaymentGroup)[] = [
  { date: new Date('2021-01-01') },
  { id: 1, amount: 2.23, category: "Food", description: 'Billa', owner: 'Omas' },
  { id: 1, amount: 2.23, category: "Restaurants", description: 'DameJidlo', owner: 'Ica' },
  { id: 1, amount: 2.23, category: "Food", description: 'Albert', owner: 'Omas' },
  { date: new Date('2021-01-02') },
  { id: 1, amount: 22.23, category: "Food", description: 'Albert', owner: 'Omas' },
  { date: new Date('2021-01-03') },
  { id: 1, amount: 12.23, category: "Restaurants", description: 'Avion', owner: 'Omas' },
]

export interface PaymentDto {
  id: number,
  amount: number,
  category: string,
  description: string,
  owner: string
}