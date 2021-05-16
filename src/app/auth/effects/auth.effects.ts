import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { LoginUser } from '../models/LoginUser.model';
import * as AuthActions from '../actions/auth.actions';
import { Store } from '@ngrx/store';
import * as fromAuth from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {
  constructor(private actions$: Actions, 
    private authService: AuthService, 
    private router: Router,
    private store: Store
    ) { }

  startLogin$ = createEffect(() => this.actions$.pipe(
    // only continue in this observable chain if of the type
    // of the below observable
    ofType(AuthActions.LOGIN_START),
    // grab the signup out and pass it down the observable chain
    map((action) => action.signup),
    //
    exhaustMap((auth: LoginUser) =>
      this.authService.login(auth.email, auth.password).pipe(
        // map the response to a new login_success action 
        // map wraps the return value with an observable
        map((response) => {
          const user = this.authService.handleAuthentication(response);
          return AuthActions.LOGIN_SUCCESS({ user });
        }),
        // get any errors and return a login_failure  
        // wrap return value in of() to ensure you return an observable and 
        // don't break the observable chain
        catchError((error) => of(AuthActions.LOGIN_FAILURE({ error: this.authService.handleError(error) })))
      )
    )
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.LOGIN_SUCCESS),
    concatLatestFrom(() => this.store.select(fromAuth.selectRedirectUrl)),
    tap(([action,url]) => {
      this.router.navigate([ !!url ? url : '/'])
    })
  ), { dispatch: false });

  notLoggedIn$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.NOT_LOGGED_IN),
    tap(() => this.router.navigate(['/auth']))
  ), { dispatch: false });        

  autoLoginStart$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AUTOLOGIN_START),
    map(() => {
      const loadedUser = this.authService.autoLogin();    
      let returnVal;
      if (loadedUser?.token) {
        returnVal = AuthActions.AUTOLOGIN_SUCCESS({user: loadedUser})                    
      } else {
        returnVal = AuthActions.LOGOUT()
      }
      return returnVal;
    })    
  ));

}