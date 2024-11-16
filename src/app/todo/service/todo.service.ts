import { Injectable, computed, inject, signal } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { Todo, TodoStatus } from '../model/todo';

let n = 1;
// set provided in to 
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private loggerService = inject(LoggerService);

  todos = signal<Todo[]>([]);
  waitingTodos = computed(() =>
    this.todos().filter((todo) => todo.status === 'waiting')
  );
  inProgressTodos = computed(() =>
    this.todos().filter((todo) => todo.status === 'in progress')
  );
  doneTodos = computed(() =>
    this.todos().filter((todo) => todo.status === 'done')
  );

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  constructor() {}

  /**
   * elle retourne la liste des todos
   *
   * @returns Todo[]
   */
  getTodos(): Todo[] {
    return this.todos();
  }

  /**
   *Elle permet d'ajouter un todo
   *
   * @param todo: Todo
   *
   */
  addTodo(todo: Todo): void {
    this.todos.update((todos) => [...todos, todo]);
  }

  /**
   * Delete le todo s'il existe
   *
   * @param todo: Todo
   * @returns boolean
   */
  deleteTodo(todo: Todo): boolean {
    const index = this.todos().indexOf(todo);
    if (index > -1) {
      // check how Js compare objects '!=='
      this.todos.update((todos) => todos.filter((t) => t !== todo));
      return true;
    }
    return false;
  }

  getNextStatus(todo: Todo): TodoStatus | null {
    if (todo.status === 'waiting') {
      return 'in progress';
    } else if (todo.status === 'in progress') {
      return 'done';
    }
    return null;
  }

  changeNextStatus(todo: Todo): void {
    const nextStatus = this.getNextStatus(todo);
    if (nextStatus) {
      this.todos.update((todos) =>
        todos.map((t) => (t === todo ? { ...t, status: nextStatus } : t))
      );
    }
  }

  getByStatus(status: TodoStatus): Todo[] {
    switch (status) {
      case 'waiting':
        return this.waitingTodos();
      case 'in progress':
        return this.inProgressTodos();
      case 'done':
        return this.doneTodos();
      default:
        return [];
    }
  }

  /**
   * Logger la liste des todos
   */
  logTodos() {
    this.loggerService.logger(this.todos);
  }
}