import React from 'react';
import Head from 'next/head';

import AppLayout from '../components/AppLayout';
import SignupForm from '../components/SignupForm';

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

export default Signup;