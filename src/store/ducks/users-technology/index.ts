import {Reducer} from 'redux';

import {UsersTechnologyState, UsersTechnologyTypes} from './types';

const INITIAL_STATE: UsersTechnologyState = {
  usersTechnology: [],
  loading: false,
  error: false,
};

/**
 * Redux Users Technology State
 */
const reducer: Reducer<UsersTechnologyState> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case UsersTechnologyTypes.USERS_TECHNOLOGY_REQUEST:
      return {...state, loading: true, error: false};
    case UsersTechnologyTypes.USERS_TECHNOLOGY_SUCCESS: {
      const {usersTechnology} = action.payload;

      return {...state, loading: false, usersTechnology};
    }

    case UsersTechnologyTypes.USERS_TECHNOLOGY_FAILURE: {
      return {...state, loading: false, error: true};
    }
    default:
      return state;
  }
};

export default reducer;
