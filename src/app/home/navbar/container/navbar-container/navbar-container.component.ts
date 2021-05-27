import { Component, NgZone, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { GIF } from 'src/app/meme/models/GIF.model';
import * as fromMeme from '../../../../meme/reducers';
import * as UIActions from '../../../../store/actions/ui.actions';
import * as fromApp from '../../../../store/app.reducer';
import * as fromAuth from '../../../../auth/reducers';


@Component({
  selector: 'app-navbar-container',
  templateUrl: './navbar-container.component.html',
  styleUrls: ['./navbar-container.component.scss']
})
export class NavbarContainerComponent implements OnInit {

  favorites$: Observable<GIF[]>;
  url$: Observable<string>;
  loggedIn$: Observable<boolean>;

  constructor(private store: Store, private ngZone: NgZone, private authService: AuthService) { }

  ngOnInit(): void {
    this.favorites$ = this.store.select(fromMeme.selectAllFavorites);
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

}
