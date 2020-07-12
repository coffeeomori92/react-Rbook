import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../customHooks/useInput';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from '../reducers/constants/post';
import { Form, ButtonArea } from '../styles/PostFormStyle';

const PostForm = () => {
  const { imagePaths, videoPaths, addPostDone } = useSelector(state => state.post);
  const dispath = useDispatch();
  const [text, onChangeText, setText] = useInput('');
  const imagesUpload = useRef();
  const videoUpload = useRef();

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
    imagePaths.forEach(v => formData.append('image', v));
    videoPaths.forEach(v => formData.append('video', v));
    formData.append('content', text);
    console.log(formData);
    return dispath({
      type: ADD_POST_REQUEST,
      data: formData
    });
  }, [text, imagePaths, videoPaths]);

  const onClickImageUpload = useCallback(e => {
    imagesUpload.current.click();
  }, [imagesUpload.current]);

  const onChangeImages = useCallback(e => {
    const imagesFormData = new FormData();
    [].forEach.call(e.target.files, v => {
      imagesFormData.append('image', v)
    });
    dispath({
      type: UPLOAD_IMAGES_REQUEST,
      data: imagesFormData
    });
  }, []);

  return (
    <Form encType="multipart/form-data" onSubmit={onSubmitForm}>
      <textarea
        value={text}
        onChange={onChangeText}
        placeholder="どんな素晴らしい起き事があったんですか？"
        maxLength={200}
      />
      <ButtonArea>
        <div>
          <input 
            type="file" 
            name="images"
            ref={imagesUpload}
            onChange={onChangeImages}
            multiple 
            hidden/>
          <button type="button" onClick={onClickImageUpload}>イメージ</button>
        </div>
        <div>
          <input 
            type="file" 
            name="video" 
            hidden />
          <button type="button">動画</button>
        </div>
        <div>
          <button type="submit" onClick={onSubmitForm}>登録</button>
        </div>
      </ButtonArea>
    </Form>
  );
};

export default PostForm;