import React from 'react';
import { Img, ImgContainer, Header } from '../styles/ImagePreViewerStyle';

const ImagePreViewer = ({ image }) => {
  return (
    <ImgContainer>
      <Header>プレビュー</Header>
      <Img src={`http://localhost:8080/${image}`} />
    </ImgContainer>
  );
};

export default ImagePreViewer;