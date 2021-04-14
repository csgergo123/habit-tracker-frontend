import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ClipboardModule } from "ngx-clipboard";
import { ColorPickerModule } from "ngx-color-picker";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ComponentsModule } from "src/app/components/components.module";
import { HabitsComponent } from "src/app/pages/habits/habits.component";
import { TodosComponent } from "src/app/pages/todos/todos.component";
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ComponentsModule,
    ColorPickerModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    HabitsComponent,
    TodosComponent,
  ],
})
export class AdminLayoutModule {}
