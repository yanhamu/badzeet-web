import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { AccountUserService } from "src/app/services/account-users/account-user.service";
import { User } from "src/app/services/account-users/user";
import { Category } from "src/app/services/categories/category";
import { CategoryService } from "src/app/services/categories/category.service";
import { StorageService } from "src/app/services/storage/storage.service";
import { Payment } from "../payments/payment";
import { PaymentsService } from "../payments/payments.service";

@Component({
    selector: 'app-edit-payment',
    templateUrl: './edit-payment.component.html',
    styleUrls: ['./edit-payment.component.css'],

})
export class EditPaymentComponent implements OnInit {
    id: number;
    accountId: number;
    payment: Payment | undefined = {
        accountId: 1,
        amount: 1,
        categoryId: 1,
        date: new Date(),
        description: "",
        id: 1,
        type: 1,
        userId: "",
    }

    constructor(
        private paymentService: PaymentsService,
        private route: ActivatedRoute,
        private storageService: StorageService,
        private categoryService: CategoryService,
        private accountUserService: AccountUserService) {
    }

    async ngOnInit() {
        this.accountId = this.storageService.getAccount().id;
        this.categories = await this.categoryService.listCategories(this.accountId);
        this.users = await this.accountUserService.listUsers(this.accountId);

        let params = this.route.snapshot.params;
        this.id = Number(params['id']);
        this.payment = await this.paymentService.getPayment(this.accountId, this.id).toPromise();
    }

    paymentTypes = [{ id: 1, name: "Normal" }, { id: 2, name: 'Scheduled' }, { id: 3, name: "Pending" }];
    categories: Category[];
    users: User[];

    async onSave() {
        console.log(this.payment);
        await this.paymentService.update(this.accountId, this.id, this.payment).toPromise();
    }
}