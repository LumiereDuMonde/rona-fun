import * as fromReducer from './meme.reducer';
import * as MemeActions from '../actions/meme.actions';

describe('Memes slice of the Meme feature key', () => {
    let newState: fromReducer.State;
    let initialState: fromReducer.State;
    beforeEach(() => {
        newState = {
            ids: [],
            entities: {},
            pagination: { offset: 0, total_count: 0, count: 0, },
            search: "",
            loading: false,
            error: "",
            selectedId: null
        };
        initialState = {
            ids: [],
            entities: {},
            pagination: { offset: 0, total_count: 0, count: 0, },
            search: "",
            loading: false,
            error: "",
            selectedId: null
        };
    });

    describe('Actions', () => {


        it('unknown action', () => {
            const action = {
                type: 'Unknown',
            };
            const state = fromReducer.reducer(initialState, action);

            expect(state).toBe(initialState);
        });

        it('MEME_TRENDING_START sets loading', () => {
            newState.loading = true;
            const action = MemeActions.MEME_TRENDING_START();
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(initialState);
        });

        it('MEME_TRENDING_FINISH sets loading', () => {
            newState.loading = false;
            newState.ids = [1, 2];
            newState.entities = { 1: { id: 1 } as any, 2: { id: 2 } as any };
            newState.pagination.count = 3;
            newState.pagination.offset = 1;
            newState.pagination.total_count = 2;
            initialState.loading = true;
            const action = MemeActions.MEME_TRENDING_FINISH({ data: [{ id: 1 } as any, { id: 2 as any }], pagination: { offset: 1, total_count: 2, count: 3 } });
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(initialState);
        });

        it('MEME_SET_ID sets selectedId', () => {
            newState.selectedId = '1';
            const action = MemeActions.MEME_SET_ID({ id: '1' });
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(initialState);
        });

        it('MEME_SET_SEARCH sets search', () => {
            newState.search = 'dog';
            const action = MemeActions.MEME_SET_SEARCH({ search: 'dog' });
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(initialState);
        });

        it('MEME_SEARCH_ERROR sets error', () => {
            newState.error = 'error';
            const action = MemeActions.MEME_SEARCH_ERROR({ msg: 'error' });
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(initialState);
        });   
        
        it('MEME_TRENDING_ERROR sets error', () => {
            newState.error = 'error';
            const action = MemeActions.MEME_TRENDING_ERROR({ msg: 'error' });
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(initialState);
        });        

        it('MEME_CLEAR_ITEMS_THEN_SEARCH', () => {
            initialState.ids = [1, 2];
            initialState.entities = { 1: { id: 1 } as any, 2: { id: 2 } as any };
            initialState.pagination.count = 3;
            initialState.pagination.offset = 1;
            initialState.pagination.total_count = 2;
            newState.search = '';

            const action = MemeActions.MEME_CLEAR_ITEMS_THEN_SEARCH({ search: 'dog' });
            const state = fromReducer.reducer(initialState, action);
            expect(state).toEqual(newState);
            expect(state).not.toBe(initialState);
        });

        it('MEME_CLEAR_ITEMS_THEN_SEARCH', () => {
            initialState.ids = [1, 2];
            initialState.entities = { 1: { id: 1 } as any, 2: { id: 2 } as any };
            initialState.pagination.count = 3;
            initialState.pagination.offset = 1;
            initialState.pagination.total_count = 2;
            newState.search = '';

            const action = MemeActions.MEME_CLEAR_ITEMS();
            const state = fromReducer.reducer(initialState, action);
            expect(state).toEqual(newState);
            expect(state).not.toBe(initialState);
        });

        it('MEME_SEARCH_START sets loading', () => {
            newState.loading = true;
            const action = MemeActions.MEME_SEARCH_START();
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(initialState);
        });

        it('MEME_SEARCH_FINISH sets loading', () => {
            newState.loading = false;
            newState.ids = [1, 2];
            newState.entities = { 1: { id: 1 } as any, 2: { id: 2 } as any };
            newState.pagination.count = 3;
            newState.pagination.offset = 1;
            newState.pagination.total_count = 2;
            initialState.loading = true;
            const action = MemeActions.MEME_SEARCH_FINISH({ data: [{ id: 1 } as any, { id: 2 as any }], pagination: { offset: 1, total_count: 2, count: 3 } });
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(initialState);
        });

    });

    describe('Getters', () => {
        it('getLoading', () => {
            newState.loading = true;
            expect(fromReducer.getLoading(newState)).toBe(true);
        });

        it('getOffset', () => {
            newState.pagination.offset = 4;
            expect(fromReducer.getOffset(newState)).toBe(4);
        });

        it('getCount', () => {
            newState.pagination.count = 6;
            expect(fromReducer.getCount(newState)).toBe(6);
        });
        
        it('getTotalCount', () => {
            newState.pagination.total_count = 7;
            expect(fromReducer.getTotalCount(newState)).toBe(7);
        });  
        
        it('getSearch', () => {
            newState.search = 'cat';
            expect(fromReducer.getSearch(newState)).toBe('cat');
        });        
              
        it('getError', () => {
            newState.error = 'error';
            expect(fromReducer.getError(newState)).toBe('error');
        });

        it('getSelectedId', () => {
            newState.selectedId = '2';
            expect(fromReducer.getSelectedId(newState)).toBe('2');
        });

    });
    
});
