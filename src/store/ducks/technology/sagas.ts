import {put, call, takeLatest} from 'redux-saga/effects';

import {technologySuccess, technologyFailure} from './actions';
import {TechnologyTypes, Technology} from './types';
import {api} from '../../../services/api';

function* TechnologiesRequestAsync({payload}: any) {
  try {
    const token = payload;
    const response = yield call(api.get, 'technologies/available', {
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

/***
 * Send Technologies marked for api server
 */
function* TechnologiesSaveAsync({payload}: any) {
  try {
    const {token, technologies} = payload;

    const technologiesSelected = technologies.filter(
      ({checked}: Technology) => checked === true,
    );

    let response = yield call(api.post, 'checkins', technologiesSelected, {
      headers: {authorization: `Bearer ${token}`},
    });

    if (response.data) {
      yield put({type: TechnologyTypes.TECHNOLOGY_REQUEST, payload: token});
    }
  } catch (error) {
    console.log(error);

    yield put(technologyFailure());
  }
}

export function* watchTechnologiesSave() {
  yield takeLatest(TechnologyTypes.TECHNOLOGY_SAVE, TechnologiesSaveAsync);
}
