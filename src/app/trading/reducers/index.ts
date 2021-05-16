import {
    createSelector,
    createFeatureSelector,
    combineReducers,
    Action,
} from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer';
import * as fromTrades from './trade.reducer';
import * as fromBook from './book.reducer';


export const tradingFeatureKey = 'trading';

export interface TradingState {
    [fromTrades.tradesFeatureKey]: fromTrades.State;    
    [fromBook.bookFeatureKey]: fromBook.State;
}

export interface State extends fromRoot.State {
    [tradingFeatureKey]: TradingState;    
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: TradingState | undefined, action: Action) {
    return combineReducers({
        [fromTrades.tradesFeatureKey]: fromTrades.reducer,  
        [fromBook.bookFeatureKey]: fromBook.reducer      
    })(state, action);
}

export const selectTradingState = createFeatureSelector<State, TradingState>(
    tradingFeatureKey
);


// trades
export const selectTradesState = createSelector(
    selectTradingState,
    (state) => state.trades
);

export const selectConnectedStatus = createSelector(
    selectTradesState,
    fromTrades.getConnectedStatus
);

export const selectTrades = createSelector(
    selectTradesState,
    fromTrades.getTrades
);

export const selectLastTrade = createSelector(
    selectTradesState,
    fromTrades.getLastTrade
);

//book
export const selectBookState = createSelector(
    selectTradingState,
    (state) => state.book
);

export const selectBookConnectedStatus = createSelector(
    selectBookState,
    fromBook.getConnectedStatus
);

export const selectAskBook = createSelector(
    selectBookState,
    fromBook.getAskBook
);

export const selectBidBook = createSelector(
    selectBookState,
    fromBook.getBidBook
);


