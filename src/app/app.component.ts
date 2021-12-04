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
  from: Date;
  to: Date;

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken }) => {
      if (isAuthenticated) {
        this.isAuthenticated = isAuthenticated;
      } else {
        this.login();
      }

      this.accountService.getAccount()
        .then(a => {
          this.accountId = a.id;
          console.log('getting current params');
          this.route.queryParams.subscribe(params => {
            if (params['budgetId'] == null || params['from'] == null) {
              this.navigationService.getNavigation(this.accountId)
                .then(result => {
                  this.router.navigate([], {
                    relativeTo: this.route,
                    queryParams: {
                      budgetId: result.budgetId,
                      from: this.datePipe.transform(result.from, 'yyyy-MM-dd'),
                      to: this.datePipe.transform(result.to, 'yyyy-MM-dd')
                    }
                  })
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
