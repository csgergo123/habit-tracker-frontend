import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { Todo } from "src/app/models/todo/entities/Todo";
import { TodosService } from "./todos.service";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.css"],
})
export class TodosComponent implements OnInit {
  private todos: Todo[];
  isFetching = false;
  createTodoError = "";
  color: string;

  constructor(
    private todoService: TodosService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.todoService.fetchUndoneTodos().subscribe((todos) => {
      this.isFetching = false;
      this.todos = todos;
    });
  }

  async onFetchTodos() {
    this.isFetching = true;
    this.todoService.fetchTodos().subscribe((todos) => {
      this.isFetching = false;
      this.todos = todos;
    });
  }

  /* Create todo */

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }

  createTodo(form: NgForm) {
    // stop here if form is invalid
    if (!form.valid || form.invalid) {
      return;
    }

    // Format date from object to string
    form.value.issueDate = this.todoService.formatDate(form.value.issueDate);

    this.todoService.createTodo(form.value).subscribe(
      (todo) => {
        // If the new habit is after today, don't need to show it
        const todoIssueDate = new Date(todo.issueDate);
        const today = new Date();
        if (todoIssueDate <= today) {
          this.todos.push(todo);
        }
      },
      (error) => {
        this.createTodoError = error.error.message;
      }
    );

    if (!this.createTodoError) {
      return true;
    }
    return false;
  }

  todoDone(todoId: number) {
    this.todoService.todoDone(todoId).subscribe(
      (result) => {
        console.log(result);
        // Remove the todo from todos array by id
        let removeIndex = this.todos
          .map(function (todo) {
            return todo.id;
          })
          .indexOf(todoId);
        this.todos.splice(removeIndex, 1);
      },
      (error) => {
        console.log(`Error during make done the todo. Error: ${error}`);
      }
    );
  }

  removeTodo(todoId: number) {
    this.todoService.removeTodo(todoId).subscribe(
      (result) => {
        console.log(result);
        // Remove the todo from todos array by id
        let removeIndex = this.todos
          .map(function (todo) {
            return todo.id;
          })
          .indexOf(todoId);
        this.todos.splice(removeIndex, 1);
      },
      (error) => {
        console.log(`Error during remove the todo. Error: ${error}`);
      }
    );
  }
}
