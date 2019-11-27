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
import { GMapsService } from "../GMaps.service";
import { NgxSmartModalService, NgxSmartModalComponent } from "ngx-smart-modal";

import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { Location } from "../location-model";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {
  @Input() private item: TodoItemData;

  @ViewChild("newTextInput", { static: false }) private inputLabel: ElementRef;
  @ViewChild("mapModal", { static: false }) private modal: ElementRef;
  private _editionMode = false;
  location: Location;

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
    public ngxSmartModalService: NgxSmartModalService,
    private mapsService: GMapsService
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

  //Test pour vérifier si ville présente dans notre liste Cities
  cityExists() {
    // console.log(this.listCities.some(elem => this.item.label.includes(elem)));
    return this.listCities.some(elem => this.item.label.includes(elem));
  }

  // ! Dernière étape de dev : Finir la géolocalisation

  // TODO : Send Data to modal
  getLatLng() {
    this.listCities.some(city => {
      if (this.item.label.includes(city)) {
        // Coordonées GPS de la ville reconnue + son nom
        this.Geocode(city);
      }
    });
  }

  // openModal() {
  //   this.ngxSmartModalService.getModal("mapModal").open();
  // }

  // Geocoder
  Geocode(city: string) {
    this.mapsService
      .geocodeAddress(city)
      .then(function(result) {
        console.log(result);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
