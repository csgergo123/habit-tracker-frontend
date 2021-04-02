import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
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
  numberOfTodos: number;
  numberOfUndoneTodos: number;
  isFetching = false;

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  constructor(
    private habitService: HabitsService,
    private todoService: TodosService
  ) {
    this.isFetching = true;
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
  }

  ngOnInit() {
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40],
    ];
    this.data = this.datasets[0];

    var chartOrders = document.getElementById("chart-orders");

    parseOptions(Chart, chartOptions());

    var ordersChart = new Chart(chartOrders, {
      type: "bar",
      options: chartExample2.options,
      data: chartExample2.data,
    });

    var chartSales = document.getElementById("chart-sales");

    this.salesChart = new Chart(chartSales, {
      type: "line",
      options: chartExample1.options,
      data: chartExample1.data,
    });
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}
