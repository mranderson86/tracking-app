import {all, fork} from 'redux-saga/effects';

import {watchLoginRequest} from './authentication/sagas';

export default function* rootSaga() {
  return yield all([fork(watchLoginRequest)]);
}
