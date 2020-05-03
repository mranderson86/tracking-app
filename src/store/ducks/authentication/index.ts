import {Reducer} from 'redux';
import {AuthenticationState, AuthenticationTypes} from './types';

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
    case AuthenticationTypes.LOGIN_REQUEST:
      return {...state, error: false, loading: true};
    case AuthenticationTypes.LOGIN_SUCCESS:
      const {token} = action.payload;

      return {
        ...state,
        isLogged: true,
        loading: false,
        error: false,
        token,
      };
    case AuthenticationTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLogged: false,
        loading: false,
        error: true,
        token: '',
      };
    default:
      return state;
  }
};

export default reducer;
