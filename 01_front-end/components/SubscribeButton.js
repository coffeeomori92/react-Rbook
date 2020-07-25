import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubscribeButtonArea } from '../styles/SubscribeButtonStyle';
import { UNSUBSCRIBE_REQUEST, SUBSCRIBE_REQUEST } from '../reducers/constants/user';

const SubscribeButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const isSubscribing = me?.Producer.find(v => v.id === post.User.id);
  const onClickButton = useCallback(e => {
    if(isSubscribing) {
      dispatch({
        type: UNSUBSCRIBE_REQUEST,
        data: post.User.id
      });
    } else {
      dispatch({
        type: SUBSCRIBE_REQUEST,
        data: post.User.id
      });
    }
  }, [isSubscribing]);
  if(post.User.id === me.id) {
    return null;
  }
  return (
    <>
      <SubscribeButtonArea>
          <div onClick={onClickButton}>
            {
              isSubscribing
              ? '購読済み'
              : '購読'
            }
          </div>
      </SubscribeButtonArea>
    </>
  );
};

export default SubscribeButton;