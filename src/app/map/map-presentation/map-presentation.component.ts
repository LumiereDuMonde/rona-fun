import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { GoogleMap, MapMarker, MapMarkerClusterer } from '@angular/google-maps';

import { BehaviorSubject } from 'rxjs';
import { SubSink } from 'subsink';
import { TelemetryService } from '../telemetry.service';

export const myCssClass = (top, left, width, height): any => {
  return {
    width: width,
    height: height,
    top: top,
    left: left,
    transform: 'rotate(1440deg)'
  };
};

@Component({
  selector: 'app-map-presentation',
  templateUrl: './map-presentation.component.html',
  styleUrls: ['./map-presentation.component.scss']
})
export class MapPresentationComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  readonly maxZoom = 15;
  initialZoom = 7;
  currentZoom = this.initialZoom;
  intervalHandle: any;
  textIntervalHandle: any;

  options: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: true,
    disableDefaultUI: true,
    disableDoubleClickZoom: true
  };

  markerLocation: google.maps.LatLngLiteral | null;
  locationMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    clickable: false,
    opacity: 0.6
  };
  markerLocationIcon = {
    url: 'assets/img/tg.svg',
    anchor: new google.maps.Point(50, 65),
    origin: new google.maps.Point(0, 0),
    scaledSize: new google.maps.Size(100, 100)
  } as google.maps.Icon;
  iconIsVisible = false;
  hasError = false;
  hasLocation = false;
  flashText = {
    flash: false
  };

  zoom$ = new BehaviorSubject<number>(this.initialZoom);
  overlay$ = new BehaviorSubject<{ [klass: string]: any } | null>(null);
  data1: Array<string> | null;
  data2: Array<string> | null;
  data3: Array<string> | null;
  private subs = new SubSink();

  @ViewChild(GoogleMap) map: GoogleMap | undefined;
  @ViewChild('mc') mc: MapMarkerClusterer | undefined;
  @ViewChild('targeting') targetting: HTMLDivElement;
  @ViewChild('locationMarker') locationMarker: MapMarker | undefined;
  infoText: string = 'Searching...';

  constructor(private ts: TelemetryService) {}

  ngAfterViewInit(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.hasLocation = true;
        const currentLocation = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        this.markerLocation = {
          lat: currentLocation.lat(),
          lng: currentLocation.lng()
        };

        if (this.map) {
          this.intervalHandle = setInterval(
            () => this.onInterval(currentLocation),
            4000
          );
          this.textIntervalHandle = setInterval(
            () => this.onTextInterval(),
            2000
          );
        }
      },
      (error) => {
        console.log('location error');
        console.log(error);
        this.hasError = true;
      },
      { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 }
    );
  }

  onInterval(currentLocation) {
    if (this.initialZoom === this.currentZoom) {
      this.map.panTo(currentLocation);
    }

    if (this.currentZoom <= this.maxZoom) {
      this.map.panTo(currentLocation);
      this.zoom$.next(++this.currentZoom);
    } else {
      this.iconIsVisible = true;
      clearInterval(this.intervalHandle);
      clearInterval(this.textIntervalHandle);
      this.ts.stop();
    }
  }

  onTextInterval() {
    if (this.currentZoom > this.maxZoom) {
      this.infoText = 'Drone strike set..';
    } else {
      this.infoText =
        this.currentZoom % 2 === 0 ? 'Searching...' : 'Enhance...';
    }
    this.flashText.flash = true;
  }

  ngOnInit(): void {
    this.subs.sink = this.ts.getData1().subscribe((result) => {
      this.data1 = [...result];
    });
    this.subs.sink =  this.ts.getData2().subscribe((result) => {
      this.data2 = [...result];
    });
    this.subs.sink = this.ts.getData3().subscribe((result) => {
      this.data3 = [...result];
    });
    this.ts.start();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    clearInterval(this.textIntervalHandle);
    clearInterval(this.intervalHandle);
  }
}
