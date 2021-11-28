import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';

// export function configureAuth(oidcConfigService: OidcConfigService) {
//     return () => oidcConfigService.withConfig({
//         stsServer: environment.baseUrl,
//         redirectUrl: window.location.origin,
//         postLogoutRedirectUri: window.location.origin,
//         clientId: 'ng',
//         scope: 'openid profile api',
//         responseType: 'code',
//         silentRenew: true,
//         silentRenewUrl: `${window.location.origin}/silent-renew.html`,
//         logLevel: LogLevel.Warn,
//     });
// }

@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: environment.baseUrl,
            redirectUrl: window.location.origin,
            postLogoutRedirectUri: window.location.origin,
            clientId: 'ng',
            scope: 'openid profile api',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            logLevel: LogLevel.Debug
        }
    })],
    exports: [AuthModule],
})
export class AuthHttpConfigModule { }
