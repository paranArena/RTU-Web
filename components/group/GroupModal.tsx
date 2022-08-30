import React, { useEffect, useState } from 'react';
import styles from 'styles/group/main/GroupModal.module.css';
import { GroupModalHome, GroupModalRent } from './GroupModalTabView';
import { JoinButton } from '../common/Button';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface GroupModalProps {
  groupName: string
  tagsList: string[]
  introduce: string
  memberNumber: number
  membership: string
}

// eslint-disable-next-line no-irregular-whitespace
//　{groupName, tagList, introduce, memberNumber, membership} : GroupModalProps
function GroupModal() {
  const [currentTab, setCurrentTab] = useState<string>('HOME');

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [groupTagList, setGroupTagList] = useState<string[]>([
    '#테니스',
    '#운동',
    '#tennis',
  ]);
  const groupName = 'REN2U';
  const introduce = '안녕하세요. REN2U입니다. 아주대학교 렌탈 서비스 플랫폼안녕하세요. REN2U입니다. 아주대학교 렌탈 서비스 플랫폼안녕하세요. REN2U입니다. 아주대학교 렌탈 서비스 플랫폼안녕하세요. REN2U입니다. 아주대학교 렌탈 서비스 ';
  const memberNumber = 9;

  const [requestState, setRequestState] = useState<boolean>(false);

  useEffect(() => {

  }, [requestState]);

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
              src="/images/tennis.jpeg"
              alt="group image"
            />
          </div>
          <div className={styles.groupInfoIntroduceContainer}>
            {/* div 3 */}
            <div className={styles.groupInfoInnerContainer}>
              {/* div 4 */}
              <h1 className={styles.groupName}>{groupName}</h1>
              <span className={styles.groupMemberNumber}>
                일반회원 &nbsp; 멤버 &nbsp;
                {memberNumber}
                명
              </span>
            </div>
            <div>
              {/* div 4 */}
              <span className={styles.groupInfoIntroduce}>{introduce}</span>
            </div>
          </div>
          <div className={styles.groupInfoTagContainer}>
            {/* div 3 */}
            {groupTagList.map((tag) => (
              <span>{tag}</span>
            ))}
          </div>
        </div>

        <JoinButton requestFlag={requestState} setRequestFlag={setRequestState} />

      </section>
      <section
        className={`${styles.groupContentContainer} ${styles.groupHome}`}
      >
        {/* div 2 */}
        { tabStyles.home.current ? <GroupModalHome /> : tabStyles.rent.current ? <GroupModalRent /> : null }
      </section>
      <section className={`${styles.groupMenuContainer}`}>
        {/* div 2 */}
        <nav>
          <ul>
            <li
              className={tabStyles.home.style}
              onClick={() => setCurrentTab('HOME')}
            >
              HOME
            </li>
            <li
              className={tabStyles.rent.style}
              onClick={() => setCurrentTab('대여')}
            >
              대여
            </li>
            <li
              className={tabStyles.notice.style}
              onClick={() => setCurrentTab('공지')}
            >
              공지
            </li>
            <li
              className={tabStyles.admin.style}
              onClick={() => setCurrentTab('관리자')}
            >
              관리자
            </li>
          </ul>
        </nav>
      </section>
    </div>
  );
}

export default GroupModal;
