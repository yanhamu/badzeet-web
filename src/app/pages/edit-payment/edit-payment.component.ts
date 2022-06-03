import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
        private router: Router,
        private storageService: StorageService,
        private categoryService: CategoryService,
        private accountUserService: AccountUserService) {
    }

    isLoading: boolean = true;
    budgetId: number;

    async ngOnInit() {
        this.accountId = this.storageService.getAccount().id;
        this.categories = await this.categoryService.listCategories(this.accountId);
        this.users = await this.accountUserService.listUsers(this.accountId);

        this.id = Number(this.route.snapshot.params['id']);
        this.payment = await this.paymentService.getPayment(this.accountId, this.id).toPromise();
        this.isLoading = false;
        this.budgetId = this.route.snapshot.queryParams['budgetId'];
    }

    paymentTypes = [{ id: 1, name: "Normal" }, { id: 2, name: 'Scheduled' }, { id: 3, name: "Pending" }];
    categories: Category[];
    users: User[];

    onSave() {
        this.paymentService.update(this.accountId, this.id, this.payment)
            .toPromise()
            .then(r => {
                this.router.navigate(
                    ['/payments'],
                    {
                        queryParams: {
                            budgetId: this.budgetId,
                        }
                    });
            });
    }
}