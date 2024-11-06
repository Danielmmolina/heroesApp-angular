import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { AuthService } from '../services/auth.service';
import { inject } from "@angular/core";



function checkAuthStatus(): boolean | Observable<boolean>{
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => {
        if( isAuthenticated ) {
          router.navigate(['./'])
        }
      }),
      map( isAuthenticated => !isAuthenticated)
    )
}

export const canActivateGuardAuth: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) => {

  return checkAuthStatus();
};

export const canMatchGuardAuth: CanMatchFn = ( route: Route, segments: UrlSegment[]) => {



  return checkAuthStatus();
}
