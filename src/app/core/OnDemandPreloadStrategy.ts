import { EMPTY, Observable } from "rxjs";
import { OnDemandPreloadOptions, OnDemandPreloadService } from "./OnDemandPreloadService.service";
import { PreloadingStrategy, Route } from "@angular/router";

import { Injectable } from "@angular/core";
import { mergeMap } from "rxjs/operators";

// Setup to add strategy to app:
// @NgModule({
//     imports: [
//       RouterModule.forRoot(routes, {
//         preloadingStrategy: OnDemandPreloadStrategy
//       })
//     ],
//     exports: [RouterModule]
//   })
//   export class AppRoutingModule {}
// Usage:
// <a
//   [routerLink]="item.link"
//   class="nav-link"
//   (mouseover)="preloadBundle('heroes')"
//   >heroes</a
// >
// preloadBundle(routePath) {
//     this.preloadOnDemandService.startPreload(routePath);
//   }

@Injectable({ providedIn: 'root', deps: [OnDemandPreloadService] })
export class OnDemandPreloadStrategy implements PreloadingStrategy {
  private preloadOnDemand$: Observable<OnDemandPreloadOptions>;

  constructor(private preloadOnDemandService: OnDemandPreloadService) {
    this.preloadOnDemand$ = this.preloadOnDemandService.state;
  }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return this.preloadOnDemand$.pipe(
      mergeMap(preloadOptions => {
        const shouldPreload = this.preloadCheck(route, preloadOptions);
        return shouldPreload ? load() : EMPTY;
      })
    );
  }

  private preloadCheck(route: Route, preloadOptions: OnDemandPreloadOptions) {
    return (
      route.data &&
      route.data['preload'] &&
      [route.path, '*'].includes(preloadOptions.routePath) &&
      preloadOptions.preload
    );
  }
}