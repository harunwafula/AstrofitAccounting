import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,  CanActivateFn,  Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
class AuthGuard {

  constructor(private auth : AuthService, 
    private router : Router) {

    }
  canActivate(
   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(!this.auth.isAuthenticated()){
      this.router.navigate(['auth/register']);
      return false;
    }
      return true;
    }
}


export const canActivate : CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthGuard).canActivate();
}

  

