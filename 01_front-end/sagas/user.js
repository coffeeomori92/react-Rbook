import { all, fork, takeLatest, put, call } from 'redux-saga/effects';

import { 
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS, 
  SIGN_UP_FAILURE, 
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS
} from '../reducers/constants/user';
import { signupAPI, loginAPI } from './api/user';

function* singup(action) {
  try {
    const result = yield call(signupAPI,action.data);
    console.log(result);
    yield put({
      type: SIGN_UP_SUCCESS
    });
  } catch(error) {
    console.error(error);
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data
    });
  }
}

function* login(action) {
  try {
    console.log('action.data', action.data);
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data
    });
  } catch(error) {
    console.error(error);
    yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data
    });
  }
}

function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, singup);
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

export default function* userSaga() {
  yield all([
    fork(watchSignup),
    fork(watchLogin)
  ]);
}
