import {action} from 'typesafe-actions';

import {TechnologyTypes, Technology} from './types';

/**
 * Technology Request Loading
 */
export const technologyRequest = (token: string) =>
  action(TechnologyTypes.TECHNOLOGY_REQUEST, {token});

export const technologySuccess = (technologies: Technology[]) =>
  action(TechnologyTypes.TECHNOLOGY_SUCCESS, {technologies});

/**
 * Request Technologies API Failure
 */
export const technologyFailure = () =>
  action(TechnologyTypes.TECHNOLOGY_FAILURE);

/**
 * Change check value of technology
 */
export const technologyChecked = (technology: Technology) =>
  action(TechnologyTypes.TECHNOLOGY_CHECKED, {technology});

/**
 * Send technologies for api save
 * @param technologies
 */
export const technologySave = (technologies: Technology[], token: string) =>
  action(TechnologyTypes.TECHNOLOGY_SAVE, {technologies});
