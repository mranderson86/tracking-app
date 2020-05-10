/**
 * Technology Action Types
 */
export enum UsersTechnologyTypes {
  USERS_TECHNOLOGY_REQUEST = '@users_technology/REQUEST',
  USERS_TECHNOLOGY_SUCCESS = '@users_technology/SUCCESS',
  USERS_TECHNOLOGY_FAILURE = '@users_technology/FAILURE',
}

export interface User {
  id: number;
  username: string;
  email: string;
}

/**
 * Technology Data
 */
export interface UsersTechnology {
  id: number;
  technology: string;
  users: User[];
}

/**
 * Technologies State
 */
export interface UsersTechnologyState {
  usersTechnology: UsersTechnology[];
  loading: boolean;
  error: boolean;
}
