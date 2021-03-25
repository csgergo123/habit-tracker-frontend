import { Component } from "@angular/core";

@Component({
  selector: "app-loading-spinner",
  template: '<div class="lds-ripple"><div></div><div></div></div>',
  styleUrls: ["./loading-component.css"],
})
export class LoadingSpinnerComponent {}
