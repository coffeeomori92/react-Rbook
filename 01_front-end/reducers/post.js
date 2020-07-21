import produce from '../util/ES5_produce';
import initialState from './initialState/post';
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
  UPLOAD_IMAGES_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  REMOVE_IMAGE,
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_SUCCESS
} from './constants/post';

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
    case ADD_COMMENT_REQUEST:
      draft.addCommentDone = false;
      draft.addCommentLoading = true;
      draft.addCommentError = null;
      break;
    case ADD_COMMENT_SUCCESS: {
      const post = draft.mainPosts.find(v => v.id === action.data.PostId);
      post.Comments.unshift(action.data);
      draft.addCommentDone = true;
      draft.addCommentLoading = false;
      draft.addCommentError = null;
      break;
    }
    case ADD_COMMENT_FAILURE:
      draft.addCommentDone = false;
      draft.addCommentLoading = false;
      draft.addCommentError = action.error;
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
    case UPLOAD_VIDEO_REQUEST:
      draft.uploadVideoLoading = true;
      draft.uploadVideoDone = false;
      draft.uploadVideoError = null;
      break;
    case UPLOAD_VIDEO_SUCCESS: {
      draft.videoPaths = draft.videoPaths.concat(action.data);
      draft.uploadVideoLoading = false;
      draft.uploadVideoDone = true;
      break;
    }
    case UPLOAD_VIDEO_FAILURE:
      draft.uploadVideoLoading = false;
      draft.uploadVideoDone = false;
      draft.uploadVideoError = action.error;
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
    case LIKE_POST_REQUEST:
      draft.likePostLoading = true;
      draft.likePostDone = false;
      draft.likePostError = null;
      break;
    case LIKE_POST_SUCCESS: {
      const post = draft.mainPosts.find(v => v.id === action.data.PostId);
      post.Likers.push({ id: action.data.UserId });
      draft.likePostDone = true;
      draft.likePostLoading = false;
      draft.likePostError = null;
      break;
    }
    case LIKE_POST_FAILURE:
      draft.likePostDone = false;
      draft.likePostLoading = false;
      draft.likePostError = action.error;
      break;
    case UNLIKE_POST_REQUEST:
      draft.unlikePostLoading = true;
      draft.unlikePostDone = false;
      draft.unlikePostError = null;
      break;
    case UNLIKE_POST_SUCCESS: {
      const post = draft.mainPosts.find(v => v.id === action.data.PostId);
      post.Likers = post.Likers.filter(v => v.id !== action.data.UserId);
      draft.unlikePostDone = true;
      draft.unlikePostLoading = false;
      draft.unlikePostError = null;
    }
    case UNLIKE_POST_FAILURE:
      draft.unlikePostDone = false;
      draft.unlikePostLoading = false;
      draft.unlikePostError = action.error;
      break;
    case REMOVE_IMAGE:
      draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
      break;
    default:
      break;
  }
});

export default reducer;