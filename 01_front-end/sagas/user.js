import { all, fork, takeLatest, put, call } from 'redux-saga/effects';

import { 
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS, 
  SIGN_UP_FAILURE 
} from '../reducers/constants/user';
import { signupAPI } from './api/user';

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

function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, singup);
}

export default function* userSaga() {
  yield all([
    fork(watchSignup)
  ]);
}
