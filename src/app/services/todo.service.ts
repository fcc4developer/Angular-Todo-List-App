import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoTitle = '';
  idForTodo = 4;
  beforeEditCache = '';
  filter = 'all';
  todos: Todo[] = [
    {
      id: 1,
      title: 'Task One',
      completed: false,
      editing: false
    },
    {
      id: 2,
      title: 'Task Two',
      completed: false,
      editing: false
    },
    {
      id: 3,
      title: 'Task Three',
      completed: false,
      editing: false
    }
  ];

  constructor() { }

  addTodo(todoTitle: string): void {
    if (todoTitle.trim().length === 0) {
      return;
    }

    this.todos.push({
      id: this.idForTodo,
      title: todoTitle,
      completed: false,
      editing: false
    });

    this.idForTodo++;
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  remainingTodos(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompletedTodo(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  clearComletedTodos(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  checkAllTodos(): void {
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked);
  }

  filteredTodos(): Todo[] {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }

    return this.todos;
  }

}
