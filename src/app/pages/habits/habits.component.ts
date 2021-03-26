import { Component, OnInit } from "@angular/core";
import { Habit } from "src/app/models/habit/entities/Habit";

import { HabitsService } from "./habits.service";

@Component({
  selector: "app-habits",
  templateUrl: "./habits.component.html",
  styleUrls: ["./habits.component.css"],
})
export class HabitsComponent implements OnInit {
  private habits: Habit[];

  constructor(private habitService: HabitsService) {}

  ngOnInit(): void {
    this.habitService.fetchHabits();
  }

  onFetchHabits() {
    this.habitService.fetchHabits();
  }
}
