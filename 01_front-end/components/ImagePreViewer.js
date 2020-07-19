import React from 'react';
import { Img, ImgContainer } from '../styles/ImagePreViewerStyle';

const ImagePreViewer = ({ image }) => {
  return (
    <ImgContainer>
      <Img src={`http://localhost:8080/${image}`} />
    </ImgContainer>
  );
};

export default ImagePreViewer;