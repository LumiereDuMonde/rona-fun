import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { LoginUser } from './models/LoginUser.model';
import { LoginResult } from './models/LoginResult.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './actions/auth.actions';
import * as fromAuth from './reducers';
import { Store } from '@ngrx/store';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {  
  private subscription: Subscription;
  private timer: any = null;  

  constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.State>) {
    this.subscription = this.store.select(fromAuth.selectAuthUser).subscribe((user) => {      
      this.clearTimer();
      if (user){        
        this.autoLogout(user.expirationMilliseconds);
      } 
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResult>(environment.signInURL, new LoginUser(email, password)); 
  }

  logout() {  
    localStorage.removeItem('user');
    this.clearTimer() ;
    this.store.dispatch(AuthActions.LOGOUT());
    this.router.navigate(['/auth']);
  }

  clearTimer() {    
    if (this.timer) {      
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  autoLogout(exiprationDuration: number) {
    this.timer = setTimeout(() => {
      this.logout();
    }, exiprationDuration);
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    return loadedUser;
  }

  handleAuthentication(res: LoginResult) {
    const expirationDate = new Date(new Date().getTime() + +res.expiresIn * 1000);
    const user = new User(res.email, res.localId, res.idToken, expirationDate);
    localStorage.setItem('user', JSON.stringify(user));
    return user;        
  }

  handleError(errorResponse: HttpErrorResponse) {
    let errorMsg = "An error has occurred.";    
    switch (errorResponse?.error?.error?.message) {
      case "EMAIL_EXISTS":
        errorMsg = "Email already exists";
        break;
      case "OPERATION_NOT_ALLOWED":
        errorMsg = "Sign in disabled for this project";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        errorMsg = "Too many attempts, try later";
        break;
      case "EMAIL_NOT_FOUND":
        errorMsg = "Email not found"
        break;
      case "INVALID_PASSWORD":
        errorMsg = "Password is invalid"
        break;
      case "USER_DISABLED":
        errorMsg = "User is disabled"
        break;
    }
    return errorMsg;
  }
}
