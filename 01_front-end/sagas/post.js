import { all, put, call, fork, throttle, takeLatest } from 'redux-saga/effects';
import { loadPostsAPI, addPostAPI } from './api/post';
import { 
  LOAD_POSTS_REQUEST, 
  LOAD_POSTS_SUCCESS, 
  LOAD_POSTS_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS, 
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_FAILURE,
  REMOVE_POST_SUCCESS } from '../reducers/constants/post';
import {
  ADD_POST_TO_ME, 
  REMOVE_POST_OF_ME } from '../reducers/constants/user';


function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data
    });
  } catch(error) {
    console.error(error);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: error.response.data
    });
  }
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch(error) {
    console.error(error);
    yield put({
      type: ADD_POST_FAILURE,
      error: error.response.data
    });
  }
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data
    });
  } catch(error) {
    console.error(error);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: error.response.data
    });
  }
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost)
  ]);
}