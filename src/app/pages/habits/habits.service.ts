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
        map((habits: Habit[]) => {
          habits.map((habit) => {
            habit.lightOrDark = this.lightOrDark(habit.color);
          });
          return habits;
        })
      );
  }

  fetchHabitsToBeDone(): Observable<Habit[]> {
    const httpOptions = this.getAuthHeader();
    return this.http
      .get<Habit[]>("http://localhost:8000/habits/to-be-done", httpOptions)
      .pipe(
        map((habits: Habit[]) => {
          habits.map((habit) => {
            habit.lightOrDark = this.lightOrDark(habit.color);
          });
          return habits;
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

  removeHabit(habitId: number) {
    const httpOptions = this.getAuthHeader();
    return this.http.delete(
      `http://localhost:8000/habits/${habitId}`,
      httpOptions
    );
  }

  private lightOrDark(color) {
    if (!color) {
      return "light";
    }

    // Variables for red, green, blue values
    var r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
      // If RGB --> store the red, green, blue values in separate variables
      color = color.match(
        /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
      );

      r = color[1];
      g = color[2];
      b = color[3];
    } else {
      // If hex --> Convert it to RGB: http://gist.github.com/983661
      color = +(
        "0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&")
      );

      r = color >> 16;
      g = (color >> 8) & 255;
      b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
      return "light";
    } else {
      return "dark";
    }
  }
}
