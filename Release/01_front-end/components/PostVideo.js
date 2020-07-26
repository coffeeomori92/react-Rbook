import React from 'react';
import { VideoStyle } from '../styles/PostVideoStyle';
import { VIDDEO_URL } from '../config/config';

const PostVideo = ({ video }) => {
  return (
    <>
      <VideoStyle 
        role="presentation"
        controls
        src={`${VIDDEO_URL}${video.src}`}
        />
    </>
  );
};

export default PostVideo;