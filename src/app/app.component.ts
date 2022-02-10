import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AccountsService } from './services/accounts/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(
    private router: Router,
    private oidcSecurityService: OidcSecurityService,
    private accountService: AccountsService,
    private route: ActivatedRoute) { }
    
  title = 'badzeet-web';
  isAuthenticated = false;
  accountId: number;
  budgetId: number;

  async ngOnInit() {
    let authResult = await this.oidcSecurityService.checkAuth().toPromise();
    if (authResult.isAuthenticated) {
      this.isAuthenticated = authResult.isAuthenticated;
    } else {
      this.login();
    }

    let account = await this.accountService.getAccount();
    this.accountId = account.id;
    let params = this.route.snapshot.queryParams
    let nullOrEmpty = (x: string) => x == null || x == '';
    this.budgetId = params['budgetId'];

    if (nullOrEmpty(params['budgetId'])) {
      this.budgetId = this.getCurrentBudgetId(account.firstDayOfTheBudget);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          budgetId: this.budgetId,
        }
      });
    }
  }

  private getCurrentBudgetId(firstDay: number): number {
    let today = new Date();
    if (today.getDate() >= firstDay) {
      return Number(today.getFullYear().toString() + (today.getMonth() + 1).toString().padStart(2, "0"));
    } else {
      today.setMonth(today.getMonth() - 1);
      return Number(today.getFullYear().toString() + (today.getMonth() + 1).toString().padStart(2, "0"));
    }
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logOut(): void {
    console.error("Logout not implemented");
    this.router.navigateByUrl('/');
  }
}
