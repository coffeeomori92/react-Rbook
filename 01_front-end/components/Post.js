import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { ShareAltOutlined } from '@ant-design/icons';
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, SHARE_POST_REQUEST } from '../reducers/constants/post';
import PostImages from './PostImages';
import PostVideo from './PostVideo';
import PostContent from './PostContent';
import PostCommentForm from './PostCommentForm';
import PostComment from './PostComment';
import PostSettingForm from './PostSettingForm';
import SubscribeButton from './SubscribeButton';
import { 
  Nickname, 
  Avatar, 
  InitName, 
  PostCard, 
  PostToggle, 
  CommentNumber, CommentIcon, LikeButtonTwotoneIcon, LikeButtonIcon, SettingIcon } from '../styles/PostStyle';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [settingFormOpened, setSettingFormOpened] = useState(false);
  const { removePostLoading } = useSelector(state => state.post);
  const id = useSelector(state => state.user.me?.id);
  const liked = post.Likers.find(v => v.id === id);
  
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

  const onToggleSetting = useCallback(e => {
    setSettingFormOpened(prev => !prev);
  }, []);

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
          <Link href={`/user/${post.User.id}`} prefetch={false}>
            <a>{post.User.nickname[0]}</a>
          </Link>
        </InitName>
        <Nickname>{post.User.nickname}</Nickname>
        {
          id && <SubscribeButton post={post} />
        }
      </Avatar>
      <PostContent postData={post.content} />  
      <PostToggle>
        <div>
          {
            liked 
            ? <LikeButtonTwotoneIcon onClick={onClickUnLike} />
            : <LikeButtonIcon onClick={onClickLike} />
          }
        </div>
        <div><CommentIcon onClick={onToggleComment} /></div>
        {/* <div><ShareAltOutlined /></div> */}
        <div><SettingIcon onClick={onToggleSetting} /></div>
        <div>
          {
            settingFormOpened && (<PostSettingForm me={id} post={post} />)
          }
        </div>
      </PostToggle>
      <CommentNumber>
        {`返信 ${post.Comments.length}件`}
      </CommentNumber>
      {
        commentFormOpened && (<PostCommentForm post={post} />)
      }
      {
        post.Comments.map((v, i) => {
          return <PostComment 
                  key={i} 
                  author={v.User.nickname} 
                  content={v.content} 
                  authorId={v.User.id} />;
        })
      }
    </PostCard>
  );
};

export default Post;