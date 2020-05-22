/**
 * Action Types
 */
export enum LoginTypes {
  LOGIN_REQUEST = '@authentication/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@authentication/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@authentication/LOGIN_FAILURE',
  LOGIN_FAILURE_RESET = '@authentication/LOGIN_FAILURE_RESET',
}

export enum LogoutTypes {
  LOGOUT_REQUEST = '@authentication/LOGOUT_REQUEST',
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
