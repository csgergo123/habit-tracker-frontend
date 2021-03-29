import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-loading-spinner",
  template:
    '<div class="lds-ring"><div></div><div></div><div></div><div></div></div><div class="spinner_overlay"></div>',
  styleUrls: ["./loading-spinner.component.css"],
})
export class LoadingSpinnerComponent {
  constructor() {}
}
