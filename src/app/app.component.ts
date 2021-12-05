import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AccountsService } from './services/accounts/accounts.service';
import { NavigationService } from './services/navigations/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent {

  constructor(
    private router: Router,
    private oidcSecurityService: OidcSecurityService,
    private accountService: AccountsService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private datePipe: DatePipe) { }
  title = 'badzeet-web';
  isAuthenticated = false;
  accountId: number;
  budgetId: number;
  from: string;
  to: string;

  ngOnInit() {
    this.oidcSecurityService.checkAuth().toPromise()
      .then(({ isAuthenticated, userData, accessToken }) => {
        if (isAuthenticated) {
          this.isAuthenticated = isAuthenticated;
        } else {
          this.login();
        }

        this.accountService.getAccount()
          .then(a => {
            this.accountId = a.id;
            this.route.queryParams.subscribe(params => {

              let nullOrEmpty = (x: string) => x == null || x == '';

              this.budgetId = params['budgetId'];
              this.from = params['from'];
              this.to = params['to'];

              if (nullOrEmpty(params['budgetId']) && nullOrEmpty(params['from'])) {
                console.log('this needs setting');
                this.navigationService.getNavigation(this.accountId)
                  .then(result => {
                    this.from = this.datePipe.transform(result.from, 'yyyy-MM-dd');
                    this.to = this.datePipe.transform(result.to, 'yyyy-MM-dd');

                    this.router.navigate([], {
                      relativeTo: this.route,
                      queryParams: {
                        budgetId: result.budgetId,
                        from: this.from,
                        to: this.to
                      }
                    });
                  });
              }
            })
          })
      });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logOut(): void {
    console.error("Logout not implemented");
    this.router.navigateByUrl('/');
  }
}
