import {combineReducers} from 'redux';

import Authentication from './authentication';
import Register from './register';
import Technology from './technology';
import UsersTechnology from './users-technology';
import TechnologiesUser from './technologies-user';

/**
 * Agrupa reducers da aplicação
 */
export default combineReducers({
  Authentication,
  Register,
  Technology,
  UsersTechnology,
  TechnologiesUser,
});
