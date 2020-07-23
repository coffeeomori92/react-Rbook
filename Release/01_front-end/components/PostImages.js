import React, { useState, useCallback } from 'react';
import { ImgStyle } from '../styles/PostImagesStyle';

const PostImages = ({ images }) => {
  return (
    <>
      <ImgStyle 
        role="presentation"
        src={`http://localhost:8080/${images[0].src}`}
        />
    </>
  );
};

export default PostImages;