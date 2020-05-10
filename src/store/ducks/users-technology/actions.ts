import {action} from 'typesafe-actions';
import {UsersTechnologyTypes, UsersTechnology} from './types';

/**
 * Users Technology Request API Load
 */
export const usersTechnologyRequest = (token: string) =>
  action(UsersTechnologyTypes.USERS_TECHNOLOGY_REQUEST, {token});

export const usersTechnologySuccess = (usersTechnology: UsersTechnology[]) =>
  action(UsersTechnologyTypes.USERS_TECHNOLOGY_SUCCESS, {usersTechnology});

/**
 * Users Technology Request API Failure
 */
export const usersTechnologyFailure = () =>
  action(UsersTechnologyTypes.USERS_TECHNOLOGY_FAILURE);
