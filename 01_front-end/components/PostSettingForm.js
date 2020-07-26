import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { REMOVE_POST_REQUEST } from '../reducers/constants/post';
import { SettingStyle } from '../styles/PostSettingFormStyle';

const PostSettingForm = ({ me, post }) => {
  const dispatch = useDispatch();
  const onClickRemovePost = useCallback(e => {
    if(!me) {
      return alert('ログインしてください。');
    }
    const result = confirm('本当に削除しますか？');
    if(result) { 
      return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id
    });
  }
  }, [me]);
  return (
    <>
      {
        me && post.User.id === me
        ? (
          <SettingStyle>
            <span onClick={onClickRemovePost}>削除</span>
          </SettingStyle>
        )
        : null
      }
    </>
  );
};

export default PostSettingForm;