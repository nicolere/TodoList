import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnDestroy,
  ɵɵelementContainerStart
} from "@angular/core";
import { TodoListData } from "../dataTypes/TodoListData";
import { TodoItemData } from "../dataTypes/TodoItemData";

import { TodoService } from "../todo.service";
import { SpeechRecognitionService } from "../speechRecognition.service";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit, OnDestroy {
  @Input() newTodoInputValue: string;

  private data: TodoListData;
  private item: TodoItemData;

  private filter: string = "all";

  private speechData: string;

  // Icons
  faTrash = faTrash;
  faMicrophone = faMicrophone;
  faFlag = faFlag;

  constructor(
    private todoService: TodoService,
    private speechRecognitionService: SpeechRecognitionService
  ) {
    this.todoService
      .getTodoListDataObserver()
      .subscribe(data => (this.data = data));

    this.speechData = "";
  }
  ngOnInit() {}

  ngOnDestroy() {
    this.speechRecognitionService.DestroySpeechObject();
  }

  get label(): string {
    return this.data ? this.data.label : "";
  }

  get items(): TodoItemData[] {
    return this.data ? this.data.items : [];
  }

  // Ajout d'un item
  addItem() {
    // Création Todoitem
    this.item = { label: this.newTodoInputValue, isDone: false };

    // Ajout de cet item dans la liste
    this.todoService.appendItems(this.item);

    //Reset valeur input
    this.newTodoInputValue = "";
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

  //Retourne le nombre d'item complétés
  itemComplete() {
    return this.data.items.filter(item => item.isDone).length;
  }

  // Suppression de tous les items check
  checkedDelete() {
    this.data.items.forEach(item => {
      if (item.isDone) {
        this.todoService.removeItems(item);
      }
    });
  }

  // Modifie le filtre et retourne la liste correspondante
  itemsFiltered() {
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
      this.todoService.removeItems(item);
    });
  }

  activateSpeechAdd(): void {
    this.speechRecognitionService.record().subscribe(
      // listener
      value => {
        this.speechData = value;
        // console.log("val = " + value);
      },
      // error
      err => {
        console.log(err);
        if (err.error === "no-speech") {
          console.log("Redémarrage de l'écoute");
          this.activateSpeechAdd();
        }
      },
      // complete
      () => {
        console.log("Ecoute complète");
        console.log("speech final = " + this.speechData);
        if (this.speechData !== "") {
          this.item = { label: this.speechData, isDone: false };
          this.todoService.appendItems(this.item);
        } else {
          console.log("Input vide on n'ajoute rien");
        }
      }
    );
  }
}
