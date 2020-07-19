import React, { useState, useCallback } from 'react';
import { ImgOneStyle, ImgTwoStyle1, ImgTwoStyle2 } from '../styles/PostImagesStyle';

const PostImages = ({ images }) => {

  if(images.length === 1) {
    return (
      <>
        <ImgOneStyle src={`http://localhost:8080/${images[0].src}`} />
      </>
    );
  }
  if(images.length === 2) {
    return (
      <>
        <ImgTwoStyle1 src={`http://localhost:8080/${images[0].src}`} />
        <ImgTwoStyle2 src={`http://localhost:8080/${images[1].src}`} />
      </>
    );
  }
  return (
    <>
      <div>
        <img 
          role="presentation"
          src={`http://localhost:8080/${images[0].src}`}
          />
          <div>

          </div>
      </div>
    </>
  );
};

export default PostImages;