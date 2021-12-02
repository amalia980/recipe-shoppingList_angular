//view container reference for showing the alert error message for login(programatically). its an object managed internally by Angular, which gives angular a reference, a pointer, to a place in the DOM. where it can interact. to get access to a view container reference is to create a helper directive, it can be named placeholder like this one.

import { Directive, ViewContainerRef } from "@angular/core";


@Directive({
  selector: '[appPlaceholder]'//as an attribute selector
})
export class PlaceHolderDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }//inject the view container ref. it will allow me to get info about about the place where I use the directive
}
