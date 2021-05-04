import { TestBed } from '@angular/core/testing';
import { MemeService } from '../meme.service';
import { Action, Store } from '@ngrx/store';
import { MemeEffects } from './meme.effect';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import * as MemeActions from '../actions/meme.actions';

describe('MemeEffects', () => {
  let effect: MemeEffects;
  let actions$ = new Observable<Action>();
  let memeService: any;
  let store: any;

  beforeEach(() => {


    memeService = jasmine.createSpyObj('MemeService', ['getTrending', 'getSearchTerm']);
    store = jasmine.createSpyObj('Store', ['select']);

    TestBed.configureTestingModule({
      providers: [
        MemeEffects,
        { provide: MemeService, useValue: memeService },
        provideMockActions(() => actions$),
        { provide: Store, useValue: store },
      ]
    });
    effect = TestBed.inject(MemeEffects);
  });

  it('can load instance', () => {
    expect(effect).toBeTruthy();
  });

  describe('Actions', () => {

    it('MEME_SET_SEARCH', () => {
      actions$ = of(MemeActions.MEME_SET_SEARCH({ search: 'dog' }));
      effect.setSearchTerm$.subscribe((result) => {
        expect(result).toEqual(MemeActions.MEME_SEARCH_START());
      });
    });

    describe('MEME_CLEAR_ITEMS_THEN_SEARCH', () => {
      it('has search term should call MEME_SET_SEARCH', () => {
        actions$ = of(MemeActions.MEME_CLEAR_ITEMS_THEN_SEARCH({ search: 'cat' }));
        effect.clearThenSearch$.subscribe((result) => {
          expect(result).toEqual(MemeActions.MEME_SET_SEARCH({ search: 'cat' }));
        });
      });

      it('no search term should call MEME_TRENDING_START', () => {
        actions$ = of(MemeActions.MEME_CLEAR_ITEMS_THEN_SEARCH({ search: '' }));
        effect.clearThenSearch$.subscribe((result) => {
          expect(result).toEqual(MemeActions.MEME_TRENDING_START());
        });
      });
    });

    describe('MEME_TRENDING_START', () => {
      beforeEach(() => {
        store.select.and.returnValue(of(2));
      });

      it('success', () => {
        actions$ = of(MemeActions.MEME_TRENDING_START());
        memeService.getTrending.and.returnValue(of({ data: [{ id: "1" }], pagination: { "total_count": 1956, "count": 1, "offset": 0 }, meta: { status: 200, msg: "OK", response_id: "hi" } }));
        effect.startGettingTrending$.subscribe((result) => {
          expect(result).toEqual(MemeActions.MEME_TRENDING_FINISH({ data: [{ id: "1" }] as any, pagination: { total_count: 1956, count: 1, offset: 0 } }));
        });
      });

      it('fail', () => {
        actions$ = of(MemeActions.MEME_TRENDING_START());
        memeService.getTrending.and.returnValue(throwError({ message: 'error' }));
        effect.startGettingTrending$.subscribe((result) => {
          expect(result).toEqual(MemeActions.MEME_TRENDING_ERROR({ msg: 'error' }));
        });
      });
    });

    describe('MEME_SEARCH_START', () => {
      it('success', () => {
        store.select.and.returnValue(of({ total: 1, term: 'dog' }));
        actions$ = of(MemeActions.MEME_SEARCH_START());
        memeService.getSearchTerm.and.returnValue(of({ data: [{ id: "1" }], pagination: { "total_count": 1956, "count": 1, "offset": 0 }, meta: { status: 200, msg: "OK", response_id: "hi" } }));
        effect.startGettingSearch$.subscribe((result) => {
          expect(result).toEqual(MemeActions.MEME_SEARCH_FINISH({ data: [{ id: "1" }] as any, pagination: { total_count: 1956, count: 1, offset: 0 } }));
        });
      });

      it('failure', () => {
        store.select.and.returnValue(of({ total: 1, term: 'dog' }));
        actions$ = of(MemeActions.MEME_SEARCH_START());
        memeService.getSearchTerm.and.returnValue(throwError({ message: 'error' }));
        effect.startGettingSearch$.subscribe((result) => {
          expect(result).toEqual(MemeActions.MEME_SEARCH_ERROR({ msg: 'error' }));
        });
      });
    });

    describe('MEME_DECIDE_TO_SEARCH', () => {
      it('Check if store has memes and a search term do nothing if it does at start of component', () => {
        store.select.and.returnValue(of({ total: 1, term: 'dog' }));
        actions$ = of(MemeActions.MEME_DECIDE_TO_SEARCH({isScroll:false}));
        effect.decideToSearchAtStart$.subscribe((result) => {
          expect(result).toEqual(MemeActions.MEME_DECIDE_TO_SEARCH_FINISH());
        });
      });

      it('Check if store has memes and a search term, scroll bar activated, get more', () => {
        store.select.and.returnValue(of({ total: 1, term: 'dog' }));
        actions$ = of(MemeActions.MEME_DECIDE_TO_SEARCH({isScroll:true}));
        effect.decideToSearchAtStart$.subscribe((result) => {
          expect(result).toEqual(MemeActions.MEME_SEARCH_START());
        });
      });      

      it('Check if store has search term but no memes, send action to clear/search', () => {
        store.select.and.returnValue(of({ total: 0, term: 'dog' }));
        actions$ = of(MemeActions.MEME_DECIDE_TO_SEARCH({isScroll:false}));
        effect.decideToSearchAtStart$.subscribe((result) => {
          expect(result).toEqual(MemeActions.MEME_SEARCH_START());
        });
      });

      it('Check if store has no search term but no memes, send action to clear/search', () => {
        store.select.and.returnValue(of({ total: 0, term: '' }));
        actions$ = of(MemeActions.MEME_DECIDE_TO_SEARCH({isScroll:false}));
        effect.decideToSearchAtStart$.subscribe((result) => {
          expect(result).toEqual(MemeActions.MEME_TRENDING_START());
        });
      });

      it('Check if store has no search term but memes, get more trending', () => {
        store.select.and.returnValue(of({ total: 1, term: '' }));
        actions$ = of(MemeActions.MEME_DECIDE_TO_SEARCH({isScroll:true}));
        effect.decideToSearchAtStart$.subscribe((result) => {          
          expect(result).toEqual(MemeActions.MEME_TRENDING_START());
        });
      });      
    });
  });

});
