import { AuthGuard } from "./auth.guard";
import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { HabitsComponent } from "src/app/pages/habits/habits.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: "habits",
    canActivate: [AuthGuard],
    component: HabitsComponent,
  },
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  {
    path: "user-profile",
    canActivate: [AuthGuard],
    component: UserProfileComponent,
  },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
];
