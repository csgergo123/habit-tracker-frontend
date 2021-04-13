import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { environment as env } from "src/environments/environment";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  invalidRegister: boolean;
  isLoading = false;
  error = "";
  googleLoginUrl = `${env.backendUrl}/users/google`;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  ngOnDestroy() {}

  signUp(form: NgForm) {
    // stop here if form is invalid
    if (!form.valid || form.invalid) {
      return;
    }

    this.isLoading = true;

    this.authService.register(form.value).subscribe(
      (result) => {
        this.router.navigate(["/login"]);
        this.isLoading = false;
      },
      (error) => {
        this.invalidRegister = true;
        this.error = error.error.message;
        this.isLoading = false;
      }
    );
  }
}
