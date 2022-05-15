import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PendingPaymentDto } from './pending-payment-dto';

@Component({
    selector: 'pending-payments-action',
    templateUrl: './pending-payments-action.component.html',
    styleUrls: ['./pending-payments-action.component.css'],
})
export class PendingPaymentsActionComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<PendingPaymentsActionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: PendingPaymentDto,) { }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {

    }
}