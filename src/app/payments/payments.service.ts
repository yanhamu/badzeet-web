import { HttpClient } from "@angular/common/http";
import { Payment } from "./payment";
import { Injectable } from '@angular/core';
import { Category } from "./category";
import { User } from "./user";

const paymentsUrl = 'https://localhost:44373/api/accounts/2/budgets/15/payments';
const baseUrl = 'https://localhost:44373/api/';

@Injectable()
export class PaymentsService {
    constructor(private httpClient: HttpClient) { }

    getPayments(accountId: number, budgetId: number) {
        return this.httpClient.get<Payment[]>(baseUrl + `accounts/${accountId}/budgets/${budgetId}/payments`);
    }

    getCategories(accountId: number) {
        return this.httpClient.get<Category[]>(baseUrl + `accounts/${accountId}/categories`);
    }

    getUsers(accountId:number){
        return this.httpClient.get<User[]>(baseUrl + `accounts/${accountId}/users`)
    }
}
