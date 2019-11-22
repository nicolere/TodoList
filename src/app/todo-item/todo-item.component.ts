import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";

import { TodoItemData } from "../dataTypes/TodoItemData";
import { TodoService } from "../todo.service";
import { GeocodeService } from "../geocode.service";
import { NgxSmartModalService } from "ngx-smart-modal";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit, AfterViewInit {
  @Input() private item: TodoItemData;

  @ViewChild("newTextInput", { static: false }) private inputLabel: ElementRef;

  private _editionMode = false;
  lat = 51.678418;
  lng = 7.809007;

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
    private geocodeService: GeocodeService,
    public ngxSmartModalService: NgxSmartModalService
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {}

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
        this.geocodeService.geocodeAddress(ourCity, function(latlng) {
          // console.log(latlng);
          let lat = latlng[0];
          let lng = latlng[1];
          console.log(lat + " " + lng);
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
