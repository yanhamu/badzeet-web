import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthClientService,
  LoginCredentials,
} from 'src/app/services/auth-client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials: LoginCredentials = { username: '', password: '' };

  constructor(
    private authClient: AuthClientService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.authClient.login(this.credentials).subscribe(
      response => {
        this.userService.setUser({
          username: response.username,
          userid: response.userid,
          token: response.token,
        });
        this.router.navigate(['dashboard']);
      },
      (err) => {
        console.error('component error');
        console.error(err);
      }
    );
  }
}
