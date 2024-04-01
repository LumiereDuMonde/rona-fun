import * as AuthActions from '../actions/auth.actions';
import * as fromReducer from './auth.reducer';

import { LoginUser } from '../models/loginUser.model';
import { User } from 'src/app/models/user.model';

describe('Auth slice of the Auth Reducer', () => {
    
    describe('Actions', () => {

        it('unknown action', () => {
            const { initialState } = fromReducer;
            const action = {
                type: 'Unknown',
            };
            const state = fromReducer.reducer(initialState, action);

            expect(state).toBe(initialState);
        });

        it('SIGNUP_START action', () => {
            const { initialState } = fromReducer;
            const newState = {
                user: null,
                loading: true,
                loggedIn: false,
                errorMsg: null,
                redirectUrl: null
            };
            const action = AuthActions.SIGNUP_START({signup: new LoginUser('user@user.com', 'password')});
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });

        it('LOGIN_START action', () => {
            const { initialState } = fromReducer;
            const newState = {
                user: null,
                loading: true,
                loggedIn: false,
                errorMsg: null,
                redirectUrl: null
            };
            const action = AuthActions.LOGIN_START({signup: new LoginUser('user@user.com', 'password')});
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });        


        it('LOGIN_SUCCESS action', () => {
            const user = new User('user@user.com', '1', 'token', new Date('01/01/2031'));
            const { initialState } = fromReducer;
            const newState = {
                user: user,
                loading: false,
                loggedIn: true,
                errorMsg: null,
                redirectUrl: null
            };
            const action = AuthActions.LOGIN_SUCCESS({ user });
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });       
        
        it('AUTOLOGIN_SUCCESS action', () => {
            const user = new User('user@user.com', '1', 'token', new Date('01/01/2031'));
            const { initialState } = fromReducer;
            const newState = {
                user: user,
                loading: false,
                loggedIn: true,
                errorMsg: null,
                redirectUrl: null
            };
            const action = AuthActions.AUTOLOGIN_SUCCESS({ user });
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });     
        
        it('LOGOUT action', () => {
            const { initialState } = fromReducer;
            const PreviousState = {
                user: null,
                loading: true,
                loggedIn: false,
                errorMsg: null,
                redirectUrl: null
            };
            const action = AuthActions.LOGOUT();
            const state = fromReducer.reducer(PreviousState, action);

            expect(state).toEqual(initialState);
            expect(state).not.toBe(initialState);
        });   
        
        it('LOGIN_FAILURE action', () => {
            const initialState  = {
                user: null,
                loading: true,
                loggedIn: false,
                errorMsg: null,
                redirectUrl: null
            };
            const newState = {
                user: null,
                loading: false,
                loggedIn: false,
                errorMsg: 'Test',
                redirectUrl: null
            };
            const action = AuthActions.LOGIN_FAILURE({error: 'Test'});
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });        

    });

    describe('Getters', () => {
        let state;
        let user: User;
        beforeEach(() => {
            user = new User('user@user.com', '1', 'token', new Date('01/01/2031'));            
            state = {
                user: user,
                loading: false,
                loggedIn: true,
                errorMsg: 'error',
                redirectUrl: '/trading'                
            };            
        });
        
        it('getUser', () => {
            expect(fromReducer.getUser(state)).toBe(user);
        });

        it('getLoggedIn', () => {
            expect(fromReducer.getLoggedIn(state)).toBe(true);
        });
        
        it('getLoading', () => {
            expect(fromReducer.getLoading(state)).toBe(false);
        });
        
        it('getError', () => {
            expect(fromReducer.getError(state)).toBe('error');
        });  
        
        it('getRedirectUrl', () => {
            expect(fromReducer.getRedirectUrl(state)).toBe('/trading');
        });  

    });
    
});