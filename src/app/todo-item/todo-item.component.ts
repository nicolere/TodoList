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
import { NgxSmartModalService } from "ngx-smart-modal";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import {} from "googlemaps";
declare var google: any;

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
  lat;
  lng;
  private finalResult: any[];

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
    public ngxSmartModalService: NgxSmartModalService
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

  // TODO : Send Data to modal
  getLatLng() {
    const geocoder = new google.maps.Geocoder();
    let finalRes: any[] = [];
    this.listCities.some(city => {
      if (this.item.label.includes(city)) {
        // Coordonées GPS de la ville reconnue + son nom
        let ourCity = city;
        geocoder.geocode({ address: ourCity }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            finalRes[0] = results[0].geometry.location.lat();
            finalRes[1] = results[0].geometry.location.lng();
            // console.log("dans if: " + finalRes); <-- Result OK
            // this.storeAddressResult(finalRes); <-- Don't work cf. method
          } else {
            console.log("Unable to find address: " + status);
          }
          // console.log("exter if: " + finalRes); <-- Results OK
        });
        // console.log("exter geocoder: " + finalRes); <-- Result empty
      }
    });
  }

  //Test pour vérifier si ville présente dans notre liste Cities
  cityExists() {
    // console.log(this.listCities.some(elem => this.item.label.includes(elem)));
    return this.listCities.some(elem => this.item.label.includes(elem));
  }

  // Store something undefined ....
  storeAddressResult(address: any[]) {
    this.finalResult.push(address);
    console.log("final result : " + this.finalResult);
  }
}
