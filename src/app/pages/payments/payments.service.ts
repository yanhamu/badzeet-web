import { HttpClient } from "@angular/common/http";
import { Payment, PaymentType } from "./payment";
import { Injectable } from '@angular/core';

import { environment } from "src/environments/environment";
import { CategoryService } from "src/app/services/categories/category.service";
import { AccountUserService } from "src/app/services/account-users/account-user.service";

const baseUrl = `${environment.baseUrl}/api/`;

@Injectable()
export class PaymentsService {
    constructor(private httpClient: HttpClient, private categoryService: CategoryService, private accountUserService: AccountUserService) { }

    getPayments(accountId: number, budgetId: number, from: string, to: string, type: PaymentType) {
        if (budgetId == null) {
            return this.httpClient.get<Payment[]>(baseUrl + `accounts/${accountId}/payments?from=${from}&to=${to}&type=${type}`);
        } else {
            return this.httpClient.get<Payment[]>(baseUrl + `accounts/${accountId}/budgets/${budgetId}/payments`);
        }
    }

    getPayment(accountId: number, paymentId: number) {
        return this.httpClient.get<Payment>(baseUrl + `accounts/${accountId}/payments/${paymentId}`);
    }

    getCategories(accountId: number) {
        return this.categoryService.getCategoryMap(accountId);
    }

    getUsers(accountId: number) {
        return this.accountUserService.getUserMap(accountId);

    }

    update(accountId: number, paymentId: number, payment: Payment) {
        return this.httpClient.put<Payment>(baseUrl + `accounts/${accountId}/payments/${paymentId}`, payment);
    }
}
