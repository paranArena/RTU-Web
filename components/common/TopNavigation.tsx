import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from 'styles/common/TopNavigation.module.css';

function TopNavigationBar() {
  const router = useRouter();
  const path = router.pathname;

  const [searchInput, setSearchInput] = useState<string>('');

  const [current, setCurrent] = useState({
    group: false,
    rent: false,
    mypage: false,
  });

  useEffect(() => {
    if (path === '/group') {
      setCurrent({
        group: true,
        rent: false,
        mypage: false,
      });
    } else if (path === '/rent') {
      setCurrent({
        group: false,
        rent: true,
        mypage: false,
      });
    } else if (path === '/mypage') {
      setCurrent({
        group: false,
        rent: false,
        mypage: true,
      });
    }
  }, [router]);

  const onClickSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        query: searchInput,
      },
    });
  };

  const onChangeSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const currentInput = e.currentTarget.value;
    setSearchInput(currentInput);
  };

  return (
    <div className={styles.topNavigationBarContainer}>
      <div className={styles.logo}>
        <Link href={router}>Ren2U</Link>
      </div>

      <div className={styles.searchContainer}>
        <input onChange={onChangeSearchInput} className={styles.searchInput} type="text" />
        <div onClick={onClickSearch} className={styles.searchIcon} />
        {/* <img onClick={onClickSearch} className={styles.searchIcon} src="/icons/search.png" /> */}
      </div>

      <nav className={styles.navContainer}>
        <ul>
          {current.group ? (
            <li className={styles.currentNavItem}>
              <Link href="/group">그룹</Link>
            </li>
          ) : (
            <li className={styles.navItem}>
              <Link href="/group">그룹</Link>
            </li>
          )}
          {current.rent ? (
            <li className={styles.currentNavItem}>
              <Link href="/rent">대여</Link>
            </li>
          ) : (
            <li className={styles.navItem}>
              <Link href="/rent">대여</Link>
            </li>
          )}
          {current.mypage ? (
            <li className={styles.currentNavItem}>
              <Link href="/mypage">마이페이지</Link>
            </li>
          ) : (
            <li className={styles.navItem}>
              <Link href="/mypage">마이페이지</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default TopNavigationBar;
