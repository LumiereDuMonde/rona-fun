import * as TradeActions from '../actions/trade.actions';

import { Action, createReducer, on } from '@ngrx/store';

import { ITrade } from '../models/trade.model';
import { TradeState } from '../enums/tradeState.enum';

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
        (state) => ({ ...state, connected: TradeState.CONNECTING, trades: initialState.trades, lastTrade: initialState.lastTrade }),
    ),
    on(
        TradeActions.TRADE_STARTED,
        (state) => ({ ...state, connected: TradeState.CONNECTED })
    ),
    on(
        TradeActions.TRADE_ENDED,
        (state) => ({ ...state, connected: TradeState.DISCONNECTED, trades: initialState.trades, lastTrade: initialState.lastTrade })
    ),
    on(
        TradeActions.TRADE_ENDING,
        (state) => ({ ...state, connected: TradeState.DISCONNECTING })
    ),
    on(
        TradeActions.TRADE_PAYLOAD,
        (state, action) => {
          if (state.connected == TradeState.CONNECTED) 
            return {...state, lastTrade: [...action.trades], trades: [...state.trades, ...action.trades]}
          else 
            return {...state};
        }  
    )
);

export function reducer(state: State | undefined, action: Action) {
    return tradeReducer(state, action);
}

export const getConnectedStatus = (state: State) => state.connected;
export const getTrades = (state: State) => state.trades;
export const getLastTrade = (state: State) => state.lastTrade;