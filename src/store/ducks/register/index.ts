import {Reducer} from 'redux';
import {RegisterTypes, ProfileState} from './types';

/**
 * Estado inicial de autenticação do usuário
 */
const INITIAL_STATE: ProfileState = {
  profile: {
    username: '',
    email: '',
  },
  loading: false,
  error: false,
};

const reducer: Reducer<ProfileState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RegisterTypes.REGISTER_REQUEST:
      return {...state, loading: true, error: false};
    case RegisterTypes.REGISTER_SUCCESS:
      const {profile} = action.payload;

      return {
        ...state,
        profile,
        loading: false,
        error: false,
      };
    case RegisterTypes.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case RegisterTypes.PROFILE_UPDATE:
      return {...state, loading: true, error: false};
    case RegisterTypes.REGISTER_FAILURE_RESET:
      return {...state, error: false};
    default:
      return state;
  }
};

export default reducer;
