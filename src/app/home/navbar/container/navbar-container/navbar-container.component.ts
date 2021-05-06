import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GIF } from 'src/app/meme/models/GIF.model';
import * as fromMeme from '../../../../meme/reducers';
import * as UIActions from '../../../../store/actions/ui.actions';

@Component({
  selector: 'app-navbar-container',
  templateUrl: './navbar-container.component.html',
  styleUrls: ['./navbar-container.component.scss']
})
export class NavbarContainerComponent implements OnInit {

  favorites$: Observable<GIF[]>;
  
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.favorites$ = this.store.select(fromMeme.selectAllFavorites);
  }

  toggle() {
    this.store.dispatch(UIActions.TOGGLE_SIDE_NAV());
  }

}
