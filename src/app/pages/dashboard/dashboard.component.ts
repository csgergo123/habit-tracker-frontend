import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";

// core components
import {
  chartOptions,
  parseOptions,
  colors,
  chartExample2,
} from "../../variables/charts";
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

    this.getHabitChart();

    this.datasets = [
      this.dailyHabitDonesForThisWeek,
      this.weeklyHabitDonesForThisMonth,
    ];
    this.data = this.dailyHabitDonesForThisWeek;

    var chartOrders = document.getElementById("chart-orders");

    parseOptions(Chart, chartOptions());

    /*var chartOrders = document.getElementById("chart-orders");

    var ordersChart = new Chart(chartOrders, {
      type: "bar",
      options: chartExample2.options,
      data: chartExample2.data,
    });*/

    var chartHabits = document.getElementById("chart-habits");

    this.habitsChart = new Chart(chartHabits, {
      type: "line",
      options: this.habitChart.options,
      data: this.habitChart.data,
    });
  }

  // public updateOptions() {
  //   this.habitsChart.data.datasets[0].data = this.data;
  //   this.habitsChart.update();
  // }

  public updatDaily() {
    this.habitChart.data.datasets[0].data = this.dailyHabitDonesForThisWeek;
    this.habitChart.data.labels = [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ];
    this.habitsChart.update();
  }

  public updateWeekly() {
    this.habitChart.data.datasets[0].data = this.weeklyHabitDonesForThisMonth;
    this.habitChart.data.labels = ["1", "2", "3", "4"];
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
        console.log("dailyHabitDones", dailyHabitDones);
        this.dailyHabitDonesForThisWeek = dailyHabitDones;
        this.updatDaily();
      });
    this.habitService
      .getWeeklyHabitDonesForThisMonth()
      .subscribe((weeklyHabitDone) => {
        this.weeklyHabitDonesForThisMonth = [1, 2, 3, 4];
        //this.habitChart.data.datasets[0].data = weeklyHabitDone;
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
                  return value;
                },
              },
            },
          ],
        },
      },
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Done habits",
            data: [0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },
    };
  }

  private getHabitChart() {}
}
