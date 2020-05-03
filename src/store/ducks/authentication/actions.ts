import {action} from 'typesafe-actions';
import {AuthenticationTypes, Login} from './types';

import {SignInData} from '../../../data/sign-in.model';

/**
 * Action Request Login
 */
export const loginRequest = (data: SignInData) =>
  action(AuthenticationTypes.LOGIN_REQUEST, {data});

/**
 * Action Success Login
 */
export const loginSuccess = (token: String) =>
  action(AuthenticationTypes.LOGIN_SUCCESS, {token});

/**
 * Action Failure Login
 */
export const loginFailure = () => action(AuthenticationTypes.LOGIN_FAILURE);
