import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const baseUrl = `${environment.baseUrl}/api/`;

@Injectable()
export class SummaryService {
    constructor(private httpClient: HttpClient) { }

    get(budgetId: number, accountId: number): Observable<SummaryDto> {
        return this.httpClient.get<SummaryDto>(baseUrl + `accounts/${accountId}/budgets/${budgetId}/summary`);
    }

}

export interface SummaryDto {
    spend: number;
    budget: number;
    remainingBudget: number;
    remainingDailyBudget: number;
    pendingPayments: number;
    remainingDays: number
}