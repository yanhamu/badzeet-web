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

    getAllPayments(accountId: number, type: PaymentType) {
        return this.httpClient.get<Payment[]>(baseUrl + `accounts/${accountId}/payments?type=${type}`);
    }

    getPayments(accountId: number, from: Date, to: Date, type: PaymentType) {
        return this.httpClient.get<Payment[]>(baseUrl + `accounts/${accountId}/payments?from=${from.toISOString()}&to=${to.toISOString()}&type=${type}`);
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
