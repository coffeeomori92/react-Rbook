import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { REMOVE_VIDEO } from '../reducers/constants/post';
import { VideoContainer, Header, HeaderFlex, Video } from '../styles/VideoPreViewerStyle';

const VideoPreViewer = ({ video, index, setHaveVideo }) => {
  const dispatch = useDispatch();
  const onRemoveVideo = useCallback(e => {
    dispatch({
      type: REMOVE_VIDEO,
      data: index
    });
    setHaveVideo(false);
  }, []);
  return (
    <VideoContainer>
      <Header>
        <div></div>
        <div>プレビュー</div>
        <HeaderFlex>
          <div onClick={onRemoveVideo}>削除</div>
        </HeaderFlex>
      </Header>
      <Video controls src={`http://localhost:8080/${video}`} />
    </VideoContainer>
  );
};

export default VideoPreViewer;