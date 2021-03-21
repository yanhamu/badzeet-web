import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  password: FormControl = new FormControl('', [Validators.required]);
  username: FormControl = new FormControl('', [Validators.required]);

  constructor(
    private authClient: AuthClientService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.authClient
      .login({ username: this.username.value, password: this.password.value })
      .subscribe(
        (response) => {
          this.userService.setUser({
            username: response.username,
            userid: response.userid,
            token: response.token,
          });
          this.router.navigate(['dashboard']);
        },
        (err) => {
          if (err.status == 403) {
            console.log('asdf');
            this.password.hasError;
            this.password.setErrors({
              password: 'invalid username or password',
            });
            this.password.markAllAsTouched();
            return;
          }
          console.error('component error');
          console.error(err);
        }
      );
  }
}
