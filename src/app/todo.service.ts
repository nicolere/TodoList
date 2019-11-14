import { Injectable } from "@angular/core";
import { TodoListData } from "./dataTypes/TodoListData";
import { Observable, BehaviorSubject } from "rxjs";
import { TodoItemData } from "./dataTypes/TodoItemData";

@Injectable()
export class TodoService {
  private todoListSubject = new BehaviorSubject<TodoListData>({
    label: "TodoList",
    // Load from localStorage
    items: []
  });

  constructor() {
    this.load();
  }

  getTodoListDataObserver(): Observable<TodoListData> {
    return this.todoListSubject.asObservable();
  }

  // Simulate UPDATE /items/id label
  setItemsLabel(label: string, ...items: TodoItemData[]) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next({
      label: tdl.label,
      items: tdl.items.map(I =>
        items.indexOf(I) === -1 ? I : { label, isDone: I.isDone }
      )
    });
    // Save pour LocalStorage
    this.save();
  }

  //Simulate UPDATE /items/id done
  setItemsDone(isDone: boolean, ...items: TodoItemData[]) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next({
      label: tdl.label,
      items: tdl.items.map(I =>
        items.indexOf(I) === -1 ? I : { label: I.label, isDone }
      )
    });
    // Save pour LocalStorage
    this.save();
  }

  // Simulate POST /items
  appendItems(...items: TodoItemData[]) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next({
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: [...tdl.items, ...items]
    });
    this.save();
  }

  // Simulate DELETE /items/id
  removeItems(...items: TodoItemData[]) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next({
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: tdl.items.filter(I => items.indexOf(I) === -1)
    });
    this.save();
  }

  load() {
    if (localStorage.getItem("todoList") !== null) {
      const tdl = JSON.parse(localStorage.getItem("todoList"));
      this.todoListSubject.next({
        label: tdl.label,
        items: tdl.items
      });
    }
  }

  save() {
    localStorage.setItem(
      "todoList",
      JSON.stringify(this.todoListSubject.getValue())
    );
  }
}
