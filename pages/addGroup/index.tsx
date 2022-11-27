import React, { useEffect, useState } from 'react';
import styles from 'styles/pages/addGroupPage.module.css';
import AddGroupModal from 'components/group/AddGroupModal';
import axios from 'axios';
import { IAddGroup } from '../../globalInterface';
import { SERVER_API } from '../../config';

function Logout() {
  axios({
    method: 'post',
    baseURL: SERVER_API,
    url: '/logout',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then((res) => {
    if (res.status === 200) {
      window.location.assign('/');
    }
  }).catch((e) => {
    console.log(e);
    return e;
  });
}

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
      <div className={styles.topNavigation}>
        <span><a href="/main">뒤로가기</a></span>
        <span onClick={Logout}>로그아웃</span>
      </div>

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
