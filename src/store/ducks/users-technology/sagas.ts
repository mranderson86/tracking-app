import {put, call, takeLatest} from 'redux-saga/effects';

import {usersTechnologySuccess, usersTechnologyFailure} from './actions';
import {UsersTechnologyTypes, UsersTechnology} from './types';
import {api} from '../../../services/api';

function* UsersTechnologyRequestAsync({payload}: any) {
  try {
    const token = payload;
    const response = yield call(api.get, 'technologies/users', {
      headers: {authorization: `Bearer ${token}`},
    });

    const usersTechnology: UsersTechnology[] = response.data;

    yield put(usersTechnologySuccess(usersTechnology));
  } catch (error) {
    yield put(usersTechnologyFailure());
  }
}

export function* watchUsersTechnologyRequest() {
  yield takeLatest(
    UsersTechnologyTypes.USERS_TECHNOLOGY_REQUEST,
    UsersTechnologyRequestAsync,
  );
}
