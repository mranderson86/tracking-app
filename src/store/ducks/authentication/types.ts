/**
 * Action Types
 */
export enum AuthenticationTypes {
  LOGIN_REQUEST = '@authentication/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@authentication/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@authentication/LOGIN_FAILURE',
}

/**
 * Data Types
 */

export interface Login {
  email: String;
  password: String;
}

export interface Profile extends Login {
  username: String;
}

/**
 * State Type
 */
export interface AuthenticationState {
  readonly token: string;
  readonly isLogged: boolean;
  readonly loading: boolean;
  readonly error: boolean;
}
