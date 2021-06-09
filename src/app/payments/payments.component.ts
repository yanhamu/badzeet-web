import { Component, OnInit } from '@angular/core';
import { Payment } from '../services/payment';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  payments: Payment[] = [];
  
  constructor() {
    this.payments.push({ Id: 1, AccountId: 1, Amount: 2.23, CategoryId: 3, Date: new Date('2021-01-01'), Description: 'desc', UserId: 'asdf' });
    this.payments.push({ Id: 2, AccountId: 1, Amount: 200.23, CategoryId: 6, Date: new Date('2021-01-01'), Description: 'description', UserId: 'asdf' });
  }

  ngOnInit(): void {
  }

}
