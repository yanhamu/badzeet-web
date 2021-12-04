import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const baseUrl = `${environment.baseUrl}/api/`;

@Injectable()
export class NavigationService {
    constructor(private httpClient: HttpClient) {
    }

    getNavigation(accountId: number) {
        return this.httpClient.get<NavigationResult>(baseUrl + `accounts/${accountId}/navigations`).toPromise();
    }
}

export interface NavigationResult {
    budgetId: number,
    from: Date,
    to: Date
}