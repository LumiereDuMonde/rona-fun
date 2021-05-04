import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { MemeService } from "../meme.service";
import * as MemeActions from '../actions/meme.actions';
import * as fromMeme from '../reducers';
import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";


@Injectable({
    providedIn: 'root'
})

export class MemeEffects {
    constructor(private actions$: Actions,
        private memeService: MemeService,
        private store: Store) { }

    startGettingTrending$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(MemeActions.MEME_TRENDING_START),
            concatLatestFrom(() => this.store.select(fromMeme.selectMemeTotal)),
            exhaustMap(([action, x]) => this.memeService.getTrending(x).pipe(
                map((data, offset) => {
                    return MemeActions.MEME_TRENDING_FINISH({ data: data.data, pagination: data.pagination })
                }),
                catchError(
                    (error) =>
                        of(MemeActions.MEME_TRENDING_ERROR({ msg: error.message }))
                )
            ))
        );
    });

    clearThenSearch$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(MemeActions.MEME_CLEAR_ITEMS_THEN_SEARCH),
            map(x => {
                if (x.search.trim().length === 0) {
                    return MemeActions.MEME_TRENDING_START();
                }
                else {
                    return MemeActions.MEME_SET_SEARCH({ search: x.search })
                }
            })
        );
    });

    setSearchTerm$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(MemeActions.MEME_SET_SEARCH),
            map(x => MemeActions.MEME_SEARCH_START())
        );
    });

    startGettingSearch$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(MemeActions.MEME_SEARCH_START),
            concatLatestFrom(() => this.store.select(fromMeme.selectMemeAndTotalSearch)),
            exhaustMap(([action, x]) => this.memeService.getSearchTerm(x.total, x.term).pipe(
                map((data) => {
                    return MemeActions.MEME_SEARCH_FINISH({ data: data.data, pagination: data.pagination })
                }),
                catchError(
                    (error) =>
                        of(MemeActions.MEME_SEARCH_ERROR({ msg: error.message }))
                )
            ))
        );
    });

    decideToSearchAtStart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(MemeActions.MEME_DECIDE_TO_SEARCH),
            concatLatestFrom(() => this.store.select(fromMeme.selectMemeAndTotalSearch)),
            map(([action, x]) => {   
                if(action.isScroll) {
                    if(x.term.length > 0) {
                        return MemeActions.MEME_SEARCH_START();
                    } else {
                        return MemeActions.MEME_TRENDING_START();
                    }
                } else {
                    if (x.total > 0) {
                        return MemeActions.MEME_DECIDE_TO_SEARCH_FINISH();
                    } else {
                        if(x.term.length > 0) {
                            return MemeActions.MEME_SEARCH_START();
                        } else {
                            return MemeActions.MEME_TRENDING_START();
                        }                        
                    }
                }
            })
        );
    });   

}