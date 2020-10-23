import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CountriesService } from "../Constants/country";
import { MouseEvent } from "@agm/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from "@angular/common/http";

@Component({
  selector: "app-city",
  templateUrl: "./city.component.html",
  styleUrls: ["./city.component.scss"],
})
export class CityComponent implements OnInit {
  stateInfo: any = [];
  locationDetailsForm: FormGroup;
  locationId = null;
  userRole = null;
  submitted = false;
  countryInfo: any = [];
  cityInfo: any[] = [];
  countryValue: any;
  stateValue: any;
  cityValue: any;
  zoom: number = 8;

  // initial center position for the map
  lat: number = 0;
  lng: number = 0;
  constructor(
    private fb: FormBuilder,
    private country: CountriesService,
    private http: HttpClient
  ) {
    this.locationDetailsForm = this.fb.group({
      state: ["", Validators.required],
      city: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.getCountries();
    this.setForm();
    this.country.getPosition().then((pos) => {
      this.lat = pos.lat;
      this.lng = pos.lng;
    });
  }

  setForm() {}

  get f() {
    return this.locationDetailsForm.controls;
  }

  getCountries() {
    this.stateInfo = this.country.allCountries();
  }

  getlatlng() {
    const addr = JSON.stringify(this.locationDetailsForm.value);
    return this.http
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=" + ${addr}&key=AIzaSyBXwPGCWw1mbLIWL_Ihbxbiq0XeuxSxDlY`
      )
      .subscribe((res) => {
        res.results.map((data) => {
          this.lat = data.geometry.location.lat;
          this.lng = data.geometry.location.lng;
        })
      });
  }

  onChangeState(stateValue) {
    this.cityInfo = this.stateInfo.find((i) => i.state == stateValue).districts;
    this.stateValue = stateValue;
  }

  onChangeCity(cityValue) {
    this.cityValue = cityValue;
    this.addLocation()
  }

  addLocation() {
    this.submitted = true;
    if (this.locationDetailsForm.valid) {
      this.getlatlng();
    }
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  }
  ]


}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
