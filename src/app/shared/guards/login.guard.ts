import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { 
        
    }

    canActivate(route: ActivatedRouteSnapshot) {
        // console.log('ex',this.authService.isTokenExpired())
        let name = localStorage.getItem('name');
        if (name!=null) {
            this.router.navigate(['/wfh']);
        }
        return false;
    }
}
