import Header from 'components/common/Header';
import React from 'react';
import styles from 'styles/pages/MyPage.module.css';
import TopNavigation from '../../components/common/TopNavigation';

function Main() {
  // eslint-disable-next-line no-restricted-globals

  return (
    <div className={styles.mainContainer}>
      <Header />
      <TopNavigation />
      <div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default Main;
