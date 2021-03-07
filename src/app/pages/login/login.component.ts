import { Component, OnInit } from '@angular/core';
import {
  AuthClientService,
  LoginCredentials,
} from 'src/app/services/auth-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials: LoginCredentials = { username: '', password: '' };

  constructor(private authClient: AuthClientService) {}

  ngOnInit(): void {}

  login() {
    this.authClient
      .login(this.credentials)
      .subscribe((r) => console.log(r.token));
  }
}
