import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthModule, LogLevel, OidcConfigService, OidcSecurityService } from 'angular-auth-oidc-client';
import { map, switchMap } from 'rxjs/operators';

export function configureAuth(oidcConfigService: OidcConfigService) {
    return () => oidcConfigService.withConfig({
        stsServer: 'https://localhost:44373',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'ng',
        scope: 'openid profile api',
        responseType: 'code',
        silentRenew: true,
        silentRenewUrl: `${window.location.origin}/silent-renew.html`,
        logLevel: LogLevel.Debug,
    });
}

@NgModule({
    imports: [AuthModule.forRoot()],
    providers: [
        OidcSecurityService,
        OidcConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: configureAuth,
            deps: [OidcConfigService, HttpClient],
            multi: true,
        },
    ],
    exports: [AuthModule],
})
export class AuthHttpConfigModule { }
