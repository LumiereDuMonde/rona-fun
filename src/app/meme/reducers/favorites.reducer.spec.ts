import * as fromReducer from './favorites.reducer';
import * as FavoritesActions from '../actions/favorites.actions';

describe('Favorites slice of the Meme feature', () => {
    let newState: fromReducer.State;
    let initialState: fromReducer.State;
    beforeEach(() => {
        newState = {
            ids: [],
            entities: {}
        };
        initialState = { ...fromReducer.initialState };
    });    

    it('unknown action', () => {
        const action = {
            type: 'Unknown',
        };
        const state = fromReducer.reducer(initialState, action);

        expect(state).toBe(initialState);
    });

    it('FAVORITE_ADD action', () => {
        newState.ids = [1];
        newState.entities = {1:{id: 1} as any};
        const action = FavoritesActions.FAVORITE_ADD({data: {id: 1} as any});
        const state = fromReducer.reducer(initialState, action);

        expect(state).toEqual(newState);
        expect(state).not.toBe(newState);
    });    
    
    it('FAVORITE_REMOVE action', () => {
        initialState.ids = [1];
        initialState.entities = {1:{id: 1} as any};
        const action = FavoritesActions.FAVORITE_REMOVE({id: '1'});
        const state = fromReducer.reducer(initialState, action);

        expect(state).toEqual(newState);
        expect(state).not.toBe(newState);
    });     
});
