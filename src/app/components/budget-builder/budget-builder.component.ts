import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { BudgetService } from 'src/app/services/budget/budget.service';
import { BudgetDto } from 'src/app/services/budget/budgetDto';
import { Category } from 'src/app/services/categories/category';
import { CategoryService } from 'src/app/services/categories/category.service';

@Component({
    selector: 'budget-builder',
    templateUrl: './budget-builder.component.html',
    styleUrls: ['./budget-builder.component.css'],
})
export class BudgetBuilderComponent implements OnInit {

    newBudget: BudgetDto;
    previousBudget: BudgetDto;
    currentBudgetId: number;
    previousBudgetId: number;
    categories: Category[];

    constructor(
        private route: ActivatedRoute,
        private budgetService: BudgetService,
        private categoryService: CategoryService,
        private accountService: AccountsService) {
    }

    ngOnInit() {
        this.previousBudgetId = 100;
        this.currentBudgetId = 0;

        this.route.paramMap.subscribe(next => {
            this.currentBudgetId = Number(next.get('budgetId'));
            this.previousBudgetId = this.budgetService.getPreviousBudget(this.currentBudgetId);
            this.initialize();
        });
    }

    private initialize() {

        this.accountService.getAccountObservable().subscribe(a => {
            this.categoryService.getCategories(a.id).subscribe(c => this.categories = c);
            this.budgetService.getBudgetObservable(this.previousBudgetId)
                .subscribe(budget => {
                    this.previousBudget = budget;
                }, error => {
                    console.error('some error occured')
                    console.error(error);
                });
                // TODO if previous budget exists populate new budget with previous values
                // add overall budget input field
                // add budget diff field 

                // if previous budget dont exists the let it be as is.
        });

    }
}
