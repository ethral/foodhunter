import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router){

  }



  isAuthenticated() {
    return this.authService.isAuthenticated();
}

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/signin']);
}
}


