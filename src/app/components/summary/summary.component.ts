import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { SummaryDto, SummaryService } from './summary.service';

@Component({
    selector: 'summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.css'],
    inputs: ['budgetId']
})
export class SummaryComponent implements OnInit {

    budgetId: number;
    summary: SummaryDto | undefined;

    constructor(private service: SummaryService, private accountService: AccountsService) { }

    async ngOnInit() {
        let account = await this.accountService.getAccount();

        this.summary = await this.service.get(this.budgetId, account.id).toPromise();
    }
}