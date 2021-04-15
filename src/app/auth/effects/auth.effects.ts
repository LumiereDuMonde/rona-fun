import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { loginUser } from '../models/loginUser.model';
import * as AuthActions from '../actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) { }

  //debugging logger, would of course be removed in production
//   logActions$ = createEffect(() =>
//     this.actions$.pipe(
//       tap((action) =>{
//        console.log(action);
//       })
//     ), { dispatch: false });  

  startLogin$ = createEffect(() => this.actions$.pipe(
    // only continue in this observable chain if of the type
    // of the below observable
    ofType(AuthActions.LOGIN_START),
    // grab the signup out and pass it down the observable chain
    map((action) => action.signup),
    //
    exhaustMap((auth: loginUser) =>
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
    tap(() => this.router.navigate(['/']))
  ), { dispatch: false });

  notLoggedIn$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.NOT_LOGGED_IN),
    tap(() => this.router.navigate(['/auth']))
  ), { dispatch: false });  

      

  autoLoginStart$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AUTOLOGIN_START),
    map(() => {
      const loadedUser = this.authService.autoLogin();
      if (loadedUser?.token){
        return AuthActions.AUTOLOGIN_SUCCESS({user: loadedUser})
      } else {
        return AuthActions.LOGOUT();
      }
    })
  ));

}