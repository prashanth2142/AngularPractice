// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { USERS, User } from './users.Data';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUser: User | null = null;

  constructor(private router: Router) {}

  login(username: string): boolean {
    const user = USERS.find(u => u.username === username);

    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  getLoggedInUser(): User | null {
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}
