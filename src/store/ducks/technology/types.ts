/**
 * Technology Action Types
 */
export enum TechnologyTypes {
  TECHNOLOGY_REQUEST = '@technology/REQUEST',
  TECHNOLOGY_SUCCESS = '@technology/SUCCESS',
  TECHNOLOGY_FAILURE = '@technology/FAILURE',
  TECHNOLOGY_CHECKED = '@technology/CHECKED',
}

/**
 * Technology Data
 */
export interface Technology {
  id: number;
  technology: string;
  checked: boolean;
}

/**
 * Technologies State
 */
export interface TechnologyState {
  technologies: Technology[];
  loading: boolean;
  error: boolean;
}
