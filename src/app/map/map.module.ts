import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { MapComponent } from './map.component';
import { MapPresentationComponent } from './map-presentation/map-presentation.component';
import { MapRoutingModule } from './map-routing.module';
import { NgModule } from '@angular/core';

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
export class MapModule {}
