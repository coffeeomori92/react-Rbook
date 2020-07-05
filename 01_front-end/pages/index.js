import React from 'react';
import axois from 'axios';
import { END } from 'redux-saga';

import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';

const Home = () => {
  return (
    <AppLayout>
      hi
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps START');
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : '';
  axois.defaults.headers.Cookie = '';
  if(context.req && cookie) {
    axois.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch(END);
  console.log('getServerSideProps END');
  await context.store.sagaTask.toPromise();
});

export default Home;