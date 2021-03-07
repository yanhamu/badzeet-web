import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const loginUrl = 'api/login';

@Injectable({
  providedIn: 'root',
})
export class AuthClientService {
  constructor(private httpClient: HttpClient) {}

  login(credentials: LoginCredentials): Observable<LoginResult> {
    return this.httpClient
      .post<LoginResult>(loginUrl, credentials, {
        observe: 'response',
      })
      .pipe(
        map((x) => {
          if (x.status == 200) {
            return { ...x.body };
          }
          if (x.status == 401) {
            return { token: null, username: null, userid: null };
          }
          console.error('login failed');
          return { token: null, username: null, userid: null };
        })
      );
  }
}

export interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResult {
  token: string;
  userid: string;
  username: string;
}
