import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { LikeTwoTone, CommentOutlined, ShareAltOutlined, SettingOutlined } from '@ant-design/icons';
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, REMOVE_POST_REQUEST, SHARE_POST_REQUEST } from '../reducers/constants/post';
import PostImages from './PostImages';
import { Nickname, Avatar, InitName, PostCard, PostToggle } from '../styles/PostStyle';


const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [commentFormOpened,  setCommentFormOpened] = useState(false);
  const { removePostLoading } = useSelector(state => state.post);
  const id = useSelector(state => state.user.me?.id);
  
  const onClickLike = useCallback(e => {
    if(!id) {
      return alert('ログインしてください。');
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id
    });
  }, [id]);

  const onClickUnLike = useCallback(e => {
    if(!id) {
      return alert('ログインしてください。');
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id
    });
  }, [id]);

  const onToggleComment = useCallback(e => {
    setCommentFormOpened(prev => !prev);
  }, []);

  const onClickRemovePost = useCallback(e => {
    if(!id) {
      return alert('ログインしてください。');
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id
    });
  }, [id]);

  const onClickShare = useCallback(e => {
    if(!id) {
      return alert('ログインしてください。');
    }
    return dispatch({
      type: SHARE_POST_REQUEST,
      data: post.id
    });
  }, [id]);

  return (
    <PostCard>
      {post.Images[0] && (<PostImages images={post.Images} />)}
      {post.Video && (<PostVideo video={post.Video} />)}
      <Avatar>
        <InitName>
          <Link href={`/user/${post.User.id}`}>
            <a>{post.User.nickname[0]}</a>
          </Link>
        </InitName>
        <Nickname>{post.User.nickname}</Nickname>
      </Avatar>
      <PostToggle>
        <div><LikeTwoTone /></div>
        <div><CommentOutlined /></div>
        <div><ShareAltOutlined /></div>
        <div><SettingOutlined /></div>
      </PostToggle>
    </PostCard>
  );
};

export default Post;