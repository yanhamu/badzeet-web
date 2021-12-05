import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
    inputs:['budgetId']
})
export class NavigationComponent implements OnInit {

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
    }

    budgetId: number = 123;
}