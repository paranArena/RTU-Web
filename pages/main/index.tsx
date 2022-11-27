import React, { useEffect, useState } from 'react';
import styles from 'styles/pages/Main.module.css';
import axios from 'axios';
import { SERVER_API } from '../../config';
import { MY_CLUB } from '../../interface/API';
import { getMyClubs } from '../../api/member';
import ClubList from './ClubList';

function Main() {
  // 로그인한 유저가 ADMIN 또는 ONWER인 club list
  const [adminClubList, setAdminClubList] = useState<MY_CLUB[]>([]);

  async function getOwnerClubList() {
    let responseList: MY_CLUB[] = [];
    responseList = await getMyClubs();
    if (responseList !== undefined) {
      responseList = responseList.filter((response) => response.clubRole !== 'USER');
      setAdminClubList(responseList);
    } else {
      setAdminClubList([]);
    }
  }

  function Logout() {
    axios({
      method: 'post',
      baseURL: SERVER_API,
      url: '/logout',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      console.log(res);
      return res;
    }).catch((e) => {
      console.log(e);
      return e;
    });
  }

  useEffect(() => {
    getOwnerClubList();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div>
          <h1>Ren2U</h1>
          <h2>관리자 모드</h2>
        </div>
        <span onClick={Logout}>로그아웃</span>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.tabMenuContainer} />
        <div className={styles.workContainer}>
          <section className={adminClubList.length === 0 ? `${styles.cardContainer} ${styles.flexCenter}` : `${styles.cardContainer}`}>
            {
                adminClubList.length === 0
                  ? (
                    <div>
                      <h1>관리하고 있는 그룹이 없습니다.</h1>
                      <h3><a href="/addGroup">그룹 생성하기</a></h3>
                    </div>
                  )
                  : <ClubList clubList={adminClubList} />
              }
          </section>
        </div>
      </div>
    </div>
  );
}

export default Main;
