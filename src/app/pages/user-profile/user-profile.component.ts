import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { User } from "src/app/models/user/entities/User";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  public user: User;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.currentUser;
  }
}
