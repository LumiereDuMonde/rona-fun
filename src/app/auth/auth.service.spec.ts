import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import * as AuthActions from './actions/auth.actions';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginResult } from './models/LoginResult.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let store: MockStore;
  const initialState = {
    auth: {
      authState: {
        user: null,
        loading: false,
        loggedIn: false,
        errorMsg: null
      }
    },
  };

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthService,
        provideMockStore({ initialState }),
      ]
    });

    spyOn(localStorage.__proto__, 'removeItem');    
    httpTestingController = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');    
  });

  describe('constructor test', () => {

    it('constructor with no user', async () => {
      spyOn(AuthService.prototype, 'clearTimer');    
      spyOn(AuthService.prototype, 'autoLogout');      
      service = TestBed.inject(AuthService);
      
      expect(service.clearTimer).toHaveBeenCalled();
      expect(service.autoLogout).not.toHaveBeenCalled();
    });

    it('constructor with user', () => {
      spyOn(AuthService.prototype, 'clearTimer');    
      spyOn(AuthService.prototype, 'autoLogout');      
      const user = new User('user@service.com', 'username', 'token', new Date('01/01/2031'));
      const stateWithUser = {
        auth: {
          authState: {
            user: user,
            loading: false,
            loggedIn: false,
            errorMsg: null
          }
        },
      };
      store.setState(stateWithUser);
      service = TestBed.inject(AuthService);
      expect(service.clearTimer).toHaveBeenCalled();
      expect(service.autoLogout).toHaveBeenCalled();
    });
  });

  describe('Method tests', () => {
    beforeEach(() => {
      service = TestBed.inject(AuthService);
      spyOn(service,'clearTimer');
      spyOn(service,'autoLogout');      
    });

    it('can load instance', () => {
      expect(service).toBeTruthy();
    });

    it('login URL called with correct parameters', () => {
      service.login('user@service.com', 'password').subscribe((loginResult) => {
        expect(loginResult).toEqual(null);
      });
      let req = httpTestingController.expectOne(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJqVnwW4N_lXqqpEEMTCXjvcXmzJTSNPE`);
      expect(req.request.method).toEqual('POST');

      expect(JSON.stringify(req.request.body)).toEqual('{"email":"user@service.com","password":"password","returnSecureToken":true}');
      req.flush(null);
    });

    describe('logout', () => {
      let router: Router;
      beforeEach(() => {
        router = TestBed.get(Router);
        spyOn(router, 'navigate').and.stub();
        spyOn(router, 'navigateByUrl').and.stub();
        service.logout();

      });

      it('clear local storage', () => {
        expect(localStorage.removeItem).toHaveBeenCalled();
      });

      it('clears the timer', () => {
        expect(service.clearTimer).toHaveBeenCalled();
      });

      it('dispatches the logout action to the store', () => {
        expect(store.dispatch).toHaveBeenCalledWith(AuthActions.LOGOUT());
      });

      it('navigates to the auth url', () => {
        expect(router.navigate).toHaveBeenCalledWith(['/auth']);
      });
    });
  
    it('autoLogin no user', () => {
      const user = service.autoLogin();
      expect(user).toEqual(undefined);
    });

    it('autoLogin with user', () => {
      const userStr = JSON.stringify(new User('user@user.com', '1', '2', new Date('1/1/2031')));
      spyOn(localStorage, 'getItem')
      .and.callFake((key) => {
        return userStr;
      });
      const user = service.autoLogin();
      expect(JSON.stringify(user)).toEqual(userStr);
    });    

    it('handleAuthentication', () => {   
      jasmine.clock().install();     
      
      jasmine.clock().mockDate(new Date(2021, 1, 1));
      const res: LoginResult = {
        email: 'user@user.com',
        idToken: '1',
        refreshToken: '2',
        expiresIn: '60',
        localId: '3'        
      };
      spyOn(localStorage, 'setItem');
      const expectedUser = new User('user@user.com','3','1',new Date(2021,1,1,0,1));
      const user = service.handleAuthentication(res);
      expect(localStorage.setItem).toHaveBeenCalled();      
      expect(user).toEqual(expectedUser);   
      jasmine.clock().uninstall();   
    }); 
    
    it('handleError with EMAIL_EXISTS handled message', () => {
      const errorResponse = new HttpErrorResponse({
        error: { error: {
          message: 'EMAIL_EXISTS'
        }},
        status: 404, statusText: 'Not Found'
      })            
      const errorMsg = service.handleError(errorResponse);
      expect(errorMsg).toEqual('Email already exists');
    });

    it('handleError with OPERATION_NOT_ALLOWED handled message', () => {
      const errorResponse = new HttpErrorResponse({
        error: { error: {
          message: 'OPERATION_NOT_ALLOWED'
        }},
        status: 404, statusText: 'Not Found'
      })            
      const errorMsg = service.handleError(errorResponse);
      expect(errorMsg).toEqual('Sign in disabled for this project');
    });

    it('handleError with TOO_MANY_ATTEMPTS_TRY_LATER handled message', () => {
      const errorResponse = new HttpErrorResponse({
        error: { error: {
          message: 'TOO_MANY_ATTEMPTS_TRY_LATER'
        }},
        status: 404, statusText: 'Not Found'
      })            
      const errorMsg = service.handleError(errorResponse);
      expect(errorMsg).toEqual('Too many attempts, try later');
    });    

    it('handleError with EMAIL_NOT_FOUND handled message', () => {
      const errorResponse = new HttpErrorResponse({
        error: { error: {
          message: 'EMAIL_NOT_FOUND'
        }},
        status: 404, statusText: 'Not Found'
      })            
      const errorMsg = service.handleError(errorResponse);
      expect(errorMsg).toEqual('Email not found');
    });    
    
    it('handleError with INVALID_PASSWORD handled message', () => {
      const errorResponse = new HttpErrorResponse({
        error: { error: {
          message: 'INVALID_PASSWORD'
        }},
        status: 404, statusText: 'Not Found'
      })            
      const errorMsg = service.handleError(errorResponse);
      expect(errorMsg).toEqual('Password is invalid');
    });    
    
    it('handleError with USER_DISABLED handled message', () => {
      const errorResponse = new HttpErrorResponse({
        error: { error: {
          message: 'USER_DISABLED'
        }},
        status: 404, statusText: 'Not Found'
      })            
      const errorMsg = service.handleError(errorResponse);
      expect(errorMsg).toEqual('User is disabled');
    });    

    it('handleError with unhandled message', () => {
      const errorResponse = new HttpErrorResponse({
        error: { error: {
          message: 'THIS_BROKE'
        }},
        status: 404, statusText: 'Not Found'
      })            
      const errorMsg = service.handleError(errorResponse);
      expect(errorMsg).toEqual('An error has occurred.');
    });    
    
  });

  describe('autoLogout', () => {
    let windowSpy : any;
    beforeEach(() => {
      service = TestBed.inject(AuthService);
      windowSpy = spyOn(window,'setTimeout');      
    });

    it('check global timer has been called', () => {
      service.autoLogout(5000);
      expect(setTimeout).toHaveBeenCalled();      
    });

    afterEach(() => {
      windowSpy.calls.reset();
    });    
  });

  describe('clearTimer', () => {
    let windowSpy : any;
    beforeEach(() => {
      service = TestBed.inject(AuthService);
      windowSpy = spyOn(window,'clearTimeout'); 
      // needs call through otherwise it will throw an error because the timer isn't actually cleared     
      windowSpy.and.callThrough();
    });

    it('check global clearTimer has been called', () => {
      service.autoLogout(5000);
      service.clearTimer();
      expect(clearTimeout).toHaveBeenCalled();
    });

    afterEach(() => {
      windowSpy.calls.reset();
    });
  });
  
    
  describe('Destructor tests', () => {
    beforeEach(() => {
      service = TestBed.inject(AuthService);
    });

    it('unsubscribe from subscription', () => {
      spyOn(service['subscription'], 'unsubscribe');
      service.ngOnDestroy();
      expect(service['subscription'].unsubscribe).toHaveBeenCalled();
    });
  });

});
