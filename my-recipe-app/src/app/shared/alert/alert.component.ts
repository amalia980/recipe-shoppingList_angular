//another way to display the error messages during the login. with DYNAMIC COMPONENTS, this will act as an dynamic component, it means it will not always be there(shows). an alert box wih the error message inside. it will look like an overlay on the entire screen.

import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  @Input() message: string;
  @Output() close = new EventEmitter<void>();//void because no data will be emitted

  //the alert box will close with the click on the button or the backdrop(outside the error box)
  onClose() {
    this.close.emit();
  }
}
