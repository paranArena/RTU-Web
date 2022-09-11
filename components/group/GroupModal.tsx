import React, { useEffect, useState } from 'react';
import styles from 'styles/group/main/GroupModal.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
// eslint-disable-next-line import/no-cycle
import { GroupModalHome, GroupModalNotice, GroupModalRent } from './GroupModalTabView';
import { SERVER_API } from '../../config';
import AlertModal from '../common/AlertModal';

export interface ClubData {
  id : number;
  clubRole : string;
  hashtags : string[];
  introduction : string;
  name : string;
  // FIXME:
  thumbnailPath : string;
}

interface IGroupModal {
  clubData : ClubData
}

function GroupModal({ clubData }: IGroupModal) {
  const [currentTab, setCurrentTab] = useState<string>('HOME');
  const [show, setShow] = useState(false);
  const [role, setRole] = useState('NONE');
  const [Alert, setAlert] = useState<boolean>(false);

  const router = useRouter();

  const onClickLeaveButtonEvent = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    axios.delete(
      `${SERVER_API}/clubs/${clubData.id}/requests/leave`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,

        },
      },
    ).then((res) => {
      console.log(res);
      alert('탈퇴 성공');
      window.history.back();
    })
      .catch((err) => {
        console.log(err);
        alert('탈퇴 실패');
      });
  };

  const onClickJoinEventButton = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios({
      method: 'post',
      // eslint-disable-next-line react/destructuring-assignment
      url: `${SERVER_API}/clubs/${clubData.id}/requests/join`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => {
        if (res.status === 200) {
          setRole('WAIT');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (role === 'NONE' || role === 'WAIT' || role === 'USER') {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [role]);

  const onClickCancelEventButton = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios({
      method: 'delete',
      // eslint-disable-next-line react/destructuring-assignment
      url: `${SERVER_API}/clubs/${clubData.id}/requests/join/cancel`,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => {
        // console.log('cancel : ', res);
        if (res.status === 200) {
          setRole('NONE');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [tabStyles, setTabStyles] = useState({
    home: {
      style: `${styles.groupCurrentMenuText}`,
      current: true,
    },
    rent: {
      style: `${styles.groupMenuText}`,
      current: false,
    },
    notice: {
      style: `${styles.groupMenuText}`,
      current: false,
    },
    admin: {
      style: `${styles.groupMenuText}`,
      current: false,
    },
  });

  useEffect(() => {
    // eslint-disable-next-line react/destructuring-assignment
    axios.get(`${SERVER_API}/members/my/clubs/${clubData.id}/role`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        setRole(res.data.data.clubRole);
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (currentTab === 'HOME') {
      setTabStyles({
        home: {
          style: `${styles.groupCurrentMenuText}`,
          current: true,
        },
        rent: {
          style: `${styles.groupMenuText}`,
          current: false,
        },
        notice: {
          style: `${styles.groupMenuText}`,
          current: false,
        },
        admin: {
          style: `${styles.groupMenuText}`,
          current: false,
        },
      });
    } else if (currentTab === '대여') {
      setTabStyles({
        home: {
          style: `${styles.groupMenuText}`,
          current: false,
        },
        rent: {
          style: `${styles.groupCurrentMenuText}`,
          current: true,
        },
        notice: {
          style: `${styles.groupMenuText}`,
          current: false,
        },
        admin: {
          style: `${styles.groupMenuText}`,
          current: false,
        },
      });
    } else if (currentTab === '공지') {
      setTabStyles({
        home: {
          style: `${styles.groupMenuText}`,
          current: false,
        },
        rent: {
          style: `${styles.groupMenuText}`,
          current: false,
        },
        notice: {
          style: `${styles.groupCurrentMenuText}`,
          current: true,
        },
        admin: {
          style: `${styles.groupMenuText}`,
          current: false,
        },
      });
    } else {
      setTabStyles({
        home: {
          style: `${styles.groupMenuText}`,
          current: false,
        },
        rent: {
          style: `${styles.groupMenuText}`,
          current: false,
        },
        notice: {
          style: `${styles.groupMenuText}`,
          current: false,
        },
        admin: {
          style: `${styles.groupCurrentMenuText}`,
          current: true,
        },
      });
    }
  }, [currentTab]);

  const memberNumber = 9;
  console.log('GroupModal : ', clubData);

  return (
    <div className={styles.outerContainer}>
      {/* div 1 */}
      <section className={styles.groupInfoContainer}>
        <div className={styles.groupInfoOuterContainer}>
          {/* div 2 */}
          <div className={styles.groupInfoImageContainer}>
            {/* div 3 */}
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img
              className={styles.groupInfoImage}
              src={clubData.thumbnailPath}
              alt="group image"
            />
          </div>
          <div className={styles.groupInfoIntroduceContainer}>
            {/* div 3 */}
            <div className={styles.groupInfoInnerContainer}>
              {/* div 4 */}
              {/* eslint-disable-next-line react/destructuring-assignment */}
              <h1 className={styles.groupName}>{clubData.name}</h1>
              <span className={styles.groupMemberNumber}>
                일반회원 &nbsp; 멤버 &nbsp;
                {memberNumber}
                명
              </span>
            </div>
            <div>
              {/* div 4 */}
              {/* eslint-disable-next-line react/destructuring-assignment */}
              <span className={styles.groupInfoIntroduce}>{clubData.introduction}</span>
            </div>
          </div>
          <div className={styles.groupInfoTagContainer}>
            {/* div 3 */}
            {/* eslint-disable-next-line react/destructuring-assignment */}
            {
              // eslint-disable-next-line react/destructuring-assignment
               clubData.hashtags.map((tag) => (
                 <span key={tag}>
                   #
                   {tag}
                 </span>
               ))
            }
          </div>
        </div>
        { show
          ? (
        // eslint-disable-next-line no-nested-ternary
            <button type="submit" onClick={role === 'WAIT' ? onClickCancelEventButton : role === 'USER' ? onClickLeaveButtonEvent : onClickJoinEventButton} className={role === 'NONE' ? styles.joinButton : role === 'USER' ? styles.clubLeaveButton : styles.requestButton}>{role === 'NONE' ? '가입요청' : role === 'USER' ? '탈퇴하기' : '요청완료'}</button>
          )
          : null}
      </section>

      {/* Content section */}
      <section
        className={`${styles.groupContentContainer} ${styles.groupHome}`}
      >
        {/* div 2 */}
        {/* eslint-disable-next-line no-nested-ternary,max-len */}
        { tabStyles.home.current
          ? <GroupModalHome clubId={clubData.id} show={(role === 'WAIT' || role === 'NONE')} />
        // eslint-disable-next-line no-nested-ternary
          : tabStyles.rent.current
            ? <GroupModalRent clubData={clubData} show={(role === 'WAIT' || role === 'NONE')} />
            : tabStyles.notice.current
            // TODO:: 지금
              ? <GroupModalNotice clubId={clubData.id} show={(role === 'WAIT' || role === 'NONE')} />
              : null}

      </section>

      {/* nav tab section */}
      <section className={`${styles.groupMenuContainer}`}>
        {/* div 2 */}
        <nav>
          <ul>
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            <li
              className={tabStyles.home.style}
              onClick={() => setCurrentTab('HOME')}
            >
              HOME
            </li>
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            <li
              className={tabStyles.rent.style}
              onClick={() => setCurrentTab('대여')}
            >
              대여
            </li>
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            <li
              className={tabStyles.notice.style}
              onClick={() => setCurrentTab('공지')}
            >
              공지
            </li>
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            <li
              className={tabStyles.admin.style}
              onClick={() => {
                console.log('관리자 클릭');
                if (role === 'OWNER' || role === 'ADMIN') {
                  setCurrentTab('관리자');
                  router.push({
                    pathname: '/admin',
                    query: {
                      // eslint-disable-next-line react/destructuring-assignment
                      id: clubData.id,
                    },
                  });
                } else {
                  console.log('else');
                  setCurrentTab('관리자');
                  setAlert(true);
                }
              }}
            >
              관리자
            </li>
          </ul>
        </nav>
      </section>
      {
        Alert ? (
          <AlertModal
            top={30}
            type="alert"
            titleText="관리자 권한이 필요합니다!"
            onClickEvent={() => {
              setAlert(false); setCurrentTab('HOME');
            }}
          />
        ) : null
      }
    </div>
  );
}

export default GroupModal;
