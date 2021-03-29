import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, FormsModule],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LoadingSpinnerComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LoadingSpinnerComponent,
  ],
})
export class ComponentsModule {}
