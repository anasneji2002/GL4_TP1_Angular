import { v4 as uuidv4 } from 'uuid';
export type TodoStatus = 'waiting' | 'in progress' | 'done';
export class Todo {
  constructor(
    public id: string = uuidv4(), 
    public name = '',
    public content = '',
    public status: TodoStatus = 'waiting'
  ) {}
}
