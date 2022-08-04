import Header from 'components/common/Header';
import React from 'react';
import TopNavigation from 'components/common/TopNavigation';
import styles from 'styles/pages/addGroupPage.module.css';

function addGroup() {
  return (
    <div className={styles.outerContainer}>
      <Header />
      <TopNavigation />
    </div>
  );
}

export default addGroup;
