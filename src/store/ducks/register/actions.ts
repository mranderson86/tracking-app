import {action} from 'typesafe-actions';
import {RegisterTypes, Profile} from './types';

import {SignInData} from '../../../data/sign-in.model';

/**
 * Action Register Request User
 */
export const registerRequest = (register: SignInData) =>
  action(RegisterTypes.REGISTER_REQUEST, {register});

/**
 * Action Register Success User
 */
export const registerSuccess = (profile: Profile) =>
  action(RegisterTypes.REGISTER_SUCCESS, {profile});

/**
 *  Action Register Failure User
 */
export const registerFailure = () => action(RegisterTypes.REGISTER_FAILURE);
