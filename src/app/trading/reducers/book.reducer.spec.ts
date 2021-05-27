import * as fromReducer from './book.reducer';
import * as BookActions from '../actions/book.actions';
import { TradeState } from '../enums/tradeState.enum';

describe('Book slice of the Trading feature key', () => {
    let newState: fromReducer.State;
    let initialState: fromReducer.State;
    beforeEach(() => {
        initialState = {
            ask: Array.from({ length: 10 }, _ => new Array(3).fill(0)),
            bid: Array.from({ length: 10 }, _ => new Array(3).fill(0)),
            connected: TradeState.DISCONNECTED,
            error: ''
        };
        newState = { ...initialState };
    });

    describe('Actions', () => {
        it('unknown action', () => {
            const action = {
                type: 'Unknown',
            };
            const state = fromReducer.reducer(initialState, action);

            expect(state).toBe(initialState);
        });

        it('BOOK_STARTING sets connected', () => {
            newState.connected = TradeState.CONNECTING;
            const state = fromReducer.reducer(initialState, BookActions.BOOK_STARTING());
            expect(state).toEqual(newState);
        });

        it('BOOK_STARTED sets connected', () => {
            newState.connected = TradeState.CONNECTED;
            const state = fromReducer.reducer(initialState, BookActions.BOOK_STARTED());
            expect(state).toEqual(newState);
        });

        it('BOOK_ENDED sets connected', () => {
            newState.connected = TradeState.DISCONNECTED;
            const state = fromReducer.reducer(initialState, BookActions.BOOK_ENDED());
            expect(state).toEqual(newState);
        });

        it('BOOK_ENDING sets connected', () => {
            newState.connected = TradeState.DISCONNECTING;
            const state = fromReducer.reducer(initialState, BookActions.BOOK_ENDING());
            expect(state).toEqual(newState);
        });

        it('BOOK_PAYLOAD_SNAPSHOT sets bid and ask books', () => {
            newState.ask = [
                [
                    5541.30000,
                    2.50700000,
                    1534614248.123678
                ]];

            newState.bid = [
                [
                    5541.20000,
                    1.52900000,
                    1534614248.765567
                ]
            ];
            const state = fromReducer.reducer(initialState, BookActions.BOOK_PAYLOAD_SNAPSHOT({
                book: {
                    "as": [
                        [
                            "5541.30000",
                            "2.50700000",
                            "1534614248.123678"
                        ]
                    ],
                    "bs": [
                        [
                            "5541.20000",
                            "1.52900000",
                            "1534614248.765567"
                        ]
                    ]
                } as any
            }));
            expect(state).toEqual(newState);
        });

        describe('BOOK_PAYLOAD_UPDATE', () => {
            beforeEach(() => {
                initialState.ask = [
                    [
                        5540.20000,
                        1.52900000,
                        1534614248.765567                        
                    ],
                    [
                        5541.20000,
                        1.62900000,
                        1534614248.765567                        
                    ],
                    [
                        5542.10000,
                        1.72900000,
                        1534614248.765567  
                    ]
                ];
                initialState.bid = [
                    [
                        5539.20000,
                        1.52900000,
                        1534614248.765567                        
                    ],
                    [
                        5538.20000,
                        1.62900000,
                        1534614248.765567                        
                    ],
                    [
                        5537.10000,
                        1.72900000,
                        1534614248.765567  
                    ]
                ];
            });
            it('update bid', () => {
                const state = fromReducer.reducer(initialState, BookActions.BOOK_PAYLOAD_UPDATE({book:
                    {"b":[["5539.20000","3.00000000","1534614248.765567"] as any]}
                }));
                
                expect(state.bid).toEqual( [
                    [
                        5539.20000,
                        3.00000000,
                        1534614248.765567                        
                    ],
                    [
                        5538.20000,
                        1.62900000,
                        1534614248.765567                        
                    ],
                    [
                        5537.10000,
                        1.72900000,
                        1534614248.765567  
                    ]
                ]);
            });
            
            it('update ask', () => {
                const state = fromReducer.reducer(initialState, BookActions.BOOK_PAYLOAD_UPDATE({book:
                    {"a":[["5540.20000","3.00000000","1534614248.765567"] as any]}
                }));
                
                expect(state.ask).toEqual( [
                    [
                        5540.20000,
                        3.00000000,
                        1534614248.765567                        
                    ],
                    [
                        5541.20000,
                        1.62900000,
                        1534614248.765567                        
                    ],
                    [
                        5542.10000,
                        1.72900000,
                        1534614248.765567  
                    ]
                ]);
            });   
            
            it('delete ask', () => {
                const state = fromReducer.reducer(initialState, BookActions.BOOK_PAYLOAD_UPDATE({book:
                    {"a":[["5540.20000","0.00000000","1534614248.765567"] as any]}
                }));
                
                expect(state.ask).toEqual( [                    
                    [
                        5541.20000,
                        1.62900000,
                        1534614248.765567                        
                    ],
                    [
                        5542.10000,
                        1.72900000,
                        1534614248.765567  
                    ]
                ]);
            });                 
            
        });
        

    });

    describe('Getters', () => {
        it('getConnectedStatus', () => {
            newState.connected = TradeState.CONNECTED;
            expect(fromReducer.getConnectedStatus(newState)).toBe(TradeState.CONNECTED);
        });

        it('getBidBook', () => {
            newState.bid = [
                [
                    5541.20000,
                    1.52900000,
                    1534614248.765567
                ]
            ];
            expect(fromReducer.getBidBook(newState)).toEqual([
                [
                    5541.20000,
                    1.52900000,
                    1534614248.765567
                ]
            ]);
        });

        it('getAskBook', () => {
            newState.ask = [
                [
                    5541.20000,
                    1.52900000,
                    1534614248.765567
                ]
            ];
            expect(fromReducer.getAskBook(newState)).toEqual([
                [
                    5541.20000,
                    1.52900000,
                    1534614248.765567
                ]
            ]);
        });        
    });

});