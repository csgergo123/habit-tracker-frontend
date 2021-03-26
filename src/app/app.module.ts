import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";

import { AuthService } from "src/app/auth/auth.service";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { LoadingSpinnerComponent } from "src/shared/loading-spinner/loading-spinner.component";
import { AuthGuard } from "./layouts/admin-layout/auth.guard";
import { HabitsComponent } from './pages/habits/habits.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    LoadingSpinnerComponent,
    HabitsComponent,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
