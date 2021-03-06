import { AuthGuard } from "./auth.guard";
import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { HabitsComponent } from "src/app/pages/habits/habits.component";
import { TodosComponent } from "src/app/pages/todos/todos.component";
import { CalendarComponent } from "src/app/pages/calendar/calendar.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  {
    path: "habits",
    canActivate: [AuthGuard],
    component: HabitsComponent,
  },
  {
    path: "calendar",
    canActivate: [AuthGuard],
    component: CalendarComponent,
  },
  {
    path: "todos",
    canActivate: [AuthGuard],
    component: TodosComponent,
  },
  {
    path: "user-profile",
    canActivate: [AuthGuard],
    component: UserProfileComponent,
  },
];
