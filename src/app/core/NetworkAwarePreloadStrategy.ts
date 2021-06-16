import { EMPTY, Observable } from "rxjs";
import { PreloadingStrategy, Route } from "@angular/router";

import { Injectable } from "@angular/core";

export declare var navigator;

// Setup to add strategy to app:
// @NgModule({
//     imports: [
//       RouterModule.forRoot(routes, {
//         preloadingStrategy: NetworkAwarePreloadStrategy
//       })
//     ],
//     exports: [RouterModule]
//   })
//   export class AppRoutingModule {}

@Injectable({ providedIn: 'root' })
export class NetworkAwarePreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return this.hasGoodConnection() ? load() : EMPTY;
  }

  hasGoodConnection(): boolean {
    const conn = navigator.connection;
    if (conn) {
      if (conn.saveData) {
        return false; // save data mode is enabled, so dont preload
      }
      const avoidTheseConnections = ['slow-2g', '2g' /* , '3g', '4g' */];
      const effectiveType = conn.effectiveType || '';
      console.log(effectiveType);
      if (avoidTheseConnections.includes(effectiveType)) {
        return false;
      }
    }
    return true;
  }
}
