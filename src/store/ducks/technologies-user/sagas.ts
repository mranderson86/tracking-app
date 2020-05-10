import {put, call, takeLatest} from 'redux-saga/effects';

import {technologiesUserSuccess, technologiesUserFailure} from './actions';
import {TechnologiesUserTypes, TechnologiesUser} from './types';
import {api} from '../../../services/api';

function* TechnologiesUserRequestAsync({payload}: any) {
  try {
    const token = payload;
    const response = yield call(api.get, 'users/technologies', {
      headers: {authorization: `Bearer ${token}`},
    });

    const technologiesUser: TechnologiesUser[] = response.data;

    yield put(technologiesUserSuccess(technologiesUser));
  } catch (error) {
    console.log(error);

    yield put(technologiesUserFailure());
  }
}

export function* watchTechnologiesUserRequest() {
  yield takeLatest(
    TechnologiesUserTypes.TECHNOLOGIES_USER_REQUEST,
    TechnologiesUserRequestAsync,
  );
}
