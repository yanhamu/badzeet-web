import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';

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
