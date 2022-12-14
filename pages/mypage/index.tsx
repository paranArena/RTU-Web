import styles from 'styles/pages/MyPage.module.css';
import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
// eslint-disable-next-line import/no-cycle
import router from 'next/router';
import TermsOfService from 'components/admin/tab/TermsOfService';
// eslint-disable-next-line import/no-cycle
import ProfileSetting from 'components/mypage/ProfileSetting';
// eslint-disable-next-line import/no-cycle
import ProfileModal from '../../components/mypage/profile';

interface IClub {
  id : number;
  club : string;
}

export interface IUserProfileInfo {
  id : number;
  email : string;
  name : string;
  phoneNumber : string;
  studentId : string;
  major : string;
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
  profileSetting : boolean;
}

const menuDefault:IMenuTabState = {
  profile: true,
  alarmNnotice: false,
  TermsOfService: false,
  logout: false,
  profileSetting: false,
};

interface LogoutAlertModalProps {
  setShowLogoutAlert : Dispatch<SetStateAction<boolean>>;
}

export function LogoutAlertModal({ setShowLogoutAlert }:LogoutAlertModalProps) {
  const EventLogoutButton = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setShowLogoutAlert(false);
    router.push('/');
  };

  return (
    <div className={styles.LogoutModalOuterContainer}>
      <div className={styles.LogoutModalInnerContainer}>
        <div className={styles.LogoutAlertModalCloseButtonContainer}>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <img onClick={() => { setShowLogoutAlert(false); }} className={styles.closeIcon} src="/icons/????????? ??????.png" alt="close" />
        </div>

        <div className={styles.AlertTextNButtonContainer}>
          <div className={styles.AlertTextContainer}>
            <span className={styles.AlertText}>???????????? ???????????????????</span>
          </div>
          <div className={styles.AlertButtonContainer}>
            <button onClick={EventLogoutButton} className={styles.buttonBgBStyle} type="submit">???</button>
            <button onClick={() => { setShowLogoutAlert(false); }} className={styles.buttonBgWStyle} type="button">?????????</button>
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
    console.log();
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
          <h3>???????????????</h3>
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
                profileSetting: false,
              });
            }}
            className={menu.profile ? styles.current : styles.disabled}
          >
            ????????? ??????
          </h4>

          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="profileSetting"
            onClick={() => {
              setMenu({
                profile: false,
                alarmNnotice: false,
                logout: false,
                TermsOfService: false,
                profileSetting: true,
              });
            }}
            className={menu.profileSetting ? styles.current : styles.disabled}
          >
            ????????? ??????
          </h4>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          {/* <h4 */}
          {/*  id="alarmNnotice" */}
          {/*  onClick={() => { alert('???????????? ??????????????????.'); }} */}
          {/*  // onClick={() => { */}
          {/*  //   setMenu({ */}
          {/*  //     profile: false, */}
          {/*  //     alarmNnotice: true, */}
          {/*  //     logout: false, */}
          {/*  //     TermsOfService: false, */}
          {/*  //   }); */}
          {/*  // }} */}
          {/*  className={menu.alarmNnotice ? styles.current : styles.disabled} */}
          {/* > */}
          {/*  ?????? / ???????????? */}
          {/* </h4> */}
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
                profileSetting: false,
              });
            }}
            className={menu.TermsOfService ? styles.current : styles.disabled}
          >
            ????????????
          </h4>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="logout"
            onClick={EventLogout}
            className={menu.logout ? styles.current : styles.disabled}
          >
            ????????????
          </h4>

          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div
            onClick={() => {
              window.history.back();
            }}
            className={styles.closeButtonContainer}
          >
            <img src="/icons/????????? ??????.png" alt="????????? ????????? ????????? ??????" />
            <h4 className={styles.closeButton}>?????????</h4>
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
            menu.alarmNnotice ? <div>?????? ???????????? ?????? ???????????????.</div> : null
          }

          {
            menu.profileSetting ? <ProfileSetting /> : null
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
