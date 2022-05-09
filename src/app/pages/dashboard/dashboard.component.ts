import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from 'src/app/services/budget/budget.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private budgetService: BudgetService) { }

  budgetId: number;
  hasBudget: boolean = false;

  ngOnInit() {
    this.route.queryParamMap.subscribe(value => {
      this.init(value);
    });
  }

  async init(value) {
    this.budgetId = Number(value.get("budgetId"));
    let budget = await this.budgetService.getBudget(this.budgetId);
    this.hasBudget = budget != null;
  }

  ngOnChanges(changes:SimpleChanges){
    this.ngOnInit();
}

  newBudget() {
    this.router.navigate(['/new-budget', { budgetId: this.budgetId }]);
  }

  setBudgetId(budgetId: number) {
    console.log("budget id was changed");
    this.budgetId = budgetId;
    this.router.navigate([], { relativeTo: this.route, queryParams: { budgetId: budgetId } });
  }
}