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
import { $ } from "protractor";

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
  public mapOpen = false;
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

  ngOnInit() {
    this.location = {
      lat: 43.9333,
      lng: 2.15,
      city: "Albi"
    };
  }

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
    // console.log("modif isDone");
  }

  destroy() {
    this.todoService.removeItems(this.item);
  }

  //Test pour vérifier si ville présente dans notre liste Cities
  cityExists() {
    // console.log(this.listCities.some(elem => this.item.label.includes(elem)));
    return this.listCities.some(elem => this.item.label.includes(elem));
  }

  //Localisation finie mais bug
  // TODO : Toggle "isDone" close the map -> Fix it

  getLatLng() {
    this.listCities.some(city => {
      if (this.item.label.includes(city)) {
        // Coordonées GPS de la ville reconnue + son nom
        this.Geocode(city);
      }
    });
    this.mapOpen = !this.mapOpen;
  }

  // Geocoder
  Geocode(city: string) {
    this.mapsService
      .geocodeAddress(city)
      .then(
        function(result) {
          // console.log(result);
          this.location = result;
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  }
}
