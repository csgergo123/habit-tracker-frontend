import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { Todo } from "src/app/models/todo/entities/Todo";
import { environment as env } from "src/environments/environment";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: "root",
})
export class TodosService {
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

  fetchTodos(): Observable<Todo[]> {
    const httpOptions = this.getAuthHeader();
    return this.http.get<Todo[]>(`${env.backendUrl}/todos`, httpOptions);
  }

  fetchUndoneTodos(): Observable<Todo[]> {
    const httpOptions = this.getAuthHeader();
    return this.http.get<Todo[]>(
      `${env.backendUrl}/todos/undones`,
      httpOptions
    );
  }

  createTodo(todo: Todo): Observable<Todo> {
    const httpOptions = this.getAuthHeader();
    if (!todo.done) {
      todo.done = 0;
    }

    return this.http.post<Todo>(`${env.backendUrl}/todos`, todo, httpOptions);
  }

  todoDone(todoId: number) {
    const httpOptions = this.getAuthHeader();
    return this.http.put(
      `${env.backendUrl}/todos/${todoId}`,
      { done: 1 },
      httpOptions
    );
  }

  removeTodo(todoId: number) {
    const httpOptions = this.getAuthHeader();
    return this.http.delete(`${env.backendUrl}/todos/${todoId}`, httpOptions);
  }

  formatDate(date: NgbDateStruct | null): string {
    return date ? date.year + "-" + date.month + "-" + date.day : "";
  }
}
