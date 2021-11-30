//use the same method in fetchRecipes for 'storeRecipes' now.we manipulate the outgoing requests the same way. we can use interceptors to type less, to not duplicate the same code all over again

import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { AuthService } from "../auth.service";
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{



  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

      /*only want to take 1 value the 'user' observable*/
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {

        if(!user) {//check if we dont have a user
          return next.handle(req);//return for the original requests, so we dont have to modify it
        }

        //we only want to add the token if we actually have a user

        const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)}) //clone our request and update it, pass an object where we can update the params by setting a 'new http params'. set and pass the name of the params we need & user.token is the value
        return next.handle(req);
      })
    );
  }
}
//the interceptor should add the token to all the outgoing requests.provide token in the app.module!!
