import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
@Injectable({ providedIn: "root" })
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    activatedRoute: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const accessToken = activatedRoute.params.accessToken;
    if (accessToken) {
      this.authService.storeAccessToken(accessToken);
    }
    const user = this.authService.currentUser;
    if (user) {
      return this.router.createUrlTree(["/dashboard"]);
    }

    return true;
  }
}
