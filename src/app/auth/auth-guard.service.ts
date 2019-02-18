import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/signin']);
    }
    return this.authService.isAuthenticated();
  }

  canLoad(route: Route): Observable<any> | Promise<any> | boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/signin']);
    }
    return this.authService.isAuthenticated();
  }
}
