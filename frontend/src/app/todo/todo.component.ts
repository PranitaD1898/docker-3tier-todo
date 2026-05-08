import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: any[] = [];
  newTodo: string = '';
  apiUrl = 'http://localhost:5000/api/todos';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      data => this.todos = data,
      error => console.error('Error loading todos:', error)
    );
  }

  addTodo() {
    if (this.newTodo.trim()) {
      this.http.post(this.apiUrl, { title: this.newTodo }).subscribe(
        () => {
          this.newTodo = '';
          this.loadTodos();
        },
        error => console.error('Error adding todo:', error)
      );
    }
  }

  deleteTodo(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(
      () => this.loadTodos(),
      error => console.error('Error deleting todo:', error)
    );
  }
}