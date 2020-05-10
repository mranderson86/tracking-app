/**
 * Technology Action Types
 */
export enum TechnologiesUserTypes {
  TECHNOLOGIES_USER_REQUEST = '@technologies_user/REQUEST',
  TECHNOLOGIES_USER_SUCCESS = '@technologies_user/SUCCESS',
  TECHNOLOGIES_USER_FAILURE = '@technologies_user/FAILURE',
}

export interface Technology {
  id: number;
  technology: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

/**
 * Technologies User Data
 */
export interface TechnologiesUser extends User {
  technologies: Technology[];
}

/**
 * Technologies User State
 */
export interface TechnologiesUserState {
  technologiesUser: TechnologiesUser[];
  loading: boolean;
  error: boolean;
}
