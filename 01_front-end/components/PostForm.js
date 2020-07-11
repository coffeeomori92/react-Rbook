import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../customHooks/useInput';
import { ADD_POST_REQUEST } from '../reducers/constants/post';

const PostForm = () => {
  const { imagePaths, videoPaths, addPostDone } = useSelector(state => state.post);
  console.log('aaaaaaa', imagePaths);
  const dispath = useDispatch();
  const [text, onChangeText, setText] = useInput('');
  const upload = useRef();

  useEffect(() => {
    if(addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmitForm = useCallback(e => {
    e.preventDefault();
    if(!text || !text.trim()) {
      return alert('内容を書いてください。');
    }
    const formData = new FormData();
    //imagePaths.forEach(v => formData.append('image', v));
    //videoPaths.forEach(v => formData.append('video', v));
    formData.append('content', text);
    return dispath({
      type: ADD_POST_REQUEST,
      data: formData
    });
  }, [text, imagePaths, videoPaths]);

  const onClickUpload = useCallback(e => {

  }, []);

  return (
    <form encType="multipart/form-data" onSubmit={onSubmitForm}>
      <textarea>
        
      </textarea>
    </form>
  );
};

export default PostForm;