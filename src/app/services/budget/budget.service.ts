import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountsService } from '../accounts/accounts.service';
import { BudgetDto } from './budgetDto';

const baseUrl = `${environment.baseUrl}/api/`;

@Injectable()
export class BudgetService {
    constructor(
        private route: ActivatedRoute,
        private accountService: AccountsService,
        private httpClient: HttpClient) { }

    async getCurrentDates(): Promise<Interval> {
        let params = this.route.snapshot.queryParams;
        let budgetId = params['budgetId'];

        let account = await this.accountService.getAccount();
        return this.getInterval(budgetId, account.firstDayOfTheBudget);
    }

    async getBudget(budgetId: number): Promise<BudgetDto> {
        let account = await this.accountService.getAccount();
        return this.httpClient.get<BudgetDto>(baseUrl + `accounts/${account.id}/budgets/${budgetId}`).toPromise()
            .catch(e => {
                if (e.status == 404)
                    return null;
                else {
                    console.error(e);
                    return null;
                };
            })
    }

    getInterval(budgetId: number, firstDay: number): Interval {
        let year = Number(budgetId.toString().substring(0, 4));
        let month = Number(budgetId.toString().substring(4, 6));

        let start = new Date(year, month, firstDay);
        let end = new Date(year, month, firstDay);
        end.setMonth(end.getMonth() + 1);
        end.setMilliseconds(end.getMilliseconds() - 1);

        return { from: start, to: end };
    }

    async getBudgetInterval(budgetId: number): Promise<Interval> {
        let account = await this.accountService.getAccount();
        let year = Number(budgetId.toString().substring(0, 4));
        let month = Number(budgetId.toString().substring(4, 6));

        let start = new Date(year, month - 1, account.firstDayOfTheBudget);
        let end = new Date(year, month - 1, account.firstDayOfTheBudget);
        end.setMonth(end.getMonth() + 1);
        end.setMilliseconds(end.getMilliseconds() - 1);

        return { from: start, to: end };
    }
}

export interface Interval {
    from: Date;
    to: Date;
}