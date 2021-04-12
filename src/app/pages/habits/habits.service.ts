import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AuthService } from "src/app/auth/auth.service";
import { Habit } from "src/app/models/habit/entities/Habit";
import { environment as env } from "src/environments/environment";

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
    return this.http.get<Habit[]>(`${env.backendUrl}/habits`, httpOptions);
  }

  fetchHabitsToBeDone(): Observable<Habit[]> {
    const httpOptions = this.getAuthHeader();
    return this.http.get<Habit[]>(
      `${env.backendUrl}/habits/to-be-done`,
      httpOptions
    );
  }

  createHabit(habit: Habit): Observable<Habit> {
    console.log("habit", habit);
    const httpOptions = this.getAuthHeader();
    return this.http.post<Habit>(
      `${env.backendUrl}/habits`,
      habit,
      httpOptions
    );
  }

  habitDone(habitId: number) {
    const httpOptions = this.getAuthHeader();
    return this.http.post(
      `${env.backendUrl}/habits/${habitId}/done`,
      null,
      httpOptions
    );
  }

  removeHabit(habitId: number) {
    const httpOptions = this.getAuthHeader();
    return this.http.delete(`${env.backendUrl}/habits/${habitId}`, httpOptions);
  }

  getDailyHabitDonesForThisWeek() {
    const httpOptions = this.getAuthHeader();
    return this.http.get<[]>(
      `${env.backendUrl}/habit-dones/daily/last-week`,
      httpOptions
    );
  }

  getWeeklyHabitDonesForThisMonth() {
    const httpOptions = this.getAuthHeader();
    return this.http.get<[]>(
      `${env.backendUrl}/habit-dones/weekly/last-month`,
      httpOptions
    );
  }

  formatDate(date: NgbDateStruct | null): string {
    return date ? date.year + "-" + date.month + "-" + date.day : "";
  }
}
