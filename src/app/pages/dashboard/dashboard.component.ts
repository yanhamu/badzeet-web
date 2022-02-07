import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  previousBudgetId: number
  budgetId: number;
  followingBudgetId: number

  ngOnInit(): void {
    let params = this.route.snapshot.queryParams
    this.budgetId = params['budgetId'];
  }
}