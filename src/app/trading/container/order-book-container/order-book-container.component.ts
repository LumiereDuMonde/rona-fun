import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as BookActions from '../../actions/book.actions';
import * as fromTrading from '../../reducers';

@Component({
  selector: 'app-order-book-container',
  templateUrl: './order-book-container.component.html',
  styleUrls: ['./order-book-container.component.scss']
})
export class OrderBookContainerComponent implements OnInit, OnDestroy {
  askBook$: Observable<number[][]>;
  bidBook$: Observable<number[][]>;  

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.askBook$ = this.store.select(fromTrading.selectAskBook).pipe(debounceTime(100)); // 
    this.bidBook$ = this.store.select(fromTrading.selectBidBook).pipe(debounceTime(100));      
    this.store.dispatch(BookActions.BOOK_STARTING());
  }

  ngOnDestroy(): void {
    this.store.dispatch(BookActions.BOOK_ENDING());  
  }  

}
