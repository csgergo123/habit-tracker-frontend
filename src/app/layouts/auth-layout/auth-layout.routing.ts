import { LoginGuard } from "./login.guard";
import { Routes } from "@angular/router";

import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";

export const AuthLayoutRoutes: Routes = [
  { path: "login", canActivate: [LoginGuard], component: LoginComponent },
  { path: "register", canActivate: [LoginGuard], component: RegisterComponent },
];
