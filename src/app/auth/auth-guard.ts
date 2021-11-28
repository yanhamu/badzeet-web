import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { OidcSecurityService } from "angular-auth-oidc-client";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private securityService: OidcSecurityService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.securityService.isAuthenticated();
    }
}