import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../customHooks/useInput';
import { Form } from '../styles/PostCommentFormStyle';
import { ADD_COMMENT_REQUEST } from '../reducers/constants/post';

const PostCommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector(state => state.user.me?.id);
  const { addCommentDone } = useSelector(state => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');
  
  useEffect(() => {
    if(addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitForm = useCallback(e => {
    e.preventDefault();
    if(id) {
      return dispatch({
        type: ADD_COMMENT_REQUEST,
        data: { content: commentText, postId: post.id, userId: id }
      })
    }
    return alert('ログインしてください。');
  }, [id]);

  return (
    <Form onSubmit={onSubmitForm}>
      <textarea
        placeholder="コメントを書いてください"
        value={commentText}
        onChange={onChangeCommentText}
        required
      />
      <button>投稿する</button>
    </Form>
  );
};

export default PostCommentForm;