import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { Habit } from "src/app/models/habit/entities/Habit";

@Injectable({
  providedIn: "root",
})
export class HabitsService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  private getAuthHeader(): {
    headers: HttpHeaders;
  } {
    const accessToken = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      }),
    };
    return httpOptions;
  }

  fetchHabits() {
    const httpOptions = this.getAuthHeader();
    return this.http
      .get("http://localhost:8000/habits", httpOptions)
      .subscribe((habits) => {
        console.log(habits);
        return habits;
      });
  }
}
