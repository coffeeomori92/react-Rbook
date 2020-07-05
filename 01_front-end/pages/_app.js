import React from 'react';
import Head from 'next/head';

import GlobalStyle from '../styles/GlobalStyle';

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <title>Rbook</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap" rel="stylesheet" />
      </Head>
      <GlobalStyle />
      <Component />
    </>
  );
};

export default App;