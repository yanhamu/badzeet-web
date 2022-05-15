import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PendingPaymentDto } from './pending-payment-dto';

@Component({
    selector: 'pending-payments',
    templateUrl: './pending-payments.component.html',
    styleUrls: ['./pending-payments.component.css'],
    inputs: ['budgetId', 'payments']
})
export class PendingPaymentsComponent implements OnInit {

    budgetId: number;
    payments: PendingPaymentDto[]
    constructor() { }

    async ngOnInit() {
    }

    async ngOnChanges(changes: SimpleChanges) {
        await this.ngOnInit();
    }

    openDialog(payment: PendingPaymentDto) {
        console.log(payment);
    }
}