import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
    inputs: ['budgetId']
})
export class NavigationComponent implements OnInit {

    constructor(private route: ActivatedRoute) { }

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
    }

    budgetId: number;
    previousBudgetId: number;
    followingBudgetId: number;
}