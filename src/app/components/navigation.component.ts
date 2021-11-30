import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
    inputs:['budgetId']
})
export class NavigationComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    budgetId: number = 123;
}