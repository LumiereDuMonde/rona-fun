import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import * as AuthActions from './auth/actions/auth.actions';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import * as fromMeme from './meme/reducers';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy, OnInit { 
  mobileQuery: MediaQueryList;
  title = 'Rona fun';
  $favorites: Observable<number>;


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher, 
    private authService: AuthService, 
    private store: Store) {      
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.AUTOLOGIN_START());
    this.$favorites = this.store.select(fromMeme.selectFavoritesTotal);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(sideNav: MatSidenav) {
    sideNav.toggle();
    this.authService.logout();    
  }

}