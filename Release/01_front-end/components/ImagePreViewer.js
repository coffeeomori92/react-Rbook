import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { IMG_URL } from '../config/config';
import { Img, ImgContainer, Header, HeaderFlex } from '../styles/ImagePreViewerStyle';
import { REMOVE_IMAGE } from '../reducers/constants/post';

const ImagePreViewer = ({ image, setHaveImage, index }) => {
  const dispatch = useDispatch();
  const onRemoveImage = useCallback(e => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index
    });
    setHaveImage(false);
  }, []);
  return (
    <ImgContainer>
      <Header>
        <div></div>
        <div>プレビュー</div>
        <HeaderFlex>
          <div onClick={onRemoveImage}>削除</div>
        </HeaderFlex>
      </Header>
      <Img src={`${IMG_URL}${image}`} />
    </ImgContainer>
  );
};

export default ImagePreViewer;