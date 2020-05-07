import {combineReducers} from 'redux';

import Authentication from './authentication';
import Register from './register';

/**
 * Agrupa reducers da aplicação
 */
export default combineReducers({
  Authentication,
  Register,
});
