import { Action, createReducer, on } from '@ngrx/store';
import * as BookActions from '../actions/book.actions';
import { BookItemFieldMapping } from '../enums/bookItemFieldMapping.enum';
import { TradeState } from '../enums/tradeState.enum';



export const bookFeatureKey = 'book';

export interface State {
    connected: TradeState,
    bid: Array<Array<number>>,
    ask: Array<Array<number>>,
    error: string;
};

const bookInitialValues = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0]
];

const initialState: State = {
    connected: TradeState.DISCONNECTED,
    bid: bookInitialValues,
    ask: bookInitialValues,
    error: ''
};

function mapUpdateToBookItem(book: Array<Array<number>>, update: Array<Array<number>>, isBid: boolean = false, maxAmount: number = 10) {
    
    // update can be null/undefined, putting the check here
    if (!update) return book;
    
    let newBook = [...book];
    // start with each book in ascending order
    if (isBid) newBook.reverse();

    update.forEach((item) => {
        let updatedRow = [...item.map(x => +x)];
        if (updatedRow.length > 3) updatedRow.pop();
        const price = +item[BookItemFieldMapping.price];
        const volume = +item[BookItemFieldMapping.volume];        

        if (item.length > 3) {            
            // "bringing into scope" in kraken parlance
            // a number that was in the book but out of our range comes into our range.
            if(isBid) {
                newBook.unshift(updatedRow);
            } else {
                newBook.push(updatedRow);
            }
            
        } else {
            const index = newBook.findIndex((val) => price <= val[BookItemFieldMapping.price]);
            if(index === -1) {
                // edge case, last item to insert
                newBook.push(updatedRow);
            } else if (volume === 0.00000000) {
                //delete                
                newBook.splice(index,1);
            } else {
                // update/insert
                const insertOrUpdate = newBook[index][BookItemFieldMapping.price] === price ? 1 : 0;
                newBook.splice(index, insertOrUpdate, updatedRow);
            }
        }
    });

    // reverse it back if needed
    if (isBid) newBook.reverse();

    // return just the book size needed, a book of 10 could have 11 elements or more with inserts, 
    // ensure it has no more than 10
    newBook = newBook.slice(0,maxAmount);
    
    return newBook;
}

const bookReducer = createReducer(
    initialState,
    on(
        BookActions.BOOK_STARTING,
        (state) => ({ ...state, connected: TradeState.CONNECTING }),
    ),
    on(
        BookActions.BOOK_STARTED,
        (state) => ({ ...state, connected: TradeState.CONNECTED })
    ),
    on(
        BookActions.BOOK_ENDED,
        (state) => ({ ...state, connected: TradeState.DISCONNECTED }) 
    ),
    on(
        BookActions.BOOK_ENDING,
        (state) => ({ ...state, connected: TradeState.DISCONNECTING })
    ),
    on(
        BookActions.BOOK_PAYLOAD_SNAPSHOT,
        (state, action) => ({...state, bid: [...action.book.bs.map(val => val.map(x => +x))], ask: [...action.book.as.map(val => val.map(x => +x))]})
    ),
    on(
        BookActions.BOOK_PAYLOAD_UPDATE,
        (state, action) => ({...state, bid: mapUpdateToBookItem(state.bid,action.book.b, true), ask: mapUpdateToBookItem(state.ask, action.book.a) })
    )
);

export function reducer(state: State | undefined, action: Action) {
    return bookReducer(state, action);
}

export const getConnectedStatus = (state: State) => state.connected;
export const getAskBook= (state: State) => state.ask;
export const getBidBook = (state: State) => state.bid;