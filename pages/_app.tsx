import '../styles/globals.css';
import '../styles/color.css';
import type { AppProps } from 'next/app';
import React, { useState } from 'react';
import Header from 'components/common/Header';
import TopNavigationBar from '../components/common/TopNavigationBar';

function MyApp({ Component, pageProps }: AppProps) {
  const [isSearched, setIsSearched] = useState<boolean>(false);

  return (
    <>
      <Header />
      <TopNavigationBar setIsSearched={setIsSearched} isSearched={isSearched} />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component isSearched={isSearched} setIsSearched={setIsSearched} {...pageProps} />
    </>
  );
}

export default MyApp;
