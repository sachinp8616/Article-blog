import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any | UrlTree> | Promise<any | UrlTree> | any | UrlTree {
    const loggedIn: any = localStorage.getItem('loggedIn');
    if (!!loggedIn) {
      const user = JSON.parse(loggedIn);

      if (user.isAdmin) {
        this.router.navigate(['admin/dashboard']);
      } else {
        this.router.navigate(['dashboard']);
      }
    } else {
      return true;
    }
  }
}
