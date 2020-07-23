import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VideoCameraAddOutlined, CameraOutlined, CloudUploadOutlined } from '@ant-design/icons';
import useInput from '../customHooks/useInput';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, UPLOAD_VIDEO_REQUEST } from '../reducers/constants/post';
import ImagePreViewer from './ImagePreViewer';
import VideoPreViewer from './VideoPreViewer';
import { Form, ButtonArea, CameraIcon, VideoIcon, SubmitIcon, PreViewerArea } from '../styles/PostFormStyle';

const PostForm = () => {
  const { imagePaths, videoPaths, addPostDone } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput('');
  const [haveImage, setHaveImage] = useState(false);
  const [haveVideo, setHaveVideo] = useState(false);
  const imageUpload = useRef();
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
    setHaveImage(false);
    setHaveVideo(false);
    const formData = new FormData();
    imagePaths.forEach(v => formData.append('image', v));
    videoPaths.forEach(v => formData.append('video', v));
    formData.append('content', text);
    console.log(formData);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData
    });
  }, [text, imagePaths, videoPaths]);

  const onClickVideoUpload = useCallback(e => {
    if(haveVideo) {
      return;
    }
    videoUpload.current.click();
  }, [videoUpload.current, haveVideo]);

  const onChageVideo = useCallback(e => {
    if(e.target.files.length > 0) {
      const videoFormData = new FormData();
      [].forEach.call(e.target.files, v => {
        videoFormData.append('video', v);
      });
      dispatch({
        type: UPLOAD_VIDEO_REQUEST,
        data: videoFormData
      });
      setHaveVideo(true);
    }
  }, []);

  const onClickImageUpload = useCallback(e => {
    if(haveImage) {
      return;
    }
    imageUpload.current.click();
  }, [imageUpload.current, haveImage]);

  const onChangeImages = useCallback(e => {
    if(e.target.files.length > 0) {
      const imagesFormData = new FormData();
      [].forEach.call(e.target.files, v => {
        imagesFormData.append('image', v);
      });
      dispatch({
        type: UPLOAD_IMAGES_REQUEST,
        data: imagesFormData
      });
      setHaveImage(true);
    }
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
            accept="image/*" 
            ref={imageUpload}
            onChange={onChangeImages} 
            hidden/>
          <CameraIcon haveImage={haveImage} type="button" onClick={onClickImageUpload}><CameraOutlined /> <span>画像</span></CameraIcon>
        </div>
        <div>
          <input 
            type="file" 
            name="video"
            accept="video/*" 
            ref={videoUpload}
            onChange={onChageVideo}
            hidden />
          <VideoIcon haveVideo={haveVideo} type="button" onClick={onClickVideoUpload}><VideoCameraAddOutlined /> <span>動画</span></VideoIcon>
        </div>
        <div>
          <SubmitIcon type="submit" onClick={onSubmitForm}><CloudUploadOutlined /> <span>登録</span></SubmitIcon>
        </div>
      </ButtonArea>
      <PreViewerArea>
        {
          imagePaths.map((v, i) => {
            return (
              <ImagePreViewer key={v} image={v} setHaveImage={setHaveImage} index={i} />
            );
          })
        }
        {
          videoPaths.map((v, i) => {
            return (
              <VideoPreViewer key={v} video={v} setHaveVideo={setHaveVideo} index={i} />
            );
          })
        }
      </PreViewerArea>
    </Form>
  );
};

export default PostForm;