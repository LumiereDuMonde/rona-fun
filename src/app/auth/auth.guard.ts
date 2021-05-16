import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAuth from './reducers';
import * as AuthActions from './actions/auth.actions';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private store: Store<fromAuth.State>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {    
    return this.store.select(fromAuth.selectAuthLoggedIn).pipe(        
        map((isLoggedIn) => {
            if(isLoggedIn){
                return true;
            } else {
                console.log(`Not logged in ${state.url}`);
                this.store.dispatch(AuthActions.NOT_LOGGED_IN({url: state.url}));
                return false;
            }            
        }),
        take(1)
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    return this.canActivate(childRoute, state);
  }
  
}
