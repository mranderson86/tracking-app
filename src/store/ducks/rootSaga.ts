import {all, fork} from 'redux-saga/effects';

import {watchLoginRequest} from './authentication/sagas';
import {watchRegisterRequest} from './register/sagas';
import {
  watchTechnologiesRequest,
  watchTechnologiesSave,
} from './technology/sagas';

import {watchUsersTechnologyRequest} from './users-technology/sagas';
import {watchTechnologiesUserRequest} from './technologies-user/sagas';

export default function* rootSaga() {
  return yield all([
    fork(watchLoginRequest),
    fork(watchRegisterRequest),
    fork(watchTechnologiesRequest),
    fork(watchTechnologiesSave),
    fork(watchUsersTechnologyRequest),
    fork(watchTechnologiesUserRequest),
  ]);
}
