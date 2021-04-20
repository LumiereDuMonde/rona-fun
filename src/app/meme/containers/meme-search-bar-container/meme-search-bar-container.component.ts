import { Component, OnInit } from '@angular/core';
import * as fromMeme from '../../reducers';
import * as MemeActions from '../../actions/meme.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-meme-search-bar-container',
  templateUrl: './meme-search-bar-container.component.html'
})
export class MemeSearchBarContainerComponent implements OnInit {

  constructor(private store: Store<fromMeme.State>) { }

  ngOnInit(): void {
  }

  doSearch(search: string) {    
    this.store.dispatch(MemeActions.MEME_CLEAR_ITEMS_THEN_SEARCH({search}));
  }

}
