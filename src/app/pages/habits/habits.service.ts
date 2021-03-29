import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { Habit } from "src/app/models/habit/entities/Habit";

@Injectable({
  providedIn: "root",
})
export class HabitsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

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

  fetchHabits(): Observable<Habit[]> {
    const httpOptions = this.getAuthHeader();
    return this.http
      .get<Habit[]>("http://localhost:8000/habits", httpOptions)
      .pipe(
        map((habitsArray) => {
          console.log(habitsArray);
          return habitsArray;
        })
      );
  }

  fetchHabitsToBeDone(): Observable<Habit[]> {
    const httpOptions = this.getAuthHeader();
    return this.http
      .get<Habit[]>("http://localhost:8000/habits/to-be-done", httpOptions)
      .pipe(
        map((habitsArray) => {
          console.log(habitsArray);
          return habitsArray;
        })
      );
  }

  createHabit(habit: Habit): Observable<Habit> {
    const httpOptions = this.getAuthHeader();
    return this.http
      .post<Habit>("http://localhost:8000/habits", habit, httpOptions)
      .pipe(
        map((habit) => {
          console.log(habit);
          return habit;
        })
      );
  }

  habitDone(habitId: number) {
    const httpOptions = this.getAuthHeader();
    return this.http.post(
      `http://localhost:8000/habits/${habitId}/done`,
      null,
      httpOptions
    );
  }
}
