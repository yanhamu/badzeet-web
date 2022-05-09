import { Component, OnInit, SimpleChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { Payment, PaymentType } from 'src/app/pages/payments/payment';
import { PaymentsService } from 'src/app/pages/payments/payments.service';
import { AccountsService } from 'src/app/services/accounts/accounts.service';

@Component({
    selector: 'pending-payments',
    templateUrl: './pending-payments.component.html',
    styleUrls: ['./pending-payments.component.css'],
    inputs: ['budgetId']
})
export class PendingPaymentsComponent implements OnInit {

    budgetId: number;
    payments: PendingPaymentDto[]
    constructor(private accountService: AccountsService, private paymentService: PaymentsService) { }

    async ngOnInit() {
        let account = await this.accountService.getAccount();
        let payments = this.paymentService.getAllPayments(account.id, PaymentType.Pending)
            .pipe(map(data => {
                return data.map(x => {
                    return {
                        id: x.id,
                        amount: x.amount,
                        category: "",
                        description: x.description,
                        owner: ""
                    };
                })
            }));
        payments.subscribe(x => this.payments = x);
    }

    async ngOnChanges(changes: SimpleChanges) {
        await this.ngOnInit();
    }
}

interface PendingPaymentDto {
    id: number,
    amount: number,
    category: string,
    description: string,
    owner: string
}