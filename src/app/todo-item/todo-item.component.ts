import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from "@angular/core";

import { TodoItemData } from "../dataTypes/TodoItemData";
import { TodoService } from "../todo.service";
import { NgxSmartModalService } from "ngx-smart-modal";
import { GMapsService } from "../GMaps.service";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { Location } from "../location-model";
import { GoogleMapsAPIWrapper } from "@agm/core";

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
  city: string;
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
    private mapsService: GMapsService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.location = {
      lat: 43.9333,
      lng: 2.15
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
    console.log("modif isDone");
  }

  destroy() {
    this.todoService.removeItems(this.item);
  }

  // TODO : Send Data to modal
  getLatLng() {
    this.listCities.some(city => {
      if (this.item.label.includes(city)) {
        // Coordonées GPS de la ville reconnue + son nom
        let ourCity = city;
        this.mapsService
          .geocodeAddress(ourCity)
          .subscribe((location: Location) => {
            // console.log(location);
            this.location = location;
            this.ref.detectChanges();
          });
      }
    });
    // this.ngxSmartModalService
    //   .getModal("mapModal")
    //   .onOpen.subscribe((modal: NgxSmartModalComponent) => {
    //     // console.log(modal.getData().myCity);
    //     console.log(modal.getData().location);
    //     // this.city = modal.getData().myCity;
    //     // this.location = modal.getData().myLocation;
    //   });
  }

  //Test pour vérifier si ville présente dans notre liste Cities
  cityExists() {
    // console.log(this.listCities.some(elem => this.item.label.includes(elem)));
    return this.listCities.some(elem => this.item.label.includes(elem));
  }
}
