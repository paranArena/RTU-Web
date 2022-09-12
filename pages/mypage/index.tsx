import styles from 'styles/pages/MyPage.module.css';
import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
// eslint-disable-next-line import/no-cycle
import router from 'next/router';
import TermsOfService from 'components/admin/tab/TermsOfService';
// eslint-disable-next-line import/no-cycle
import ProfileModal from '../../components/mypage/profile';

interface IClub {
  id : number;
  club : string;
}

export interface IUserInfo {
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

export const defaultUserInfo :IUserInfo = {
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
  alarmNnotice: boolean;
  TermsOfService: boolean;
  logout: boolean;

}

const menuDefault:IMenuTabState = {
  profile: true,
  alarmNnotice: false,
  TermsOfService: false,
  logout: false,
};

interface LogoutAlertModalProps {
  setShowLogoutAlert : Dispatch<SetStateAction<boolean>>;
}

export function LogoutAlertModal({ setShowLogoutAlert }:LogoutAlertModalProps) {
  const EventLogoutButton = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log('localStorage : ', localStorage.getItem('token'));
    localStorage.removeItem('token');
    console.log(localStorage.getItem('token'));
    setShowLogoutAlert(false);
    router.push('/');
  };

  return (
    <div className={styles.LogoutModalOuterContainer}>
      <div className={styles.LogoutModalInnerContainer}>
        <div className={styles.LogoutAlertModalCloseButtonContainer}>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <img onClick={() => { setShowLogoutAlert(false); }} className={styles.closeIcon} src="/icons/창닫기 버튼.png" alt="close" />
        </div>

        <div className={styles.AlertTextNButtonContainer}>
          <div className={styles.AlertTextContainer}>
            <span className={styles.AlertText}>로그아웃 하시겠습니까?</span>
          </div>
          <div className={styles.AlertButtonContainer}>
            <button onClick={EventLogoutButton} className={styles.buttonBgBStyle} type="submit">예</button>
            <button onClick={() => { setShowLogoutAlert(false); }} className={styles.buttonBgWStyle} type="button">아니오</button>
          </div>
        </div>
      </div>

    </div>
  );
}

function MyPage() {
  const [menu, setMenu] = useState<IMenuTabState>(menuDefault);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const EventLogout = (e : React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowLogoutAlert(true);
  };

  useEffect(() => {
    console.log('menu : ', menu);
  }, [menu]);

  // @ts-ignore
  return (
    <div className={styles.outerContainer}>

      {
        showLogoutAlert
          ? <LogoutAlertModal setShowLogoutAlert={setShowLogoutAlert} />
          : null
      }

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
            onClick={() => {
              setMenu({
                profile: true,
                alarmNnotice: false,
                logout: false,
                TermsOfService: false,
              });
            }}
            className={menu.profile ? styles.current : styles.disabled}
          >
            프로필 확인
          </h4>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="alarmNnotice"
            onClick={() => { alert('준비중인 서비스입니다.'); }}
            // onClick={() => {
            //   setMenu({
            //     profile: false,
            //     alarmNnotice: true,
            //     logout: false,
            //     TermsOfService: false,
            //   });
            // }}
            className={menu.alarmNnotice ? styles.current : styles.disabled}
          >
            알람 / 공지사항
          </h4>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="TermsOfService"
            onClick={() => {
              setMenu({
                profile: false,
                alarmNnotice: false,
                logout: false,
                TermsOfService: true,
              });
            }}
            className={menu.TermsOfService ? styles.current : styles.disabled}
          >
            이용약관
          </h4>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="logout"
            onClick={EventLogout}
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
              menu.profile ? <ProfileModal />
                : null
          }

          {
            menu.alarmNnotice ? <div>아직 지원하지 않는 기능입니다.</div> : null
          }

          {
            menu.TermsOfService ? <TermsOfService /> : null
          }

        </div>
      </div>
    </div>
  );
}

export default MyPage;
