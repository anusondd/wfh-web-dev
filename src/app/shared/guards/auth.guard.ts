import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { 
        
    }

    canActivate(route: ActivatedRouteSnapshot) {
        // console.log('ex',this.authService.isTokenExpired())
        if (this.authService.isTokenExpired()) {
            this.router.navigate(['/login']);
        }
        return !this.authService.isTokenExpired()
    }
}
