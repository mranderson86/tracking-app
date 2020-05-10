import {Reducer} from 'redux';

import {TechnologiesUserState, TechnologiesUserTypes} from './types';

const INITIAL_STATE: TechnologiesUserState = {
  technologiesUser: [],
  loading: false,
  error: false,
};

/**
 * Redux Technologies User State
 */
const reducer: Reducer<TechnologiesUserState> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case TechnologiesUserTypes.TECHNOLOGIES_USER_REQUEST: {
      return {...state, loading: true, error: false};
    }

    case TechnologiesUserTypes.TECHNOLOGIES_USER_SUCCESS: {
      const {technologiesUser} = action.payload;

      return {...state, loading: false, technologiesUser};
    }

    case TechnologiesUserTypes.TECHNOLOGIES_USER_FAILURE: {
      return {...state, loading: false, error: true};
    }

    default:
      return state;
  }
};

export default reducer;
