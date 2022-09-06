import React, { useEffect, useState } from 'react';
import styles from 'styles/pages/addGroupPage.module.css';
import AddGroupModal from 'components/group/AddGroupModal';
import { IAddGroup } from '../../globalInterface';

function addGroup() {
  const [groupForm, setGroupForm] = useState<IAddGroup>({
    name: '',
    hashtags: '',
    thumbnail: '',
    introduction: '',
  });

  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);

  useEffect(() => {

  }, [groupForm]);

  return (
    <div className={styles.outerContainer}>

      <div className={styles.innerContainer}>
        <AddGroupModal
          isButtonActive={isButtonActive}
          setIsButtonActive={setIsButtonActive}
          groupForm={groupForm}
          setGroupForm={setGroupForm}
        />
      </div>
    </div>
  );
}

export default addGroup;
