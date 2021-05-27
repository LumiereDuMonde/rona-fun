import * as fromReducer from './index';

describe('Trading Feature', () => {
    const state = {
        trading: {
            trades: {
                connected: 1,
                trades: [{
                    misc: "",
                    orderType: "l",
                    price: 5541.20000,
                    side: "s",
                    time: 1534614057.321597,
                    volume: 0.15850568
                  }],
                lastTrade: [{
                    misc: "",
                    orderType: "l",
                    price: 5541.30000,
                    side: "s",
                    time: 1534614057.321597,
                    volume: 0.15850568
                  }]
            },
            book: {
                connected: 2,
                bid: [
                    [1,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]
                ],
                ask: [
                    [2,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]
                ],
                error: ''
            }
        }
    };

    it('selectConnectedStatus', () => {
        expect(fromReducer.selectConnectedStatus(state as any)).toBe(1);
    });
    
    it('selectAskBook', () => {
        expect(fromReducer.selectAskBook(state as any)).toEqual([[2,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]);
    });    

    it('selectBidBook', () => {
        expect(fromReducer.selectBidBook(state as any)).toEqual([[1,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]);
    });   

    it('selectBookConnectedStatus', () => {
        expect(fromReducer.selectBookConnectedStatus(state as any)).toBe(2);
    });   
    
    it('selectLastTrade', () => {
        expect(fromReducer.selectLastTrade(state as any)).toEqual([{
            misc: "",
            orderType: "l",
            price: 5541.30000,
            side: "s",
            time: 1534614057.321597,
            volume: 0.15850568
          }]);
    });     
    
    it('selectTrades', () => {
        expect(fromReducer.selectTrades(state as any)).toEqual([{
            misc: "",
            orderType: "l",
            price: 5541.20000,
            side: "s",
            time: 1534614057.321597,
            volume: 0.15850568
          }]);
    });       
});