import * as AuthActions from './auth/actions/auth.actions';
import * as UIActions from './store/actions/ui.actions';
import * as fromApp from './store/app.reducer';

import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';

import { AuthService } from './auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { mediaQueryMatch } from 'subscribable-things';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Rona fun';

  toggle$ = this.store.select(fromApp.selectSideNavToggle);
  mediaQueryMatch$? = from(mediaQueryMatch('(max-width: 900px)')).pipe(
    withLatestFrom(this.toggle$),
    tap(([isMediaMatch, isToggled]) => {
      if(isToggled && !isMediaMatch) {
        this._ngZone.run(() => this.toggle());
      }
    }),
    map(([isMediaMatch]) => isMediaMatch)
  );
  route$: Observable<string>;
  @ViewChild('sideNav') snav: MatSidenav;

  constructor(private authService: AuthService, private store: Store, private _ngZone: NgZone) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.AUTOLOGIN_START());
    this.route$ = this.store.select(fromApp.selectUrl);
  }

  ngOnDestroy(): void {}

  logout() {
    this.authService.logout();
  }

  toggle() {
    this.store.dispatch(UIActions.TOGGLE_SIDE_NAV());
  }
}
