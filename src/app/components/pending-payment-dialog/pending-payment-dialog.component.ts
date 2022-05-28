import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PaymentType } from "src/app/pages/payments/payment-type";
import { PaymentDto } from "src/app/pages/payments/payments.component";
import { PaymentsService } from "src/app/pages/payments/payments.service";
import { User } from "src/app/services/account-users/user";
import { Category } from "src/app/services/categories/category";
import { PendingPaymentDto } from "../pending-payments/pending-payment-dto";

@Component({
    selector: 'pending-payment-dialog',
    templateUrl: 'pending-payment-dialog.component.html',
    styleUrls: ['./pending-payment-dialog.component.css'],
})
export class PendingPaymentDialog {

    payment: PendingPaymentDto;
    categories: Category[];
    users: User[];
    paymentTypes:PaymentType[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: PendingPaymentDialogDto,
        private paymentService:PaymentsService) {
        this.payment = data.payment;
        this.categories = data.categories;
        this.users = data.users;
        this.paymentTypes = this.paymentService.getPaymentTypes();
    }

    onSave() {
        console.log("save from dialog")
    }
}

export class PendingPaymentDialogDto {
    payment: PendingPaymentDto;
    categories: Category[];
    users: User[];
}