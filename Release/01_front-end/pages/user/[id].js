import React, { useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import wrapper from '../../store/configureStore';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/constants/post';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from '../../reducers/constants/user';
import Post from '../../components/Post';
import { Profile, Avatar, InitName, Nickname, Contents, Content, ContentTitle } from '../../styles/UserIdProfileStyle';

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(state => state.post);
  const { userInfo, me } = useSelector(state => state.user);

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
            data: id,
          });
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePosts, id, loadPostsLoading]);

  return (
    <AppLayout>
      <Head>
        <title>{userInfo.nickname}様のポスト | Rbook</title>
        <meta name="description" content={`${userInfo.nickname}様のポスト`} />
        <meta property="og:title" content={`${userInfo.nickname}様のポスト`} />
        <meta property="og:description" content={`${userInfo.nickname}様のポスト`} />
        <meta property="og:image" content="https://reactrbook.com/favicon.ico" />
        <meta property="og:url" content={`https://reactrbook.com/user/${id}`} />
      </Head>
      {
        userInfo && (userInfo.id !== me?.id)
        ? (
          <Profile>
            <Avatar>
              <InitName>
                <Link href={`/user/${userInfo.id}`} prefetch={false}>
                  <a>{userInfo.nickname[0]}</a>
                </Link>
              </InitName>
              <Nickname>{userInfo.nickname}</Nickname>
            </Avatar>
            <Contents>
              <Content>
                <ContentTitle>マイポスト</ContentTitle>
                <div>{userInfo.Posts}</div>      
              </Content>
              <Content>
                <ContentTitle>購読</ContentTitle>
                <div>{userInfo.Producer}</div>
              </Content>
              <Content>
                <ContentTitle>リスナー</ContentTitle>
                <div>{userInfo.Subscriber}</div>
              </Content>
            </Contents>
          </Profile>
        )
        : null
      }
      {
        mainPosts.map(v => {
          return (<Post key={v.id} post={v} />)
        })
      }
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default User;