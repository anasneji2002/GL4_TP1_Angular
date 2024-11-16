import { Component, inject } from '@angular/core';
import { Todo, TodoStatus } from '../model/todo';
import { TodoService } from '../service/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService],
  standalone: true,
  imports: [FormsModule,CommonModule],
})
export class TodoComponent {
  private todoService = inject(TodoService);

  todos: Todo[] = [];
  todo = new Todo();
  statuses: TodoStatus[] = ['waiting', 'in progress', 'done'];

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  constructor() {
    this.loadTodos();
  }

  loadTodos() {
    this.todos = this.todoService.getTodos();
  }

  getByStatus(status: TodoStatus) {
    return this.todoService.getByStatus(status);
  }
  getStatusClass(status: TodoStatus): string {
    switch (status) {
      case 'waiting':
        return 'bg-primary text-white';
      case 'in progress':
        return 'bg-warning text-dark';
      case 'done':
        return 'bg-success text-white';
      default:
        return '';
    }
  }
  addTodo() {
    this.todoService.addTodo(this.todo);
    this.todo = new Todo();
  }
  

  changeNextStatus(todo: Todo) {
    this.todoService.changeNextStatus(todo);
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }
}