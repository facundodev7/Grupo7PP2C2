import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { getAuth } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      return true; // usuario logueado
    } else {
      if (state.url !== '/login') {
        this.router.navigate(['/login']);
      }
      return false;
    }
  }
}
