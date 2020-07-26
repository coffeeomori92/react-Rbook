import React, { useState, useCallback } from 'react';
import { ImgStyle } from '../styles/PostImagesStyle';
import { IMG_URL } from '../config/config';

const PostImages = ({ images }) => {
  return (
    <>
      <ImgStyle 
        role="presentation"
        src={`${IMG_URL}${images[0].src}`}
        />
    </>
  );
};

export default PostImages;