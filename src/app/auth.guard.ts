
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (sessionStorage.getItem('authenticated') !== 'true') {
      const password = prompt('Please enter the password:');
      if (password === 'IPS_Visualization_Contest_2024') {
        sessionStorage.setItem('authenticated', 'true');
        return true;
      } else {
        this.router.navigate(['/']);
        alert('Falsches Passwort!');
        return false;
      }
    } else {
      return true;
    }

  }
}
