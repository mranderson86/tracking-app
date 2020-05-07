import {action} from 'typesafe-actions';
import {LoginTypes, LogoutTypes} from './types';

import {SignInData} from '../../../data/sign-in.model';

/**
 * Action Request Login
 */
export const loginRequest = (user: SignInData) =>
  action(LoginTypes.LOGIN_REQUEST, {user});

/**
 * Action Success Login
 */
export const loginSuccess = (token: String) =>
  action(LoginTypes.LOGIN_SUCCESS, {token});

/**
 * Action Failure Login
 */
export const loginFailure = () => action(LoginTypes.LOGIN_FAILURE);

/**
 * Action Request Logout
 */
export const logoutRequest = () => action(LogoutTypes.LOGOUT_REQUEST);
