import {
    createSelector,
    createFeatureSelector,
    combineReducers,
    Action,
} from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import * as fromRoot from '../../store/app.reducer';

export const authFeatureKey = 'auth';

export interface AuthState {
    [fromAuth.authStateFeatureKey]: fromAuth.State;
}

export interface State extends fromRoot.State {
    [authFeatureKey]: AuthState;
}

  /** Provide reducer in AoT-compilation happy way */
  export function reducers(state: AuthState | undefined, action: Action) {
    return combineReducers({      
      [fromAuth.authStateFeatureKey]: fromAuth.reducer      
    })(state, action);
  }

  
  /**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const selectChartFeatureState = createFeatureSelector<State, AuthState>(
    authFeatureKey
);

export const selectAuthState = createSelector(
    selectChartFeatureState,
    (state) => state.authState
  );

  export const selectAuthLoading = createSelector(
    selectAuthState,
    fromAuth.getLoading
  );   

  export const selectAuthError = createSelector(
    selectAuthState,
    fromAuth.getError
  );     

  export const selectAuthLoggedIn = createSelector(
    selectAuthState,
    fromAuth.getLoggedIn
  );   

  export const selectAuthUser = createSelector(
    selectAuthState,
    fromAuth.getUser
  ); 