import Header from 'components/common/Header';
import React from 'react';
import TopNavigation from 'components/common/TopNavigation';
import GroupModal from 'components/group/GroupModal';
import styles from 'styles/group/main/GroupMainPage.module.css';

function GroupMain() {
  return (
    <div className={styles.outerContainer}>
      <Header />
      <TopNavigation />

      <GroupModal />

    </div>
  );
}

export default GroupMain;
