import { Action, createReducer, on } from "@ngrx/store";
import { GIF } from "../models/GIF.model";
import { GiphyPagination } from "../models/pagination.model";
import * as MemeActions from "../actions/meme.actions";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";



export interface State extends EntityState<GIF> {
    pagination: GiphyPagination,
    search: string,
    loading: boolean,
    error: string,    
    selectedId: string;    
}

export const adapter: EntityAdapter<GIF> = createEntityAdapter<GIF>({});

export const initialState: State = adapter.getInitialState({
    entities: {},
    ids: [],
    pagination: { offset: 0, total_count: 0, count: 0, },
    search: "",
    loading: false,
    error: "",
    selectedId: null
});

export const memeFeatureKey = 'meme';

const memeReducer = createReducer(
    initialState,
    on(MemeActions.MEME_TRENDING_START, (state) => ({ ...state, loading: true })),
    on(MemeActions.MEME_TRENDING_FINISH , (state, action) => (adapter.addMany(action.data, { ...state, pagination: { ...action.pagination }, loading: false }))),
    on(MemeActions.MEME_SET_ID, (state, action) => ({...state, selectedId: action.id})),
    on(MemeActions.MEME_CLEAR_ITEMS_THEN_SEARCH , (state) => (adapter.removeAll({...state, pagination: initialState.pagination, search: initialState.search}))),
    on(MemeActions.MEME_CLEAR_ITEMS , (state) => (adapter.removeAll({...state, pagination: initialState.pagination, search: initialState.search}))),
    on(MemeActions.MEME_SET_SEARCH, (state, action) => ({...state, search: action.search})),
    on(MemeActions.MEME_SEARCH_START, (state) => ({...state, loading: true})),    
    on(MemeActions.MEME_SEARCH_FINISH , (state, action) => (adapter.addMany(action.data, { ...state, pagination: { ...action.pagination }, loading: false }))),
);

export function reducer(state: State | undefined, action: Action) {
    return memeReducer(state, action);
}

export const getLoading = (state: State) => state.loading;
export const getOffset = (state: State) => state.pagination.offset;
export const getCount = (state: State) => state.pagination.count;
export const getTotalCount = (state: State) => state.pagination.total_count;
export const getSearch = (state: State) => state.search;
export const getError = (state: State) => state.error;
export const getSelectedId = (state: State) => state.selectedId;


// get the selectors
const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors();
   
  // select the array of meme ids
  export const selectMemeIds = selectIds;
   
  // select the dictionary of meme entities
  export const selectMemeEntities = selectEntities;
   
  // select the array of memes
  export const selectAllMemes = selectAll;
   
  // select the total meme count
  export const selectMemeTotal = selectTotal;