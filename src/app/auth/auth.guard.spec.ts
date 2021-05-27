import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { User } from '../models/user.model';
import { AuthGuard } from './auth.guard';
import * as AuthActions from './actions/auth.actions';

describe('Auth Guard', () => {
  let guard: AuthGuard;
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
        // any modules needed
        RouterTestingModule
      ],
      providers: [
        AuthGuard,
        provideMockStore({ initialState }),
        { provider: ActivatedRouteSnapshot, useValue: {} }
        // other providers
      ],
    });

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
    guard = TestBed.inject(AuthGuard);
  });

  it('should return false if the user state is not logged in', () => {
    guard.canActivate(null, {url: '/trading'} as RouterStateSnapshot).subscribe((result) => {
      expect(result).toBe(false);
      expect(store.dispatch).toHaveBeenCalledWith(AuthActions.NOT_LOGGED_IN({ url: '/trading' }));
    });

  });

  it('should return true if the user state is logged in', () => {
    const user = new User('user@service.com', 'username', 'token', new Date('01/01/2031'));
    const stateWithUser = {
      auth: {
        authState: {
          user: user,
          loading: false,
          loggedIn: true,
          errorMsg: null
        }
      },
    };
    store.setState(stateWithUser);
    guard.canActivate(null, null).subscribe((result) => {
      expect(result).toBe(true);
    });

  });

  it('check if CanActivateChild returns an expected result', () => {
    guard.canActivateChild(null, {url: '/trading'} as RouterStateSnapshot).subscribe((result) => {
      expect(result).toBe(false);
      expect(store.dispatch).toHaveBeenCalledWith(AuthActions.NOT_LOGGED_IN({ url: '/trading' }));
    });
  });
});