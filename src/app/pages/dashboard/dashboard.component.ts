import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";

// core components
import { chartOptions, parseOptions, colors } from "../../variables/charts";
import { HabitsService } from "../habits/habits.service";
import { TodosService } from "../todos/todos.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  numberOfHabits: number;
  numberOfHabitsToDo: number;
  numberOfhabitsDoneToday: number;
  numberOfTodos: number;
  numberOfUndoneTodos: number;
  numberOfTodosDoneToday: number;

  dailyHabitDonesForThisWeek;
  weeklyHabitDonesForThisMonth;

  habitChart: any;

  isFetching = false;

  public datasets: any;
  public data: any;
  public habitsChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  constructor(
    private habitService: HabitsService,
    private todoService: TodosService
  ) {}

  ngOnInit() {
    this.initStatNumbers();

    this.datasets = [
      this.dailyHabitDonesForThisWeek,
      this.weeklyHabitDonesForThisMonth,
    ];
    this.data = this.dailyHabitDonesForThisWeek;

    parseOptions(Chart, chartOptions());

    var chartHabits = document.getElementById("chart-habits");

    this.habitsChart = new Chart(chartHabits, {
      type: "line",
      options: this.habitChart.options,
      data: this.habitChart.data,
    });
  }

  public updatDaily() {
    this.habitChart.data.datasets[0].data = this.dailyHabitDonesForThisWeek.map(
      (data) => data.dones
    );
    this.habitChart.data.labels = this.dailyHabitDonesForThisWeek.map(
      (data) => data.day
    );
    this.habitsChart.update();
  }

  public updateWeekly() {
    this.habitChart.data.datasets[0].data = this.weeklyHabitDonesForThisMonth.map(
      (data) => data.dones
    );
    this.habitChart.data.labels = this.weeklyHabitDonesForThisMonth.map(
      (data) => data.week
    );
    this.habitsChart.update();
  }

  private initStatNumbers() {
    this.habitService.fetchHabits().subscribe((habits) => {
      this.numberOfHabits = habits.length;
    });
    this.habitService.fetchHabitsToBeDone().subscribe((habits) => {
      this.numberOfHabitsToDo = habits.length;
    });
    this.todoService.fetchTodos().subscribe((todos) => {
      this.numberOfTodos = todos.length;
    });
    this.todoService.fetchUndoneTodos().subscribe((todos) => {
      this.numberOfUndoneTodos = todos.length;
    });

    this.habitService
      .getDailyHabitDonesForThisWeek()
      .subscribe((dailyHabitDones) => {
        this.dailyHabitDonesForThisWeek = dailyHabitDones;
        this.updatDaily();
      });
    this.habitService
      .getWeeklyHabitDonesForThisMonth()
      .subscribe((weeklyHabitDone) => {
        this.weeklyHabitDonesForThisMonth = weeklyHabitDone;
      });

    this.habitChart = {
      options: {
        scales: {
          yAxes: [
            {
              gridLines: {
                color: colors.gray[900],
                zeroLineColor: colors.gray[900],
              },
              ticks: {
                callback: function (value) {
                  return value % 1 == 0 ? value : "";
                },
              },
            },
          ],
        },
      },
      data: {
        labels: [],
        datasets: [
          {
            label: "Done habits",
            data: [],
          },
        ],
      },
    };
  }
}
