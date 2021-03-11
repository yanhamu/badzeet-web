import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const loginUrl = 'https://localhost:44373/api/login';

@Injectable({
  providedIn: 'root',
})
export class AuthClientService {
  constructor(private httpClient: HttpClient) {}

  login(credentials: LoginCredentials): Observable<LoginResult> {
    return this.httpClient.post<LoginResult>(loginUrl, credentials);
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
