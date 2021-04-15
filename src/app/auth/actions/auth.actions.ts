import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { loginUser } from '../models/loginUser.model';
import { loginResult } from '../models/loginResult.model'

const namespace = '[Auth] '

export const SIGNUP_START = createAction(
    namespace + 'Signup Start',
    props<{signup: loginUser}>()
);

export const LOGIN_START = createAction(
    namespace + 'Login Start',
    props<{signup: loginUser}>()
);

export const LOGIN_RESPONSE = createAction(
    namespace + 'Login Response',
    props<{user: loginResult}>()
);

export const LOGIN_SUCCESS = createAction(
    namespace + 'Login Success',
    props<{user: User}>()
);

export const AUTOLOGIN_START = createAction(
    namespace + 'Auto Login Start'
);

export const AUTOLOGIN_SUCCESS = createAction(
    namespace + 'Auto Login Success',
    props<{user: User}>()
);

export const LOGIN_FAILURE = createAction(
    namespace + 'Login Failure',
    props<{error: string}>()
);

export const LOGOUT = createAction(
    namespace + 'Logout'    
);

export const NOT_LOGGED_IN = createAction(namespace + 'Not Logged In');