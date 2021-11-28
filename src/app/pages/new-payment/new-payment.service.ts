import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { NewPaymentDto } from "./new-payment";

const baseUrl = `${environment.baseUrl}/api/`;

@Injectable()
export class NewPaymentservice {
    constructor(private httpClient: HttpClient) { }

    createPayment(accountId: number, payment: NewPaymentDto) {
        return this.httpClient.post<NewPaymentDto[]>(baseUrl + `accounts/${accountId}/payments`, payment);
    }
}