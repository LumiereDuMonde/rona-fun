import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';
import { MapPresentationComponent } from './map-presentation/map-presentation.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [MapComponent, MapPresentationComponent],
  imports: [
    CommonModule,
    CoreModule,
    MapRoutingModule,
    GoogleMapsModule,
    GooglePlaceModule
  ]
})
export class MapModule { }
