import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { Habit } from "src/app/models/habit/entities/Habit";
import { HabitsService } from "./habits.service";

@Component({
  selector: "app-habits",
  templateUrl: "./habits.component.html",
  styleUrls: ["./habits.component.css"],
})
export class HabitsComponent implements OnInit {
  public habits: Habit[];
  public isFetching = false;
  public createHabitError = "";
  public color: string;

  colorPicker;
  cpOutputFormat;
  cpToggle;

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
      this.createHabitError = "All fields are required.";
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

  habitDoneHelper(habitId: number, event) {
    Swal.fire({
      title: "Did you done this habit?",
      text: "This sets the habit done for today.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, I did it!",
      cancelButtonText: "No, I didn't do it.",
    }).then((result) => {
      if (result.value) {
        this.habitDone(habitId);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        event.target.checked = false;
      }
    });
  }

  private habitDone(habitId: number) {
    this.habitService.habitDone(habitId).subscribe(
      (result) => {
        console.log(result);
        // Remove the habit from habits array by id
        let removeIndex = this.habits
          .map(function (habit: Habit) {
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

  removeHabitHelper(habitId: number) {
    Swal.fire({
      title: "Do you want to remove this habit?",
      text: "This operation is not reversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, I want to keep it.",
    }).then((result) => {
      if (result.value) {
        this.removeHabit(habitId);
      }
    });
  }

  private removeHabit(habitId: number) {
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
