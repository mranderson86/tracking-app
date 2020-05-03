import {call, put, takeLatest} from 'redux-saga/effects';

import {loginSuccess, loginFailure} from './actions';
import {AuthenticationTypes} from './types';
import {api} from '../../../services/api';

function* loginRequestAsync({payload}: any) {
  try {
    const {email, password} = payload;
    // Requisita api de autenticação
    const response = yield call(api.post, 'sessions', {email, password});
    const {token} = response.data;

    // Autenticado com sucesso
    // Atualiza o token
    yield put(loginSuccess(token));
  } catch (error) {
    console.log('new error => ', error);

    yield put(loginFailure());
  }
}

// Generator: Watch Login Request
export function* watchLoginRequest() {
  // Take Last Action
  yield takeLatest(AuthenticationTypes.LOGIN_REQUEST, loginRequestAsync);
}
