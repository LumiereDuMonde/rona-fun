import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoginUser } from './models/LoginUser.model';
import * as fromAuth from './reducers';
import * as AuthActions from './actions/auth.actions';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  
  isLoading$: Observable<boolean>;  
  subscription: Subscription;
  email = 'test@test.com'
  password= 'ABigPasswordIsHere#';

  constructor(private store: Store<fromAuth.State>, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromAuth.selectAuthLoading);
    this.subscription = this.store.select(fromAuth.selectAuthError).subscribe(error => {
      this._snackBar.dismiss();      
      if (error?.length > 0) {        
        this._snackBar.open(error);
      }
    });        
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe(); 
  }


  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;       

    this.store.dispatch(AuthActions.LOGIN_START({signup: new LoginUser(email, password)}));          
  }  

}
