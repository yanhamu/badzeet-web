import { Component, OnInit, EventEmitter, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
    inputs: ['budgetId'],
    outputs: ['setBudgetId']
})
export class NavigationComponent implements OnInit {

    constructor() { }

    year: string;
    month: string;

    setBudgetId: EventEmitter<number> = new EventEmitter<number>();

    ngOnInit(): void {
        
        let year = Number(this.budgetId.toString().substring(0, 4));
        let month = Number(this.budgetId.toString().substring(4, 6));
        let current = new Date();

        current.setFullYear(year);
        current.setDate(1);
        current.setMonth(month - 1);

        current.setMonth(current.getMonth() - 1);
        this.previousBudgetId = Number(current.getFullYear().toString() + (current.getMonth() + 1).toString().padStart(2, "0"));

        current.setMonth(current.getMonth() + 2);
        this.followingBudgetId = Number(current.getFullYear().toString() + (current.getMonth() + 1).toString().padStart(2, "0"));

        this.year = year.toString();
        this.month = month.toString().padStart(2, "0");
    }

    ngOnChanges(changes:SimpleChanges){
        this.ngOnInit();
    }

    onPreviousBudgetClick(): void {
        this.setBudgetId.emit(this.previousBudgetId);
    }

    onNextBudgetClick(): void {
        this.setBudgetId.emit(this.followingBudgetId);
    }

    budgetId: number;
    previousBudgetId: number;
    followingBudgetId: number;
}