import { Component, OnInit } from "@angular/core";
import { Habit } from "src/app/models/habit/entities/Habit";

import { HabitsService } from "../habits/habits.service";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"],
})
export class CalendarComponent implements OnInit {
  habits: Habit[];

  constructor(private habitService: HabitsService) {}

  ngOnInit(): void {
    this.habitService.fetchHabits().subscribe((habits) => {
      this.habits = habits;
    });
  }
}
