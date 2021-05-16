import { Action, createReducer, on } from '@ngrx/store';
import * as TradeActions from '../actions/trade.actions';
import { TradeState } from '../enums/tradeState.enum';
import { ITrade } from '../models/trade.model';

export const tradesFeatureKey = 'trades';

export interface State {
    connected: TradeState,
    trades: ITrade[],
    lastTrade: ITrade[]
};

const initialState: State = {
    connected: TradeState.DISCONNECTED,
    trades: [],
    lastTrade: []
};

const tradeReducer = createReducer(
    initialState,
    on(
        TradeActions.TRADE_STARTING,
        (state) => ({ ...state, connected: TradeState.CONNECTING }),
    ),
    on(
        TradeActions.TRADE_STARTED,
        (state) => ({ ...state, connected: TradeState.CONNECTED })
    ),
    on(
        TradeActions.TRADE_ENDED,
        (state) => ({ ...state, connected: TradeState.DISCONNECTED, trades: initialState.trades })
    ),
    on(
        TradeActions.TRADE_ENDING,
        (state) => ({ ...state, connected: TradeState.DISCONNECTING })
    ),
    on(
        TradeActions.TRADE_PAYLOAD,
        (state, action) => ({...state, lastTrade: [...action.trades]})  
    )
);

export function reducer(state: State | undefined, action: Action) {
    return tradeReducer(state, action);
}

export const getConnectedStatus = (state: State) => state.connected;
export const getTrades = (state: State) => state.trades;
export const getLastTrade = (state: State) => state.lastTrade;