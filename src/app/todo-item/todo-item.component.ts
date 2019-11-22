import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef
} from "@angular/core";

import { TodoItemData } from "../dataTypes/TodoItemData";
import { TodoService } from "../todo.service";
import { GeocodeService } from "../geocode.service";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {
  @Input() private item: TodoItemData;

  @ViewChild("newTextInput", { static: false }) private inputLabel: ElementRef;

  private _editionMode = false;
  private _cityExists = false;

  // Icons
  faMapPin = faMapPin;

  private listCities: string[] = [
    "Madrid",
    "Barcelone",
    "Paris",
    "Londres",
    "Berlin",
    "Albi"
  ];

  constructor(
    private todoService: TodoService,
    private geocodeService: GeocodeService
  ) {}

  ngOnInit() {}

  get editionMode(): boolean {
    return this._editionMode;
  }

  set editionMode(e: boolean) {
    this._editionMode = e;
    requestAnimationFrame(() => this.inputLabel.nativeElement.focus);
  }

  get label(): string {
    return this.item.label;
  }

  set label(lab: string) {
    this.todoService.setItemsLabel(lab, this.item);
  }

  get isDone(): boolean {
    return this.item.isDone;
  }

  set isDone(done: boolean) {
    this.todoService.setItemsDone(done, this.item);
    console.log("modif isDone");
  }

  destroy() {
    this.todoService.removeItems(this.item);
  }

  // TODO : Méthodes show map dialog
  getLatLet() {
    this.listCities.some(city => {
      if (this.item.label.includes(city)) {
        // Coordonées GPS de la ville reconnue
        // TODO : afficher une map
        let ourCity = city;
        this.geocodeService.geocodeAddress(ourCity, function(latlng) {
          // console.log(latlng);
          console.log(
            "Position de: " +
              ourCity +
              " \nlat: " +
              latlng[0] +
              " lng: " +
              latlng[1]
          );
        });
      }
    });
  }

  //Test pour vérifier si ville présente dans notre liste Cities
  cityExists() {
    // console.log(this.listCities.some(elem => this.item.label.includes(elem)));
    return this.listCities.some(elem => this.item.label.includes(elem));
  }
}
