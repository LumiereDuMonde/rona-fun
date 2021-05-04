import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GIF } from '../../models/GIF.model';
import * as fromMeme from '../../reducers';
import * as FavoritesActions from '../../actions/favorites.actions';
import * as MemeActions from '../../actions/meme.actions';

@Component({
  selector: 'app-meme-display-container',
  templateUrl: './meme-display-container.component.html'
})
export class MemeDisplayContainerComponent implements OnInit {
  
  $memeData: Observable<GIF[]>;
  $favorites: Observable<string[]>;
  $loading: Observable<boolean>;

  constructor(private store: Store<fromMeme.State>) { }

  ngOnInit(): void {
    this.$memeData = this.store.select(fromMeme.selectAllMemes);
    this.$favorites = this.store.select(fromMeme.selectFavoritesIdsAsStringArray);
    this.$loading = this.store.select(fromMeme.selectMemeLoading);
  }

  favoriteClicked(a: {meme: GIF, is_favorite: boolean}) {    
    if (a.is_favorite) {
      this.store.dispatch(FavoritesActions.FAVORITE_REMOVE({id: a.meme.id as string}))
    } else {
      this.store.dispatch(FavoritesActions.FAVORITE_ADD({data: a.meme}));
    }
  }

  fetchMore() {        
    this.store.dispatch(MemeActions.MEME_DECIDE_TO_SEARCH({isScroll: true}));
  }

}
