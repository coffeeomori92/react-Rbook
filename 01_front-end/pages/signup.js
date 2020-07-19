import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../store/configureStore';
import AppLayout from '../components/AppLayout';
import SignupForm from '../components/SignupForm';
import { LOAD_MY_INFO_REQUEST } from '../reducers/constants/user';

const Signup = () => {
  return (
    <AppLayout>
        <Head>
          <title>新規登録 | Rbook</title>
        </Head>
        <SignupForm />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps_signup start');
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
  console.log('getServerSideProps_signup end');
  await context.store.sagaTask.toPromise();
});

export default Signup;