import React from 'react';
import { VideoStyle } from '../styles/PostVideoStyle';

const PostVideo = ({ video }) => {
  return (
    <>
      <VideoStyle 
        role="presentation"
        controls
        src={`http://localhost:8080/${video.src}`}
        />
    </>
  );
};

export default PostVideo;