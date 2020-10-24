import { ConstantValues } from './Constants/constants';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityComponent } from './city/city.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountriesService } from './Constants/country';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    CityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyBXwPGCWw1mbLIWL_Ihbxbiq0XeuxSxDlY'
    })
  ],
  providers: [CountriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
