import { all, put, call, fork, throttle, takeLatest } from 'redux-saga/effects';
import { loadPostsAPI, addPostAPI, uploadImagesAPI, removePostAPI, addCommentAPI, likePostAPI, unLikePostAPI, uploadVideoAPI } from './api/post';
import { 
  LOAD_POSTS_REQUEST, 
  LOAD_POSTS_SUCCESS, 
  LOAD_POSTS_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS, 
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_FAILURE,
  REMOVE_POST_SUCCESS,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE, 
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_SUCCESS,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAILURE} from '../reducers/constants/post';
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

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data
    });
  } catch(error) {
    console.error(error);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: error.response.data
    });
  }
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data
    });
  } catch(error) {
    console.error(error);
    yield put({
      type: LIKE_POST_FAILURE,
      error: error.response.data
    });
  }
}

function* unlikePost(action) {
  try {
    const result = yield call(unLikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data
    });
  } catch(error) {
    console.error(error);
    yield put({
      type: UNLIKE_POST_FAILURE,
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

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

function* uploadVideo(action) {
  try {
    const result = yield call(uploadVideoAPI, action.data);
    yield put({
      type: UPLOAD_VIDEO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_VIDEO_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchUploadVideo() {
  yield takeLatest(UPLOAD_VIDEO_REQUEST, uploadVideo);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchRemovePost),
    fork(watchUploadImages),
    fork(watchUploadVideo)
  ]);
}