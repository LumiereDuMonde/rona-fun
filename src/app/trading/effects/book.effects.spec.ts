import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { TradingService } from '../trading.service';
import { BookEffects } from './book.effects';
import * as BookActions from '../actions/book.actions';

describe('BookEffects', () => {
  let effect: BookEffects;
  let actions$ = new Observable<Action>();
  let tradingServiceStub;

  beforeEach(() => {    
    tradingServiceStub = jasmine.createSpyObj('TradingService',['startBookFeed','stopBookFeed']);    
    TestBed.configureTestingModule({
      providers: [
        BookEffects,
        provideMockActions(() => actions$),
        { provide: TradingService, useValue: tradingServiceStub }
      ]
    });
    effect = TestBed.inject(BookEffects);
  });

  it('can load instance', () => {
    expect(effect).toBeTruthy();
  });

  describe('Actions', () => {
    it('BOOK_STARTING', () => {
      actions$ = of(BookActions.BOOK_STARTING);
      effect.connectBook$.subscribe(() => {
        expect(tradingServiceStub.startBookFeed).toHaveBeenCalled();
      });      
    });

    it('BOOK_ENDING', () => {
      actions$ = of(BookActions.BOOK_ENDING);
      effect.disconnectBook$.subscribe(() => {
        expect(tradingServiceStub.stopBookFeed).toHaveBeenCalled();
      });      
    });

  });
  
});
