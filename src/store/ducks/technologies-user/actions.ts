import {action} from 'typesafe-actions';
import {TechnologiesUserTypes, TechnologiesUser} from './types';

/**
 * Users Technology Request API Load
 */
export const technologiesUserRequest = (token: string) =>
  action(TechnologiesUserTypes.TECHNOLOGIES_USER_REQUEST, {token});

/**
 * SUCCESS Update State Technologies User
 * @param technologiesUser
 */
export const technologiesUserSuccess = (technologiesUser: TechnologiesUser[]) =>
  action(TechnologiesUserTypes.TECHNOLOGIES_USER_SUCCESS, {technologiesUser});

/**
 * Users Technology Request API Failure
 */
export const technologiesUserFailure = () =>
  action(TechnologiesUserTypes.TECHNOLOGIES_USER_FAILURE);
