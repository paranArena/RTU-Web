import styles from 'styles/pages/MyPage.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_API } from '../../config';

interface IClub {
  id : number;
  club : string;
}

interface IUserInfo {
  id : number;
  email : string;
  name : string;
  phoneNumber : string;
  studentId : string;
  major : string;
  activated : boolean;
  clubList : IClub[];
  rentals : [];
  authorities : [];
}

const defaultUserInfo :IUserInfo = {
  id: 0,
  email: '',
  name: '',
  phoneNumber: '',
  studentId: '',
  major: '',
  activated: false,
  clubList: [{ id: 0, club: '' }],
  rentals: [],
  authorities: [],
};

interface IMenuTabState {
  profile: boolean;
  alarm: boolean;
  notice: boolean;
  TermsOfService: boolean;
  logout: boolean;

}

const menuDefault:IMenuTabState = {
  profile: false,
  alarm: false,
  notice: false,
  TermsOfService: false,
  logout: false,

};

function MyPage() {
  const [menu, setMenu] = useState<IMenuTabState>({ ...menuDefault, profile: true });
  const [userInfo, setUserInfo] = useState<IUserInfo>(defaultUserInfo);

  useEffect(() => {
    setMenu(menuDefault);

    axios.get(`${SERVER_API}/members/my/info`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log('res.data.data : ', res.data.data);
          setUserInfo(res.data.data);
        }
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log('userInfo', userInfo);
  }, [userInfo]);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.topTitleContainer}>
          <h1>Ren2U</h1>
          <h3>마이페이지</h3>
        </div>

        <div className={styles.menuTabContainer}>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="profile"
            onClick={() => {}}
            className={menu.profile ? styles.current : styles.disabled}
          >
            프로필 확인
          </h4>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="alarm"
            onClick={() => {}}
            className={menu.alarm ? styles.current : styles.disabled}
          >
            알람
          </h4>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="notice"
            onClick={() => {}}
            className={menu.notice ? styles.current : styles.disabled}
          >
            공지사항
          </h4>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="TermsOfService"
            onClick={() => {}}
            className={menu.TermsOfService ? styles.current : styles.disabled}
          >
            이용약관
          </h4>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="logout"
            onClick={() => {}}
            className={menu.logout ? styles.current : styles.disabled}
          >
            로그아웃
          </h4>

          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div
            onClick={() => {
              window.history.back();
            }}
            className={styles.closeButtonContainer}
          >
            <img src="/icons/나가기 버튼.png" alt="관리자 페이지 나가기 버튼" />
            <h4 className={styles.closeButton}>나가기</h4>
          </div>
        </div>
      </div>

      <div className={styles.rightOuterContainer}>
        <div className={styles.rightInnerContainer}>
          {

          }
        </div>
      </div>
    </div>
  );
}

export default MyPage;
