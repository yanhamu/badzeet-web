import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from 'src/app/services/budget/budget.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private budgetService: BudgetService) { }

    budgetId: number;
    hasBudget: boolean = false;

    async ngOnInit() {
        this.route.queryParamMap.subscribe(value => {
            if (value.has("budgetId")) {
                const budgetId = value.get("budgetId");
                this.router.navigate(['dashboard'], {
                    relativeTo: this.route,
                    queryParams: {
                      budgetId: budgetId,
                    }
                  });
            }
        });
    }
}