import produce from '../util/ES5_produce';
import initialState from './initialState/user';
import { 
  SIGN_UP_REQUEST, 
  SIGN_UP_SUCCESS, 
  SIGN_UP_FAILURE, 
  LOG_IN_REQUEST, 
  LOG_IN_SUCCESS, 
  LOG_IN_FAILURE, 
  LOG_OUT_REQUEST, 
  LOG_OUT_SUCCESS, 
  LOG_OUT_FAILURE, 
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  ADD_POST_TO_ME,
  REMOVE_POST_OF_ME,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  SUBSCRIBE_REQUEST,
  UNSUBSCRIBE_REQUEST,
  UNSUBSCRIBE_SUCCESS,
  UNSUBSCRIBE_FAILURE,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_FAILURE,
  LOAD_SUBSCRIBER_REQUEST,
  LOAD_SUBSCRIBER_SUCCESS,
  LOAD_SUBSCRIBER_FAILURE,
  LOAD_PRODUCER_REQUEST,
  LOAD_PRODUCER_SUCCESS,
  LOAD_PRODUCER_FAILURE} from './constants/user';

const reducer = (state = initialState, action) => produce(state, draft => {
  switch(action.type) {
    case SIGN_UP_REQUEST:
      draft.signupLoading = true;
      draft.signupDone = false;
      draft.signupError = null;
      break;
    case SIGN_UP_SUCCESS:
      draft.signupLoading = false;
      draft.signupDone = true;
      draft.signupError = null;
      break;
    case SIGN_UP_FAILURE:
      draft.signupLoading = false;
      draft.signupDone = false;
      draft.signupError = action.error;
      break;
    case LOG_IN_REQUEST:
      draft.logInLoading = true;
      draft.logInDone = false;
      draft.logInError = null;
      break;
    case LOG_IN_SUCCESS:
      draft.logInLoading = false;
      draft.logInDone = true;
      draft.me = action.data;
      break;
    case LOG_IN_FAILURE:
      draft.logInLoading = false;
      draft.loginDone = false;
      draft.logInError = action.error;
      break;
    case LOG_OUT_REQUEST:
      draft.logOutLoading = true;
      draft.logOutError = null;
      draft.logOutDone = false;
      break;
    case LOG_OUT_SUCCESS:
      draft.logOutLoading = false;
      draft.logOutDone = true;
      draft.me = null;
      break;
    case LOG_OUT_FAILURE:
      draft.logOutLoading = false;
      draft.logOutDone = false;
      draft.logOutError = action.error;
      break;
    case LOAD_MY_INFO_REQUEST:
      draft.loadMyInfoLoading = true;
      draft.loadMyInfoError = null;
      draft.loadMyInfoDone = false;
      break;
    case LOAD_MY_INFO_SUCCESS:
      draft.loadMyInfoLoading = false;
      draft.me = action.data;
      draft.loadMyInfoDone = true;
      break;
    case LOAD_MY_INFO_FAILURE:
      draft.loadMyInfoLoading = false;
      draft.loadMyInfoError = action.error;
      break;
    case LOAD_SUBSCRIBER_REQUEST:
      draft.loadSubscribersLoading = true;
      draft.loadSubscribersError = null;
      draft.loadSubscribesrDone = false;
      break;
    case LOAD_SUBSCRIBER_SUCCESS:
      draft.loadSubscribersLoading = false;
      draft.me.subscribers = action.data;
      draft.loadSubscribersDone = true;
      break;
    case LOAD_SUBSCRIBER_FAILURE:
      draft.loadSubscribersLoading = false;
      draft.loadSubscribersError = action.error;
      break;
    case LOAD_PRODUCER_REQUEST:
      draft.loadProducersLoading = true;
      draft.loadProducersError = null;
      draft.loadProducersDone = false;
      break;
    case LOAD_PRODUCER_SUCCESS:
      draft.loadProducersLoading = false;
      draft.me.producers = action.data;
      draft.loadProducersDone = true;
      break;
    case LOAD_PRODUCER_FAILURE:
      draft.loadProducersLoading = false;
      draft.loadProducersError = action.error;
      break;
    case SUBSCRIBE_REQUEST:
      draft.subscribeLoading = true;
      draft.subscribeError = null;
      draft.subscribeDone = false;
      break;
    case SUBSCRIBE_SUCCESS:
      draft.subscribeLoading = false;
      draft.me.Subscriber.push({ id: action.data.UserId });
      draft.subscribeDone = true;
      draft.subscribeError = null;
      break;
    case SUBSCRIBE_FAILURE:
      draft.subscribeLoading = false;
      draft.subscribeDone = false;
      draft.subscribeError = action.error;
      break;
    case UNSUBSCRIBE_REQUEST:
      draft.unSubscribeLoading = true;
      draft.unSubscribeError = null;
      draft.unSubscribeDone = false;
      break;
    case UNSUBSCRIBE_SUCCESS:
      draft.unSubscribeLoading = false;
      draft.me.Subscriber = draft.me.Subscriber.filter((v) => v.id !== action.data.UserId);
      draft.unSubscribeDone = true;
      break;
    case UNSUBSCRIBE_FAILURE:
      draft.unSubscribeLoading = false;
      draft.unSubscribeError = action.error;
      break;
    case CHANGE_NICKNAME_REQUEST:
      draft.changeNicknameLoading = true;
      draft.changeNicknameError = null;
      draft.changeNicknameDone = false;
      break;
    case CHANGE_NICKNAME_SUCCESS:
      draft.me.nickname = action.data.nickname;
      draft.changeNicknameLoading = false;
      draft.changeNicknameDone = true;
      break;
    case CHANGE_NICKNAME_FAILURE:
      draft.changeNicknameLoading = false;
      draft.changeNicknameDone = false;
      draft.changeNicknameError = action.error;
      break;
    case ADD_POST_TO_ME:
      draft.me.Posts.unshift({ id: action.data });
      break;
    case REMOVE_POST_OF_ME:
      draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
      break;
    default:
      break;
  }
});

export default reducer;