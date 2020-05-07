import {call, put, takeLatest} from 'redux-saga/effects';

import {registerSuccess, registerFailure} from './actions';
import {RegisterTypes, Profile} from './types';
import {api} from '../../../services/api';

import {loginRequest} from '../authentication/actions';
import {LoginTypes} from '../authentication/types';
import {SignInData} from '../../../data/sign-in.model';

function* registerRequestAsync({payload}: any) {
  try {
    const {email, username, password} = payload;

    // Requisição de Cadastro
    const response = yield call(api.post, 'users', {
      email,
      username,
      password,
    });

    const {data} = response;

    if (data) {
      const profile: Profile = {
        username,
        email,
      };

      // Cadastrado com sucesso
      yield put(registerSuccess(profile));

      const user: SignInData = {
        email,
        password,
      };

      // Gera token de autenticação
      yield put({type: LoginTypes.LOGIN_REQUEST, payload: user});
    }
  } catch (error) {
    console.log('RegisterRequest  => ', error);

    yield put(registerFailure());
  }
}

// Generator: Watch Register Request
export function* watchRegisterRequest() {
  // Take Last Action
  yield takeLatest(RegisterTypes.REGISTER_REQUEST, registerRequestAsync);
}
