import {Reducer} from 'redux';
import {AuthenticationState, LoginTypes, LogoutTypes} from './types';

/**
 * Estado inicial de autenticação do usuário
 */
const INITIAL_STATE: AuthenticationState = {
  token: '',
  isLogged: false,
  loading: false,
  error: false,
};

const reducer: Reducer<AuthenticationState> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case LoginTypes.LOGIN_REQUEST:
      return {...state, error: false, loading: true};
    case LoginTypes.LOGIN_SUCCESS:
      const {token} = action.payload;

      return {
        ...state,
        isLogged: true,
        loading: false,
        error: false,
        token,
      };
    case LoginTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLogged: false,
        loading: false,
        error: true,
        token: '',
      };
    case LogoutTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isLogged: false,
        loading: false,
        error: false,
        token: '',
      };
    default:
      return state;
  }
};

export default reducer;
