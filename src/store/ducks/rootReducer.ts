import {combineReducers} from 'redux';

import Authentication from './authentication';
import Register from './register';
import Technology from './technology';

/**
 * Agrupa reducers da aplicação
 */
export default combineReducers({
  Authentication,
  Register,
  Technology,
});
