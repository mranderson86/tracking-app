import {put, call, takeLatest} from 'redux-saga/effects';

import {technologySuccess, technologyFailure} from './actions';
import {TechnologyTypes} from './types';
import {api} from '../../../services/api';

function* TechnologiesRequestAsync({payload}: any) {
  try {
    console.log('Request Technologies', payload);

    const token = payload;
    const response = yield call(api.get, 'technologies', {
      headers: {authorization: `Bearer ${token}`},
    });

    const technologies = response.data;

    yield put(technologySuccess(technologies));
  } catch (error) {
    console.log(error);

    yield put(technologyFailure());
  }
}

export function* watchTechnologiesRequest() {
  yield takeLatest(
    TechnologyTypes.TECHNOLOGY_REQUEST,
    TechnologiesRequestAsync,
  );
}
