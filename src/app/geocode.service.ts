import { Injectable } from "@angular/core";
import { MapsAPILoader } from "@agm/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { of } from "rxjs/observable/of";
import { filter, catchError, tap, map, switchMap } from "rxjs/operators";
import { fromPromise } from "rxjs/observable/fromPromise";

declare var google: any;

@Injectable()
export class GeocodeService {
  private geocoder: any;

  constructor() {}

  private initGeocoder() {
    console.log("Init geocoder!");
    this.geocoder = new google.maps.Geocoder();
  }

  geocodeAddress(location: string, callback) {
    let latlngmsg = new Array(3);
    console.log("Start Geocoding :");
    this.initGeocoder();
    this.geocoder.geocode({ address: location }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log("Geocoding complete ");
        latlngmsg[0] = results[0].geometry.location.lat();
        latlngmsg[1] = results[0].geometry.location.lng();
        latlngmsg[2] =
          " address : " +
          location +
          " lat : " +
          latlngmsg[0] +
          "lng : " +
          latlngmsg[1];
        callback(latlngmsg);
      } else {
        console.log(" Erreur - ", results, " & Statut - ", status);
      }
    });
    return latlngmsg;
  }

  // private waitForMapsToLoad(): Observable<boolean> {
  //   if (!this.geocoder) {
  //     return fromPromise(this.mapLoader.load()).pipe(
  //       tap(() => this.initGeocoder()),
  //       map(() => true)
  //     );
  //   }
  //   return of(true);
  // }

  // geocodeAddress(location: string): Observable<Location> {
  //   console.log("Start geocoding!");
  //   return this.waitForMapsToLoad().pipe(
  //     // filter(loaded => loaded),
  //     switchMap(() => {
  //       return new Observable(observer => {
  //         this.geocoder.geocode({ address: location }, (results, status) => {
  //           if (status == google.maps.GeocoderStatus.OK) {
  //             console.log("Geocoding complete!");
  //             observer.next({
  //               lat: results[0].geometry.location.lat(),
  //               lng: results[0].geometry.location.lng()
  //             });
  //           } else {
  //             console.log("Error - ", results, " & Status - ", status);
  //             observer.next({ lat: 0, lng: 0 });
  //           }
  //           observer.complete();
  //         });
  //       });
  //     })
  //   );
  // }
}