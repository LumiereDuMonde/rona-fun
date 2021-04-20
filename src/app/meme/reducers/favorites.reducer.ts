import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import { GIF } from "../models/GIF.model";
import * as FavoritesActions from '../actions/favorites.actions';

export interface State extends EntityState<GIF> {
     
}

export const adapter: EntityAdapter<GIF> = createEntityAdapter<GIF>({});

export const initialState: State = adapter.getInitialState({
    entities: {},
    ids: []   
});

export const favoriteFeatureKey = 'favorites';

const favoriteReducer = createReducer(
    initialState,
    on(FavoritesActions.FAVORITE_ADD, (state, action) => (adapter.addOne(action.data,{...state}))),        
    on(FavoritesActions.FAVORITE_REMOVE, (state, action) => (adapter.removeOne(action.id, {...state})))
);

export function reducer(state: State | undefined, action: Action) {
    return favoriteReducer(state, action);
}

// get the selectors
const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors();
   
  // select the array of meme ids
  export const selectFavoriteIds = selectIds;
   
  // select the dictionary of meme entities
  export const selectFavoriteEntities = selectEntities;
   
  // select the array of memes
  export const selectAllFavorites = selectAll;
   
  // select the total meme count
  export const selectFavoriteTotal = selectTotal;