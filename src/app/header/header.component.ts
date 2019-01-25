import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) { }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
