import Link from 'next/link';
import React, {
  Dispatch, SetStateAction,
  useEffect, useState,
} from 'react';
import { useRouter } from 'next/router';
import styles from 'styles/common/TopNavigation.module.css';

interface TopNavigationBarProps {
  setIsSearched : Dispatch<SetStateAction<boolean>>;
  isSearched : boolean;
  setShowLogoutState:Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line max-len
function TopNavigationBar({ setIsSearched, isSearched, setShowLogoutState } :TopNavigationBarProps) {
  // useEffect(() => {
  //   console.log(setIsSearched, isSearched);
  // }, [setIsSearched, isSearched]);
  const router = useRouter();
  const path = router.pathname;

  const [searchInput, setSearchInput] = useState<string>('');

  const [current, setCurrent] = useState({
    group: false,
    // rent: false,
    mypage: false,
  });

  useEffect(() => {
    console.log();
  }, [isSearched]);

  useEffect(() => {
    if (path === '/group') {
      setCurrent({
        group: true,
        // rent: false,
        mypage: false,
      });
    } else if (path === '/rent') {
      setCurrent({
        group: false,
        // rent: true,
        mypage: false,
      });
    } else if (path === '/mypage') {
      setCurrent({
        group: false,
        // rent: false,
        mypage: true,
      });
    }
  }, [path]);

  const onClickSearch = (e : React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    // setIsSearched(!isSearched);
    setIsSearched((prev) => !prev);
    router.push({
      pathname: '/search',
      query: {
        input: searchInput,
      },
    });
  };

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const currentInput = e.currentTarget.value;
    setSearchInput(currentInput);
  };

  return (
    <div className={styles.topNavigationBarContainer}>
      <div className={styles.logo}>
        <Link href="/main">Ren2U</Link>
      </div>

      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={styles.searchContainer}
      >
        <input
          id="input"
          onKeyPress={(e:React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              // e.target.value = '';
              // setSearchInput(searchInput);

              // const search = searchInput;
              setIsSearched((prev) => !prev);
              router.push({
                pathname: '/search',
                query: {
                  input: e.currentTarget.value,
                },
              });
              e.currentTarget.value = '';
            }
          }}
          name="input"
          onChange={onChangeSearchInput}
          className={styles.searchInput}
          type="text"
        />
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={onClickSearch} className={styles.searchIcon} />
        {/* eslint-disable-next-line max-len */}
        {/* <img onClick={onClickSearch} className={styles.searchIcon} src="/icons/search.png" /> */}
      </div>

      <nav className={styles.navContainer}>
        <ul>
          <li className={current.group ? styles.currentNavItem : styles.navItem}>
            <Link href="/group">그룹</Link>
          </li>

          {/* <li className={current.rent ? styles.currentNavItem : styles.navItem}> */}
          {/*  <Link href="/rent">대여</Link> */}
          {/* </li> */}

          <li className={current.mypage ? styles.currentNavItem : styles.navItem}>
            <Link href="/mypage">마이페이지</Link>
          </li>

          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <li
            onClick={() => {
              setShowLogoutState(true);
            }}
            className={styles.navItem}
          >
            로그아웃
          </li>

        </ul>
      </nav>
    </div>
  );
}

export default TopNavigationBar;
