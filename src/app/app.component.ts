import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private router: Router,
    private oidcSecurityService: OidcSecurityService) { }
  title = 'badzeet-web';
  isAuthenticated = false;

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe((isAuthenticated) => {
      console.log(isAuthenticated);
      this.isAuthenticated = isAuthenticated;

    });
  }

  logOut(): void {
    console.error("Logout not implemented");
    this.router.navigateByUrl('/');
  }
}
