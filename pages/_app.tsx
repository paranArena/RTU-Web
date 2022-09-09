import '../styles/globals.css';
import '../styles/color.css';
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import Header from 'components/common/Header';
import { useRouter } from 'next/router';
import TopNavigationBar from '../components/common/TopNavigationBar';

function MyApp({ Component, pageProps }: AppProps) {
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [flag, setFlag] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    console.log('__app.tsx : ', router.pathname);
    if (router.pathname === '/admin' || router.pathname === '/' || router.pathname === '/mypage') {
      setFlag(false);
    } else {
      setFlag(true);
    }
  }, [router.pathname]);

  return (
    <>
      <Header />
      { flag ? <TopNavigationBar setIsSearched={setIsSearched} isSearched={isSearched} /> : null }
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component isSearched={isSearched} setIsSearched={setIsSearched} {...pageProps} />
    </>
  );
}

export default MyApp;
