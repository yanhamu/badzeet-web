import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { BudgetService } from 'src/app/services/budget/budget.service';
import { BudgetDto } from 'src/app/services/budget/budgetDto';
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
    categoryBudgets: CategoryBudgetDto[];
    budgetSum: number;
    availableBudget:number;
    diffBudget:number;

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
            this.categoryService.getCategories(a.id).subscribe(categories => {
                this.categoryBudgets = categories.map<CategoryBudgetDto>(c => { return { name: c.name, id: c.id, amount: 0 } });
                this.budgetService.getBudgetObservable(this.previousBudgetId)
                    .subscribe(budget => {
                        this.previousBudget = budget;
                        this.checkSum();
                    }, error => {
                        if (error.status == 404) {
                        } else {
                            console.log(error);
                        }
                        this.checkSum();
                    });
            });
        });
    }

    checkSum() {
        let s = 0;
        this.categoryBudgets.forEach(element => {
            s += element.amount;
        });
        this.budgetSum = s;
        this.diffBudget = this.availableBudget - this.budgetSum;
    }
}

export class CategoryBudgetDto {
    id: number;
    name: string;
    amount: number
}