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
      const user: SignInData = {
        email,
        password,
      };

      // Gera token de autenticação
      yield put({type: LoginTypes.LOGIN_REQUEST, payload: user});
    }
  } catch (error) {
    yield put(registerFailure());
  }
}

// Generator: Watch Register Request
export function* watchRegisterRequest() {
  // Take Last Action
  yield takeLatest(RegisterTypes.REGISTER_REQUEST, registerRequestAsync);
}

/**
 * Consulta perfil do usuário
 */
function* profileRequestAsync({payload}: any) {
  try {
    const {token} = payload;

    // Requisição de perfil
    const response = yield call(api.get, 'users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const {data} = response;

    if (data) {
      const profile: Profile = {
        username: data.username,
        email: data.email,
      };

      // Cadastrado com sucesso
      yield put(registerSuccess(profile));
    }
  } catch (error) {
    yield put(registerFailure());
  }
}

// Watch Profile Request
export function* watchProfileRequest() {
  // Take Last Action
  yield takeLatest(RegisterTypes.PROFILE_REQUEST, profileRequestAsync);
}

/**
 * Atualiza perfil do usuário
 */
function* profileUpdateAsync({payload}: any) {
  try {
    const {token, profile} = payload;
    // Requisição de perfil
    const response = yield call(api.put, 'users', profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const {data} = response;

    if (data) {
      // Atualizado com sucesso
      yield put(registerSuccess(profile));
    }
  } catch (error) {
    yield put(registerFailure());
  }
}

// Watch Profile Request
export function* watchProfileUpdate() {
  // Take Last Action
  yield takeLatest(RegisterTypes.PROFILE_UPDATE, profileUpdateAsync);
}
