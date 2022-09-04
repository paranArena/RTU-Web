import React from 'react';
import GroupModal from 'components/group/GroupModal';
import styles from 'styles/group/main/GroupMainPage.module.css';

function GroupMain() {
  return (
    <div className={styles.outerContainer}>

      <GroupModal />

    </div>
  );
}

export default GroupMain;
