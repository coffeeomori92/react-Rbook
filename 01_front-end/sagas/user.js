import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import { 
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS, 
  SIGN_UP_FAILURE, 
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_FAILURE,
  UNSUBSCRIBE_SUCCESS,
  UNSUBSCRIBE_FAILURE,
  SUBSCRIBE_REQUEST,
  UNSUBSCRIBE_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  LOAD_SUBSCRIBER_REQUEST,
  LOAD_PRODUCER_REQUEST,
  LOAD_SUBSCRIBER_FAILURE,
  LOAD_SUBSCRIBER_SUCCESS,
  LOAD_PRODUCER_SUCCESS,
  LOAD_PRODUCER_FAILURE
} from '../reducers/constants/user';
import { 
  signupAPI, 
  loginAPI, 
  logoutAPI, 
  loadMyInfoAPI, 
  loadUserAPI,
  changeNicknameAPI,
  unSubscribeAPI,
  subscribeAPI,
  loadProducerAPI,
  loadSubscriberAPI} from './api/user';

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

function* logout() {
  try {
    yield call(logoutAPI);
    yield put({
      type: LOG_OUT_SUCCESS
    });
  } catch(error) {
    console.error(error);
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data
    });
  }
}

function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data
    });
  } catch(error) {
    console.error(error);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: error.response.data
    });
  }
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    });
  }
}

function* loadSubscriber(action) {
  try {
    const result = yield call(loadSubscriberAPI, action.data);
    yield put({
      type: LOAD_SUBSCRIBER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_SUBSCRIBER_FAILURE,
      error: err.response.data,
    });
  }
}

function* loadProducer(action) {
  try {
    const result = yield call(loadProducerAPI, action.data);
    yield put({
      type: LOAD_PRODUCER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_PRODUCER_FAILURE,
      error: err.response.data,
    });
  }
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: err.response.data,
    });
  }
}

function* subscribe(action) {
  try {
    const result = yield call(subscribeAPI, action.data);
    yield put({
      type: SUBSCRIBE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SUBSCRIBE_FAILURE,
      error: err.response.data,
    });
  }
}

function* unSubscribe(action) {
  try {
    const result = yield call(unSubscribeAPI, action.data);
    yield put({
      type: UNSUBSCRIBE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNSUBSCRIBE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, singup);
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchLoadSubscriber() {
  yield takeLatest(LOAD_SUBSCRIBER_REQUEST, loadSubscriber);
}

function* watchLoadProducer() {
  yield takeLatest(LOAD_PRODUCER_REQUEST, loadProducer);
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchSubscribe() {
  yield takeLatest(SUBSCRIBE_REQUEST, subscribe);
}

function* watchUnSubscribe() {
  yield takeLatest(UNSUBSCRIBE_REQUEST, unSubscribe);
}

export default function* userSaga() {
  yield all([
    fork(watchSignup),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchLoadMyInfo),
    fork(watchLoadUser),
    fork(watchLoadSubscriber),
    fork(watchLoadProducer),
    fork(watchChangeNickname),
    fork(watchSubscribe),
    fork(watchUnSubscribe)
  ]);
}
