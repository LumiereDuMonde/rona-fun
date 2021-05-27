import * as fromReducer from './trade.reducer';
import * as TradeActions from '../actions/trade.actions';
import { TradeState } from '../enums/tradeState.enum';
import { ITrade } from '../models/trade.model';

describe('Trade slice of the Trading feature key', () => {
    let newState: fromReducer.State;
    let initialState: fromReducer.State;
    beforeEach(() => {
        initialState = {
            connected: TradeState.DISCONNECTED,
            lastTrade: [],
            trades: []
        };
        newState = {...initialState};
    });

    describe('Actions', () => {
        it('unknown action', () => {
            const action = {
                type: 'Unknown',
            };
            const state = fromReducer.reducer(initialState, action);

            expect(state).toBe(initialState);
        });

        it('TRADE_STARTING sets connected', () => {
            newState.connected = TradeState.CONNECTING;
            const state = fromReducer.reducer(initialState, TradeActions.TRADE_STARTING());
            expect(state).toEqual(newState);
        });

        it('TRADE_STARTED sets connected', () => {
            newState.connected = TradeState.CONNECTED;
            const state = fromReducer.reducer(initialState, TradeActions.TRADE_STARTED());
            expect(state).toEqual(newState);
        });   
        
        it('TRADE_ENDED sets connected and resets trades', () => {
            newState.connected = TradeState.DISCONNECTED;
            const state = fromReducer.reducer(initialState, TradeActions.TRADE_ENDED());
            expect(state).toEqual(newState);
        });

        it('TRADE_ENDING sets connected', () => {
            newState.connected = TradeState.DISCONNECTING;
            const state = fromReducer.reducer(initialState, TradeActions.TRADE_ENDING());
            expect(state).toEqual(newState);
        }); 
        
        it('TRADE_PAYLOAD adds to trades and sets last trade', () => {
            initialState.trades = [{
                misc: "",
                orderType: "l",
                price: 5541.20000,
                side: "s",
                time: 1534614057.321597,
                volume: 0.15850568
              }];
            newState.lastTrade = [{
                misc: "",
                orderType: "m",
                price: 5542.20000,
                side: "s",
                time: 1534614057.321598,
                volume: 0.25850568
              }];
            newState.trades = [{
                misc: "",
                orderType: "l",
                price: 5541.20000,
                side: "s",
                time: 1534614057.321597,
                volume: 0.15850568
              },
              {
                misc: "",
                orderType: "m",
                price: 5542.20000,
                side: "s",
                time: 1534614057.321598,
                volume: 0.25850568
              }             
            ];
            const state = fromReducer.reducer(initialState, TradeActions.TRADE_PAYLOAD({
                trades: [{
                    misc: "",
                    orderType: "m",
                    price: 5542.20000,
                    side: "s",
                    time: 1534614057.321598,
                    volume: 0.25850568
                  }]                
            }));
            expect(state).toEqual(newState);
        });           
        
    });
    
    describe('Getters', () => {
        it('getConnectedStatus', () => {
            newState.connected = TradeState.CONNECTED;
            expect(fromReducer.getConnectedStatus(newState)).toBe(TradeState.CONNECTED);
        });

        it('getTrades', () => {
            const trades: ITrade[] = [{
                misc: "",
                orderType: "l",
                price: 5541.20000,
                side: "s",
                time: 1534614057.321597,
                volume: 0.15850568
              },
              {
                misc: "",
                orderType: "m",
                price: 5542.20000,
                side: "s",
                time: 1534614057.321598,
                volume: 0.25850568
              }             
            ];
            newState.trades = [...trades];
            expect(fromReducer.getTrades(newState)).toEqual(trades);
        });

        it('getLastTrade', () => {
            const trades: ITrade[] = [{
                misc: "",
                orderType: "l",
                price: 5541.20000,
                side: "s",
                time: 1534614057.321597,
                volume: 0.15850568
              },
              {
                misc: "",
                orderType: "m",
                price: 5542.20000,
                side: "s",
                time: 1534614057.321598,
                volume: 0.25850568
              }             
            ];         
            newState.lastTrade = [...trades]   ;
            expect(fromReducer.getLastTrade(newState)).toEqual(trades);
        });        
        
    });
    
});
