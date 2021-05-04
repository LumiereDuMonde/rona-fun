import { Action, ActionReducer, ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface State {
    router: fromRouter.RouterReducerState<any>;
}

 export const ROOT_REDUCERS = new InjectionToken<
 ActionReducerMap<State, Action>
>('Root reducers token', {
 factory: () => ({   
   router: fromRouter.routerReducer,
 }),
});

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return (state, action) => {
      const result = reducer(state, action);
      console.groupCollapsed(action.type);
      console.log('prev state', state);
      console.log('action', action);
      console.log('next state', result);
      console.groupEnd();
  
      return result;
    };
  }

  /*
    Reset ngrx state if someone logs out
  */
  export function clearState(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: Action): State {
      if (action.type === '[Auth] Logout') {
        state = undefined;
      }
      return reducer(state, action);
    };
  }
  
  export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger,clearState]
    : [clearState];
  


/**
 * Router Selectors
 */
 export const selectRouter = createFeatureSelector<
 State,
 fromRouter.RouterReducerState
>('router');

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = fromRouter.getSelectors(selectRouter);