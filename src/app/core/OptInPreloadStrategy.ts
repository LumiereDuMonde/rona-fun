import { EMPTY, Observable } from 'rxjs';
import { PreloadingStrategy, Route } from '@angular/router';

import { Injectable } from '@angular/core';

// Setup to add strategy in
// @NgModule({
//     imports: [
//       RouterModule.forRoot(routes, { preloadingStrategy: OptInPreloadStrategy })
//     ],
//     exports: [RouterModule]
//   })
//   export class AppRoutingModule {}

// must also add data attribute to route so it can check for it

// export const routes: Routes = [
//     {
//       path: 'dashboard',
//       loadChildren: () =>
//         import('app/dashboard/dashboard.module').then(m => m.DashboardModule),
//       data: { preload: true }
//     },


@Injectable({ providedIn: 'root' })
export class OptInPreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data && route.data['preload'] ? load() : EMPTY;
  }
}