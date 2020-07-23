import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../store/configureStore';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import Post from '../components/Post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/constants/user';
import { LOAD_POSTS_REQUEST } from '../reducers/constants/post';

const Home = () => {
  const { me } = useSelector(state => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, sharePostError } = useSelector(state => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if(sharePostError) {
      alert(sharePostError);
    }
  }, [sharePostError]);

  useEffect(() => {
    const onScroll = () => {
      if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500) {
        if(hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            data: lastId
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map(post => (<Post key={post.id} post={post} />))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps_home START');
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if(context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST
  });
  context.store.dispatch(END);
  console.log('getServerSideProps_home END');
  await context.store.sagaTask.toPromise();
});

export default Home;