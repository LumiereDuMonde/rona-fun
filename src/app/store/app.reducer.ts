import { Action, ActionReducer, ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
    router: fromRouter.RouterReducerState<any>;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
 export const ROOT_REDUCERS = new InjectionToken<
 ActionReducerMap<State, Action>
>('Root reducers token', {
 factory: () => ({   
   router: fromRouter.routerReducer,
 }),
});

// export const appReducer: ActionReducerMap<State> = {
    
// }

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
  
  /**
   * By default, @ngrx/store uses combineReducers with the reducer map to compose
   * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
   * that will be composed to form the root meta-reducer.
   */
  export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger]
    : [];
  


/**
 * Router Selectors
 */
 export const selectRouter = createFeatureSelector<
 State,
 fromRouter.RouterReducerState
>('router');

export const { selectRouteData } = fromRouter.getSelectors(selectRouter);