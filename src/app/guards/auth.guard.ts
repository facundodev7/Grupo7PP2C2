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


    //NO CAMBIAR  !!!!
    // si se cierra la sesión se redirige al inicio de la página
    // no hay que preocuparse, los botones que no se tengan que ver no se van a ver
    if (user) {
      return true; // usuario logueado
    } else {
      if (state.url !== '') {
        this.router.navigate(['']); // <- NO CAMBIAR :(
      }
      return false;
    }
  }
}
