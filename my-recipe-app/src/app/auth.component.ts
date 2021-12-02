//check authentication

import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthService, AuthResponseData } from "./auth.service";
import { AlertComponent } from "./shared/alert/alert.component";
import { PlaceHolderDirective } from "./shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponent implements OnDestroy{
  isLoginMode = true;
  isLoading = false;//for loading spinner
  errorMsg: string = null;//because in the beginning there is no error
  @ViewChild(PlaceHolderDirective, {static: false}) alertHost: PlaceHolderDirective;//alertHost is a place where we host our alert,  and its the type of PlaceholderDirective. so we get access to that directive we use in the template and we store that in alertHost

  private closeSub: Subscription;//close the alert box button

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
    ) { }

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

      //new method showing error
      this.showErrorAlert(errorMessage);
      this.isLoading = false;
  }
);

  form.reset();
  }

  //close the box the error message at login
  onCloseAlert() {
    this.errorMsg = null;//resetting the error, if it did not exist we can close it
  }

  //close the box the error message at login. make sure to unsubscribe the process. nothing should be rendering in the background
  ngOnDestroy() {
    if (this.closeSub) {//check if there is an active close subscription
      this.closeSub.unsubscribe();
    }
  }


  //show the error message login programmatically instead. within the code

  private showErrorAlert(message: string) {
    const alertCpmFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);//pass the type of the component

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();//clear anything that might have been rendered there before

    const componentRef = hostViewContainerRef.createComponent(alertCpmFactory);//this will create a new component in the alertCmpfactory

    componentRef.instance.message = message;//get properties from AlertComponent which are, close and message. now the error message text will be shown

    this.closeSub = componentRef.instance.close.subscribe(() => {//close method emitter
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }


}
