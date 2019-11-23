import { Injectable } from "@angular/core";
import { MapsAPILoader } from "@agm/core";
import { Observable } from "rxjs";
import { Subject } from "rxjs/Subject";
import { of } from "rxjs/observable/of";
import { fromPromise } from "rxjs/observable/fromPromise";
import { catchError, tap, map, switchMap } from "rxjs/operators";
import { Location } from "./location-model";

declare var google: any;

@Injectable()
export class GMapsService {
  private geocoder: any;

  constructor(private mapLoader: MapsAPILoader) {}

  private initGeocoder() {
    console.log("Init Geocoder !");
    this.geocoder = new google.maps.Geocoder();
  }

  geocodeAddress(location: string): Observable<Location> {
    this.initGeocoder();
    console.log("Start Geocoding of - ", location);
    return new Observable(observer => {
      this.geocoder.geocode({ address: location }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          console.log("Geocoding complete!");
          observer.next({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          });
        } else {
          console.log("Error - ", results, " & Status - ", status);
          observer.next({ lat: 0, lng: 0 });
        }
        observer.complete();
      });
    });
  }
}
