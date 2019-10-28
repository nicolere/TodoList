import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { TodoListData } from "../dataTypes/TodoListData";
import { TodoItemData } from "../dataTypes/TodoItemData";
import { TodoService } from "../todo.service";

import { faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  @Input() newTodoInputValue: string;

  private data: TodoListData;
  private item: TodoItemData;

  private filter: string = "all";
  faTrash = faTrash;

  constructor(private todoService: TodoService) {
    this.todoService
      .getTodoListDataObserver()
      .subscribe(data => (this.data = data));
  }
  ngOnInit() {}

  get label(): string {
    return this.data ? this.data.label : "";
  }

  get items(): TodoItemData[] {
    return this.data ? this.data.items : [];
  }

  // Ajout d'un item
  addItem() {
    // Création Todoitem + test input vide
    this.item = { label: this.newTodoInputValue, isDone: false };

    // Ajout de cet item dans la liste
    this.todoService.appendItems(this.item);

    //Reset valeur input
    this.newTodoInputValue = "";
  }

  // Suppression d'un item
  removeItem(item: TodoItemData) {
    // Suppression de l'item x dans notre liste
    this.todoService.removeItems(item);

    //Affichage test retours
    // console.log(this.data.items);
  }

  // Check tous les items d'un coup
  toggleAllItems() {
    this.allCompleted()
      ? this.data.items.forEach(item => {
          this.todoService.setItemsDone(false, item);
        })
      : this.data.items.forEach(item => {
          this.todoService.setItemsDone(true, item);
        });
  }

  // Retourne un booléen pour vérifier si tous items check
  allCompleted() {
    return (
      this.data.items.length ===
      this.data.items.filter(item => item.isDone).length
    );
  }

  // Retourne le nombre d'items restants (uncheck)
  itemLeft() {
    return (
      this.data.items.length -
      this.data.items.filter(item => item.isDone).length
    );
  }

  // Suppression de tous les items check
  checkedDelete() {
    this.data.items.forEach(item => {
      if (item.isDone) {
        this.removeItem(item);
      }
    });
  }

  // Modifie le filtre et retourne la liste correspondante
  ItemsFiltered() {
    if (this.filter === "all") {
      return this.data.items;
    } else if (this.filter === "active") {
      return this.data.items.filter(item => !item.isDone);
    } else {
      return this.data.items.filter(item => item.isDone);
    }
  }

  //Supprime tous les items
  removeAll() {
    // console.log("Supprime tout");
    this.data.items.forEach(item => {
      this.removeItem(item);
    });
  }
}
