import { TestBed } from '@angular/core/testing';
import { AuthService } from '../auth.service';
import { AuthEffects } from './auth.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginUser } from '../models/LoginUser.model';
import { User } from 'src/app/models/user.model';
import * as AuthActions from '../actions/auth.actions';
import { Router } from '@angular/router';

describe('AuthEffects', () => {
  let service: AuthEffects;
  let actions$ = new Observable<Action>();
  let authService: any;
  let user: User;
  let router: Router;

  beforeEach(() => {   
    user = new User('user@user.com', '1', 'token', new Date('1/1/2031')); 
    authService = jasmine.createSpyObj('AuthService', ['handleAuthentication', 'login', 'handleError', 'autoLogin']);  
    
    authService.handleAuthentication.and.returnValue(user);
    authService.handleError.and.returnValue('Error is here');
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        AuthEffects,        
        provideMockActions(() => actions$),
        { provide: AuthService, useValue: authService }
      ]
    });
    service = TestBed.inject(AuthEffects);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('LOGIN_START success', () => {
    const login = new LoginUser('user@user.com','password');
    actions$ = of(AuthActions.LOGIN_START({signup: login}));
    authService.login.and.returnValue(of({id: 'token', email: 'user@user.com', refreshToken: '1', expiresIn: '2000', localId: '4000'}));
    service.startLogin$.subscribe((result) => {
      expect(authService.login).toHaveBeenCalled();
      expect(authService.handleAuthentication).toHaveBeenCalled();      
      expect(result).toEqual({
        type: '[Auth] Login Success',
        user: user
      });
    });
  });

  it('LOGIN_START failure', () => {
    const login = new LoginUser('user@user.com','password');        
    authService.login.and.returnValue(throwError("Error"));
    actions$ = of(AuthActions.LOGIN_START({signup: login}));
        
    service.startLogin$.subscribe((result) => {
      expect(result).toEqual({
        type: '[Auth] Login Failure',
        error: 'Error is here'
      })
    });
  });
  
  it('LOGIN_SUCCESS navigates to root', () => {
    actions$ = of(AuthActions.LOGIN_SUCCESS({user}));    
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');      
    service.loginSuccess$.subscribe();
    expect(router.navigate).toHaveBeenCalledWith(['/']);    
  });
    
  it('NOT_LOGGED_IN navigates to login page', () => {
    actions$ = of(AuthActions.NOT_LOGGED_IN());    
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');    
    service.notLoggedIn$.subscribe();
    expect(router.navigate).toHaveBeenCalledWith(['/auth']);    
  });

  it('LOGIN_START success', () => {    
    jasmine.clock().install();     
      
    jasmine.clock().mockDate(new Date(2021, 1, 1));  
    authService.autoLogin.and.returnValue(user);  
    actions$ = of(AuthActions.AUTOLOGIN_START());    
    service.autoLoginStart$.subscribe((result) => {      
      expect(result).toEqual({
        type: '[Auth] Auto Login Success',
        user: user      
      });
    });
    jasmine.clock().uninstall();
  });
  
  it('LOGIN_START failure', () => {  
    authService.autoLogin.and.returnValue(null);
    actions$ = of(AuthActions.AUTOLOGIN_START());
    
    service.autoLoginStart$.subscribe((result) => {      
      expect(result).toEqual({
        type: '[Auth] Logout'          
      });
    });
  });  
});
