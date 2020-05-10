import {createStore, applyMiddleware, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {AuthenticationState} from './ducks/authentication/types';
import {ProfileState} from './ducks/register/types';
import {TechnologyState} from './ducks/technology/types';
import {UsersTechnologyState} from './ducks/users-technology/types';
import {TechnologiesUserState} from './ducks/technologies-user/types';

import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

export interface ApplicationState {
  Authentication: AuthenticationState;
  Register: ProfileState;
  Technology: TechnologyState;
  UsersTechnology: UsersTechnologyState;
  TechnologiesUser: TechnologiesUserState;
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;
