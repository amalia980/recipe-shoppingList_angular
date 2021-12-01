import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
  kind : string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})

export class AuthService {

  //store the authenticated user as a BehaviourSubject, another type of subject
  user = new BehaviorSubject<User>(null);//has to have a starting value, null for example
  token: string = null;
  //setTimeOut auto logout
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {//get API key from firebase project settings
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyDtfWW1ieSnF5Rmx8P5D2ktHHUgHFtwd5w',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }//save user data for signing up
    ).pipe(catchError(this.handleError),
    tap(resData => {
      this.handleAuth(resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn)//+ before makes it into a number, the correct type cause its not a string
    })
    );
  }

  //send request to be able to login
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDtfWW1ieSnF5Rmx8P5D2ktHHUgHFtwd5w',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }//save user data for logging in
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuth(resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn)
    })
    );
  }

  //save user data for signup ang login
  private handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
    )
    {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new User(
        email,
        userId,
        token,
        expirationDate
      );
      this.user.next(user);

      //when the auto logout should kick in, meaning when the token should be expired
      this.autoLogout(expiresIn * 1000);


      //store the token where it can survive where it can survive page reloads + browser restarts. you can do this by cookies or local storage which is an API exposed by the browser to store simple key value pairs. we will use local storage
      localStorage.setItem('userData', JSON.stringify(user));//named key userData, store the user data in the key, convert data to a string
  }


  //AUTO LOGIN
  //to hinder us logging out when page is realoaded or browser restarted. as long as our token is still legit and not expired
  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: Date
    } = JSON.parse(localStorage.getItem('userData'));//checking if there is an existing user snapshot stored. retrieve data from the local storage "userData". parse to a string again
    if(!userData) {
      return;//we cant log the user in, there is no stored data
    }
      //there was a snapshot we could retrieve
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)//convert to Data object again
    );

    if (loadedUser.token) {//if its true. token is a getter, comes from user.model
      this.user.next(loadedUser);//we know we have a user with all the data loaded and the token is still valid. this is our logged in user. the AUTO LOGIN

      //new Data "userData is the future date" that is to come -(minus) the new Date(get the current time), its like a countdown as soon as you log in
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }


  //logout option
  logout() {
    this.user.next(null);//set our user subject to null. make sure the app treats the user as unauthenticated
    this.router.navigate(['/auth']);//redirect to auth, to make sure no matter how we are logged out we we always redirect the user. we are not stuck on some random component

    //clear the snapshot, the data, if the user logouts we have to clear everything
    localStorage.removeItem('userData');

    //check if we have an active timer
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  //AUTO LOGOUT
  //set a timer for auto log out
  autoLogout(expirationDuration: number) {
    setTimeout(() => {
     this.tokenExpirationTimer = this.logout();//calling the funtion for logging out
    }, 3000);//auto logout in 3 sec
  }

  //this is the actual method to handle the error. but the logic will be executed above. on line 29 and 40
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS': errorMessage = 'This email exists already';
        break;
        case 'EMAIL_NOT_FOUND': errorMessage = 'This email does not exist!';
        break;
        case 'INVALID_PASSWORD': errorMessage = 'This password is not correct';
        break;
      }
      return throwError(errorMessage);
  }
}
