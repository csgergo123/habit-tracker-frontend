import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { environment as env } from "src/environments/environment";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  invalidLogin: boolean;
  isLoading = false;
  error = "";
  googleLoginUrl = `${env.backendUrl}/users/google`;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (
      this.activatedRoute.snapshot.url[1] &&
      this.activatedRoute.snapshot.url[1].path === "failure"
    ) {
      this.error = "Error during Google login";
    }
  }

  ngOnDestroy() {}

  signIn(form: NgForm) {
    // stop here if form is invalid
    if (!form.valid || form.invalid) {
      return;
    }

    this.isLoading = true;

    this.authService.login(form.value).subscribe(
      (result) => {
        this.router.navigate(["/dashboard"]);
        this.isLoading = false;
      },
      (error) => {
        this.invalidLogin = true;
        this.error = error.error.message;
        this.isLoading = false;
      }
    );
  }
}
