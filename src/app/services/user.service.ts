import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User = null;

  setUser(user: User) {
    this.user = user;
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    if (this.user != null) {
      return this.user;
    }

    const localStorageUser = window.localStorage.getItem('user');
    if (localStorageUser != null) {
      this.user = JSON.parse(localStorageUser);
    }

    return this.user;
  }

  logOut(): void {
    this.setUser(null);
  }
}

export interface User {
  userId: string;
  token: string;
}
