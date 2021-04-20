import {
    createSelector,
    createFeatureSelector,
    combineReducers,
    Action,
} from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer';
import * as fromMeme from './meme.reducer';
import * as fromFavorites from './favorites.reducer';

export const memeFeatureKey = 'meme';

export interface MemeState {
    [fromMeme.memeFeatureKey]: fromMeme.State;
    [fromFavorites.favoriteFeatureKey]: fromFavorites.State
}

export interface State extends fromRoot.State {
    [memeFeatureKey]: MemeState;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: MemeState | undefined, action: Action) {
    return combineReducers({
        [fromMeme.memeFeatureKey]: fromMeme.reducer,
        [fromFavorites.favoriteFeatureKey]: fromFavorites.reducer
    })(state, action);
}

/* The createFeatureSelector function selects a piece of state from the root of the state object.
* This is used for selecting feature states that are loaded eagerly or lazily.
*/
export const selectMemesState = createFeatureSelector<State, MemeState>(
    memeFeatureKey
);

export const selectMemeState = createSelector(
    selectMemesState,
    (state) => state.meme
);

export const selectMemeLoading = createSelector(
    selectMemeState,
    fromMeme.getLoading
);

export const selectMemeError = createSelector(
    selectMemeState,
    fromMeme.getError
);

export const selectMemeOffset = createSelector(
    selectMemeState,
    fromMeme.getOffset
);

export const selectMemeSearch = createSelector(
    selectMemeState,
    fromMeme.getSearch
);



export const selectMemeSelectedId = createSelector(
    selectMemeState,
    fromMeme.getSelectedId
);

export const selectMemeIds = createSelector(
    selectMemeState,
    fromMeme.selectMemeIds // shorthand for usersState => fromUser.selectUserIds(usersState)
);

export const selectMemeEntities = createSelector(
    selectMemeState,
    fromMeme.selectMemeEntities
);

export const selectAllMemes = createSelector(
    selectMemeState,
    fromMeme.selectAllMemes
);

export const selectMemeTotal = createSelector(
    selectMemeState,
    fromMeme.selectMemeTotal
);

export const selectCurrentMeme = createSelector(
    selectMemeEntities,
    selectMemeSelectedId,
    (memeEntities, memeId) => memeEntities[memeId]
);

export const selectMemeAndTotalSearch = createSelector(
    selectMemeSearch,
    selectMemeTotal,
    (term, total) => { return {term, total}}
);


// Favorites

export const selectFavoriteState = createSelector(
    selectMemesState,
    (state) => state.favorites
);

export const selectFavoritesIds = createSelector(
    selectFavoriteState,
    fromFavorites.selectFavoriteIds    
);

export const selectFavoritesEntities = createSelector(
    selectFavoriteState,
    fromFavorites.selectFavoriteEntities
);

export const selectAllFavorites = createSelector(
    selectFavoriteState,
    fromFavorites.selectAllFavorites
);

export const selectFavoritesTotal = createSelector(
    selectFavoriteState,
    fromFavorites.selectFavoriteTotal
);



export const selectMemesWithFavorites = createSelector(
    selectAllMemes,
    selectFavoritesIds,
    (memes, favorites: Array<string>) =>  memes.map(a => ({
        ...a,
        is_favorite: favorites.includes(a.id as string)   
    }))
)

export const selectFavoritesIdsAsStringArray = createSelector(
    selectFavoritesIds,
    (ids: Array<string>) => ids 
)



