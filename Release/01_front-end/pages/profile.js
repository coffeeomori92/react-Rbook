import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import EditNickname from '../components/EditNickname';
import { LOAD_MY_INFO_REQUEST, LOAD_SUBSCRIBER_REQUEST, LOAD_PRODUCER_REQUEST } from '../reducers/constants/user';
import { useSelector, useDispatch } from 'react-redux';
import ProfilecontentToggleArea from '../components/ProfileContentToggleArea';

const Profile = () => {
  const router = useRouter();
  const { me } = useSelector(state => state.user);
  
  useEffect(() => {
    if(!(me && me.id)) {
      router.push('/');
    }
  }, [me && me.id]);

  if(!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>プロフィール | Rbook</title>
      </Head>
      <AppLayout>
        <EditNickname/>
          <ProfilecontentToggleArea
          subscribers={me.subscribers} 
          producers={me.producers}/>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps_profile start');
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if(context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST
  });
  context.store.dispatch({
    type: LOAD_SUBSCRIBER_REQUEST,
    data: 30
  });
  context.store.dispatch({
    type: LOAD_PRODUCER_REQUEST,
    data: 30
  });
  context.store.dispatch(END);
  console.log('getServerSideProps_profile end');
  await context.store.sagaTask.toPromise();
});

export default Profile;