import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import { LOAD_MY_INFO_REQUEST } from '../reducers/constants/user';

const Profile = () => {
  return (
    <>
      <Head>
        <title>プロフィール | Rbook</title>
      </Head>
      <AppLayout>

      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps_profile start');
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if(context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST
  });
  context.store.dispatch(END);
  console.log('getServerSideProps_profile end');
  await context.store.sagaTask.toPromise();
});

export default Profile;