import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantValues } from "./constants";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor() { }

  allCountries(): any {
    return ConstantValues.city['states']
  }

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }
}
