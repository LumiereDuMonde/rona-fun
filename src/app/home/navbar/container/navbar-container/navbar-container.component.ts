import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { defer, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { GIF } from 'src/app/meme/models/GIF.model';
import * as fromMeme from '../../../../meme/reducers';
import * as UIActions from '../../../../store/actions/ui.actions';
import * as fromApp from '../../../../store/app.reducer';
import * as fromAuth from '../../../../auth/reducers';
import { RouteConfigLoadEnd, Router } from '@angular/router';


@Component({
  selector: 'app-navbar-container',
  templateUrl: './navbar-container.component.html',
  styleUrls: ['./navbar-container.component.scss']
})
export class NavbarContainerComponent implements OnInit, OnDestroy {

  favorites$: Observable<GIF[]> | null;
  url$: Observable<string>;
  loggedIn$: Observable<boolean>;
  sub: Subscription;


  constructor(private store: Store, private ngZone: NgZone, private authService: AuthService, private router: Router) { }


  ngOnInit(): void {

    // wait for the lazy loaded module to load before subscribing to favorites
    this.sub =  this.router.events.subscribe((
      event => {        
        if (event instanceof RouteConfigLoadEnd && event.route.path === 'meme') {
          this.favorites$ = this.store.select(fromMeme.selectAllFavorites);          
        }
      }));     
    
    this.url$ = this.store.select(fromApp.selectUrl);
    this.loggedIn$ = this.store.select(fromAuth.selectAuthLoggedIn);
  }

  toggle() {
    this.ngZone.run(() => {
      this.store.dispatch(UIActions.TOGGLE_SIDE_NAV());
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
