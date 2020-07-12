import produce from '../util/ES5_produce';
import { 
  LOAD_POSTS_REQUEST, 
  LOAD_POSTS_SUCCESS, 
  LOAD_POSTS_FAILURE, 
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  SHARE_POST_REQUEST,
  SHARE_POST_SUCCESS,
  SHARE_POST_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE
} from './constants/post';
export const initialState = {
  mainPosts: [],
  singlePost: null,
  imagePaths: [],
  videoPaths: [],
  hasMorePosts: true,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  sharePostLoading: false,
  sharePostDone: false,
  sharePostError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
};

const reducer = (state = initialState, action) => produce(state, draft => {
  switch (action.type) {
    case LOAD_POSTS_REQUEST:
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostError = null;
      break;
    case LOAD_POSTS_SUCCESS:
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      draft.mainPosts = draft.mainPosts.concat(action.data);
      draft.hasMorePosts = action.data.length === 10;
      break;
    case LOAD_POSTS_FAILURE:
      draft.loadPostsLoading = false;
      draft.loadPostsDone = false;
      draft.loadPostsError = action.error;
      break;
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.mainPosts.unshift(action.data);
      draft.imagePaths = [];
      draft.videoPath = [];
      break;
    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostError = action.error;
      break;
    case REMOVE_POST_REQUEST:
      draft.removePostLoading = true;
      draft.removePostDone = false;
      draft.removePostError = null;
      break;
    case REMOVE_POST_SUCCESS:
      draft.removePostLoading = false;
      draft.removePostDone = true;
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
      break;
    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false;
      draft.removePostError = action.error;
      break;
    case UPLOAD_IMAGES_REQUEST:
      draft.uploadImagesLoading = true;
      draft.uploadImagesDone = false;
      draft.uploadImagesError = null;
      break;
    case UPLOAD_IMAGES_SUCCESS: {
      draft.imagePaths = draft.imagePaths.concat(action.data);
      draft.uploadImagesLoading = false;
      draft.uploadImagesDone = true;
      break;
    }
    case UPLOAD_IMAGES_FAILURE:
      draft.uploadImagesLoading = false;
      draft.uploadImagesDone = false;
      draft.uploadImagesError = action.error;
      break;
    case SHARE_POST_REQUEST:
      draft.sharePostLoading = true;
      draft.sharePostDone = false;
      draft.sharePostError = null;
      break;
    case SHARE_POST_SUCCESS: {
      draft.sharePostLoading = false;
      draft.sharePostDone = true;
      draft.mainPosts.unshift(action.data);
      break;
    }
    case SHARE_POST_FAILURE:
      draft.sharePostLoading = false;
      draft.sharePostDone = false;
      draft.sharePostError = action.error;
      break;
  }
});

export default reducer;