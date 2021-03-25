import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  invalidLogin: boolean;
  isLoading = false;
  error = "";

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  ngOnDestroy() {}

  signIn(form: NgForm) {
    // stop here if form is invalid
    if (!form.valid || form.invalid) {
      return;
    }

    this.isLoading = true;

    this.authService.login(form.value).subscribe(
      (result) => {
        this.router.navigate(["/"]);
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
