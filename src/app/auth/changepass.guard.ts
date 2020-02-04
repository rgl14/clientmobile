import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

export const IS_CHANGE_PASS = 'isChangePass';

@Injectable({
  providedIn: 'root'
})
export class ChangepassGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (parseInt(localStorage.getItem(IS_CHANGE_PASS)) === 1) {
      this.router.navigate(['/changepassword']);
      return false;
    }
    return true;
  }
}
