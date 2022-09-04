import React, { useState } from 'react';
import styles from 'styles/pages/addGroupPage.module.css';
import AddGroupModal from 'components/group/AddGroupModal';
import { IAddGroup } from '../../globalInterface';

function addGroup() {
  const [groupForm, setGroupForm] = useState<IAddGroup>({
    groupName: '',
    tags: '',
    introduce: '',
  });

  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);

  return (
    <div className={styles.outerContainer}>

      <div className={styles.innerContainer}>
        {/* eslint-disable-next-line max-len */}
        <AddGroupModal isButtonActive={isButtonActive} setIsButtonActive={setIsButtonActive} groupForm={groupForm} setGroupForm={setGroupForm} />
      </div>
    </div>
  );
}

export default addGroup;
