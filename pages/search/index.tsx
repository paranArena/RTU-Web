import Header from 'components/common/Header';
import React from 'react';
import TopNavigation from 'components/common/TopNavigation';
import styles from 'styles/pages/SearchResult.module.css';
import SearchResultGroupCard from 'components/group/SearchResultGroupCard';

function SearchResult() {
  return (
    <div className={styles.outerContainer}>
      <Header />
      <TopNavigation />

      <div className={styles.innerContainer}>
        <SearchResultGroupCard Membership />
        <SearchResultGroupCard Membership={false} />
        <SearchResultGroupCard Membership={false} />
        <SearchResultGroupCard Membership={false} />
        <SearchResultGroupCard Membership={false} />
        <SearchResultGroupCard Membership={false} />
        <SearchResultGroupCard Membership={false} />
      </div>
    </div>
  );
}

export default SearchResult;
