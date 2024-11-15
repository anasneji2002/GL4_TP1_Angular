import { Component, inject } from '@angular/core';
import { Todo, TodoStatus } from '../model/todo';
import { TodoService } from '../service/todo.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService],
  standalone: true,
  imports: [FormsModule],
})
export class TodoComponent {
  private todoService = inject(TodoService);

  todos: Todo[] = [];
  todo = new Todo();
  editingTodo: Todo | null = null; // Track the todo being edited

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

  addTodo() {
    this.todoService.addTodo(this.todo);
    this.todo = new Todo();
  }
  
  editTodo(todo: Todo) {
    this.editingTodo = { ...todo };
    if (this.editingTodo) {
      const originalTodo = this.todos.find(t => t.id === this.editingTodo?.id);
      if (originalTodo) {
        this.todoService.updateTodo(originalTodo, this.editingTodo);
      }
      this.editingTodo = null; // Exit edit mode
    }
  }

  changeNextStatus(todo: Todo) {
    this.todoService.changeNextStatus(todo);
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }
}