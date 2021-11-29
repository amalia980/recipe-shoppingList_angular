import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";
import { User } from "./user.model";

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

  //store the authenticated user as a Subject
  user = new Subject<User>();

  constructor(private http: HttpClient) { }

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
  private handleAuth(email: string, userId: string,token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const userData = new User(
        email,
        userId,
        token,
        expirationDate
      );
      this.user.next(userData);
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
