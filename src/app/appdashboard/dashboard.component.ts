import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { AuthService } from '../auth-service.service';
import { User } from '../users.Data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  user: User | null;

  constructor(private authService: AuthService) {
    this.user = this.authService.getLoggedInUser();
  }

  logout(): void {
    this.authService.logout();
  }
}
