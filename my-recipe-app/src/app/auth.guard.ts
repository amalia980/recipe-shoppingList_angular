//adding an auth guard to our logic so no one bypass the url path and get access to the authenticated page before logging in. auth guards allows us to tun logic before a route is loaded and we can deny access if a ceratin condition is not met.

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";


@Injectable({providedIn: 'root'})//this is technically a service, thats why we add injectable
export class AuthGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
    ): //has to return the below. boolean or promise or observable
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
       /*we want to return the status from authService. if user is authenticated or not*/
      return this.authService.user.pipe(
        take(1),//make sure we only take the latest user value and unsubscribe for the auth guard execution. it should stop. or else there will be an ongoing listener
        map(user => {
        const isAuth = !!user;//a trick, converts a truish value. like an object
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      }),
      /*tap(isAuth => {
        if (!isAuth) {
          this.router.navigate(['/auth]);
        }
      }) theres a better approach than this to be redirected to the login page when not logged in*/);
    }
}

//put canActivate in front of the routes we want to protect!!
