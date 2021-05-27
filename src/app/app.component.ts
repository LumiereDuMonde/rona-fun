import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import * as AuthActions from './auth/actions/auth.actions';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import * as UIActions from './store/actions/ui.actions';

import * as fromApp from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy, OnInit, AfterViewInit {
  mobileQuery: MediaQueryList;
  title = 'Rona fun';

  route$: Observable<string>;
  @ViewChild('sideNav') snav: MatSidenav;
  subscription: Subscription;


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private store: Store) {
    this.mobileQuery = media.matchMedia('(max-width: 900px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngAfterViewInit(): void {

    this.subscription = this.store.select(fromApp.selectSideNavToggle).subscribe((setOpen) => {
      if (this.snav) {
        this.snav.opened = setOpen;
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.AUTOLOGIN_START());
    this.route$ = this.store.select(fromApp.selectUrl);

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subscription?.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

  toggle() {
    this.store.dispatch(UIActions.TOGGLE_SIDE_NAV());
  }

}
