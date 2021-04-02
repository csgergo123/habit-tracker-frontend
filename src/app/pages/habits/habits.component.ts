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
  color: string;

  constructor(
    private habitService: HabitsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.habitService.fetchHabitsToBeDone().subscribe((habits) => {
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

    // Format date from object to string
    form.value.startDate = this.habitService.formatDate(form.value.startDate);

    this.habitService.createHabit(form.value).subscribe(
      (habit) => {
        // If the new habit is after today, don't need to show it
        const habitStartDate = new Date(habit.startDate);
        const today = new Date();
        if (habitStartDate <= today) {
          this.habits.push(habit);
        }
      },
      (error) => {
        this.createHabitError = error.error.message;
      }
    );

    if (!this.createHabitError) {
      return true;
    }
    return false;
  }

  habitDone(habitId: number) {
    this.habitService.habitDone(habitId).subscribe(
      (result) => {
        console.log(result);
        // Remove the habit from habits array by id
        let removeIndex = this.habits
          .map(function (habit) {
            return habit.id;
          })
          .indexOf(habitId);
        this.habits.splice(removeIndex, 1);
      },
      (error) => {
        console.log(`Error during make done the habit. Error: ${error}`);
      }
    );
  }

  removeHabit(habitId: number) {
    this.habitService.removeHabit(habitId).subscribe(
      (result) => {
        console.log(result);
        // Remove the habit from habits array by id
        let removeIndex = this.habits
          .map(function (habit) {
            return habit.id;
          })
          .indexOf(habitId);
        this.habits.splice(removeIndex, 1);
      },
      (error) => {
        console.log(`Error during remove the habit. Error: ${error}`);
      }
    );
  }
}
