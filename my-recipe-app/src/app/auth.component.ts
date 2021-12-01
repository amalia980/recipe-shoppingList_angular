//check authentication

import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService, AuthResponseData } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponent {
  isLoginMode = true;
  isLoading = false;//for loading spinner
  errorMsg: string = null;//because in the beginning there is no error

  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;//switch from login to signup
  }

onSubmit(form: NgForm) {
  if (!form.valid) {
    return;
  }
  const email = form.value.email;
  const password = form.value. password;

  let authObs: Observable<AuthResponseData>;//instead of copying the method, everything is on authObs. less space is taken

  this.isLoading = true;//will show the loading spinner
  if (this.isLoginMode) {
          authObs = this.authService.login(email, password);/*.subscribe(
            resData => {
          console.log(resData);
          this.isLoading = false;
        }, errorMessage => {
          console.log(errorMessage);
          this.errorMsg = errorMessage;
          this.isLoading = false;
      }
    );SAME CODE BELOW ON ELSE*/
  } else {
        authObs =  this.authService.signUp(email, password);
  }

    authObs.subscribe(
      resData => {
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      console.log(errorMessage);
      this.errorMsg = errorMessage;
      this.isLoading = false;
  }
);

  form.reset();
  }

  onCloseAlert() {
    this.errorMsg = null;//resetting the error, if it did not exist we can close it
  }

}
