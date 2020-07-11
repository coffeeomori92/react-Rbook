import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user';
import postSaga from './post';
import { BACK_END_URL } from '../config/config';

axios.defaults.baseURL = BACK_END_URL || 'http://localhost:8080';
axios.defaults.withCredentials = true;

console.log('axios.defaults.baseURL', axios.defaults.baseURL);

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(postSaga)
  ]);
};