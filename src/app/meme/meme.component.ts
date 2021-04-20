import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromMeme from './reducers';
import * as MemeActions from './actions/meme.actions';


@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.scss']
})
export class MemeComponent implements OnInit {


  constructor(private store: Store<fromMeme.State>) { }

  ngOnInit(): void {
    this.store.dispatch(MemeActions.MEME_TRENDING_START());
  }

}
