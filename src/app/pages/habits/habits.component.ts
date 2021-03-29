import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Habit } from "src/app/models/habit/entities/Habit";

import { HabitsService } from "./habits.service";

@Component({
  selector: "app-habits",
  templateUrl: "./habits.component.html",
  styleUrls: ["./habits.component.css"],
})
export class HabitsComponent implements OnInit {
  private habits: Habit[];
  isFetching = false;
  createHabitError = "";

  constructor(
    private habitService: HabitsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.habitService.fetchHabits().subscribe((habits) => {
      this.isFetching = false;
      this.habits = habits;
    });
  }

  async onFetchHabits() {
    this.isFetching = true;
    this.habitService.fetchHabits().subscribe((habits) => {
      this.isFetching = false;
      this.habits = habits;
    });
  }

  
  /* Create habit */

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  createHabit(form: NgForm) {
    // stop here if form is invalid
    if (!form.valid || form.invalid) {
      return;
    }

    console.log(form.value);
    this.habitService.createHabit(form.value).subscribe(
      (result) => {
        this.habits.push(result);
      },
      (error) => {
        this.createHabitError = error.error.message;
      }
    );
  }
}
