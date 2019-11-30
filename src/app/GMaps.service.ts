import { Injectable } from "@angular/core";
import { MapsAPILoader } from "@agm/core";
import { Location } from "./location-model";

declare var google: any;

@Injectable()
export class GMapsService {
  private geocoder: any;

  constructor(private mapLoader: MapsAPILoader) {
    this.mapLoader = mapLoader;
    this.mapLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  geocodeAddress(location: string): Promise<Location> {
    console.log("Start Geocoding of - ", location);
    return new Promise(
      function(resolve, reject) {
        this.geocoder.geocode({ address: location }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            console.log("Geocoding complete!");
            const obj: Location = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
              city: location
            };
            // Resolve notre object voulu
            resolve(obj);
          } else {
            console.log("Error - ", results, " & Status - ", status);
            // Reject le statut si erreur
            reject(status);
          }
        });
      }.bind(this)
    );
  }
}
