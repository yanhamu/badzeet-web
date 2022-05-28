import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Payment } from 'src/app/pages/payments/payment';
import { PaymentsService } from 'src/app/pages/payments/payments.service';
import { AccountUserService } from 'src/app/services/account-users/account-user.service';
import { User } from 'src/app/services/account-users/user';
import { Category } from 'src/app/services/categories/category';
import { CategoryService } from 'src/app/services/categories/category.service';
import { PendingPaymentDialog } from '../pending-payment-dialog/pending-payment-dialog.component';
import { PendingPaymentDto } from './pending-payment-dto';

@Component({
    selector: 'pending-payments',
    templateUrl: './pending-payments.component.html',
    styleUrls: ['./pending-payments.component.css'],
    inputs: ['budgetId', 'payments', 'accountId']
})
export class PendingPaymentsComponent implements OnInit {

    budgetId: number;
    payments: Payment[];
    pendingPayments: PendingPaymentDto[];
    accountId: number;
    categories: Category[];
    categoryMap: { [id: string]: Category };
    users: User[];
    userMap: { [id: string]: User };

    constructor(
        public dialog: MatDialog,
        private categoryService: CategoryService,
        private paymentService: PaymentsService,
        private accountUserService: AccountUserService) { }

    async ngOnInit() {
        this.categoryMap = await this.categoryService.getCategoryMap(this.accountId);
        this.userMap = await this.paymentService.getUsers(this.accountId);
        this.pendingPayments = this.payments.map((x) => {
            return {
                id: x.id,
                accountId: x.accountId,
                date: x.date,
                description: x.description,
                amount: x.amount,
                categoryId: x.categoryId,
                userId: x.userId,
                type: x.type,
                category: this.categoryMap[x.categoryId].name,
                owner: this.userMap[x.userId].nick
            }
        });
        this.categories = await this.categoryService.getCategories(this.accountId).toPromise()
        this.users = await this.accountUserService.listUsers(this.accountId);
    }

    async ngOnChanges(changes: SimpleChanges) {
        await this.ngOnInit();
    }

    openDialog(payment: PendingPaymentDto) {
        let data = {
            payment: payment,
            categories: this.categories,
            users: this.users
        }

        const dialogRef = this.dialog.open(PendingPaymentDialog, { data: data });
    }
}