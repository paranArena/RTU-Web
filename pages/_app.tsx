import '../styles/globals.css';
import '../styles/color.css';
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import Header from 'components/common/Header';
import { useRouter } from 'next/router';
import TopNavigationBar from '../components/common/TopNavigationBar';
import { LogoutAlertModal } from './mypage';

function MyApp({ Component, pageProps }: AppProps) {
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [flag, setFlag] = useState<boolean>(false);
  const router = useRouter();
  const [showLogoutState, setShowLogoutState] = useState(false);

  useEffect(() => {
    if (router.pathname === '/admin' || router.pathname === '/admin/coupon' || router.pathname === '/' || router.pathname === '/mypage') {
      setFlag(false);
    } else {
      setFlag(true);
    }
  }, [router.pathname]);

  return (
    <>
      <Header />
      {
        showLogoutState
          ? <LogoutAlertModal setShowLogoutAlert={setShowLogoutState} />
          : null
      }
      {/* eslint-disable-next-line max-len */}
      {/* { flag ? <TopNavigationBar setShowLogoutState={setShowLogoutState} setIsSearched={setIsSearched} isSearched={isSearched} /> : null } */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component isSearched={isSearched} setIsSearched={setIsSearched} {...pageProps} />
    </>
  );
}

export default MyApp;
