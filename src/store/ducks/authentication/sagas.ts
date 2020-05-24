import {call, put, takeLatest} from 'redux-saga/effects';

import {loginSuccess, loginFailure} from './actions';
import {profileRequest} from '../register/actions';

import {LoginTypes} from './types';
import {api} from '../../../services/api';

function* loginRequestAsync({payload}: any) {
  try {
    const {email, password} = payload;

    // Requisita api de autenticação
    const response = yield call(api.post, 'sessions', {email, password});

    const {token} = response.data;

    // Consulta o perfil do usuário
    yield put(profileRequest(token));

    // Autenticado com sucesso
    // Atualiza o token
    yield put(loginSuccess(token));
  } catch (error) {
    yield put(loginFailure());
  }
}

// Generator: Watch Login Request
export function* watchLoginRequest() {
  // Take Last Action
  yield takeLatest(LoginTypes.LOGIN_REQUEST, loginRequestAsync);
}
