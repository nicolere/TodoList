import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  ViewChild
} from "@angular/core";

import { TodoItemData } from "../dataTypes/TodoItemData";
import { TodoService } from "../todo.service";

import { faMapPin } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {
  @Input() item: TodoItemData;

  // Icons
  faMapPin = faMapPin;

  constructor(private todoService: TodoService) {}

  ngOnInit() {}

  // Suppression de l'item itemRem
  removeItem(itemRem: TodoItemData) {
    // Suppression de l'item x dans notre liste
    this.todoService.removeItems(itemRem);
  }

  // Check tous les item avec le toggle-all
  toggleComplete(itemChoosed: TodoItemData) {
    //Check ou uncheck l'item
    this.todoService.setItemsDone(!itemChoosed.isDone, itemChoosed);
  }

  // TODO : Méthodes show map dialog
  openModal() {
    console.log("show Map dialog");
  }
}
