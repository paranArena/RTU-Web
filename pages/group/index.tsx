import React from 'react';
import Header from 'components/common/Header';
import TopNavigation from 'components/common/TopNavigation';
import styles from 'styles/pages/GroupPage.module.css';
import Link from 'next/link';
import GroupCard from '../../components/group/GroupCard';

function GroupPage() {
  return (
    <div className={styles.outerContainer}>
      <Header />
      <TopNavigation />

      <div className={styles.innerContainer}>
        {/*  즐겨찾기  */}
        <div className={styles.likeContainer}>
          <div className={styles.textContainer}>
            <span>즐겨찾기</span>
            <Link href="/addGroup">
              <div className={styles.addGroupButtonContainer}>
                <div className={styles.addImage} />
                <span>그룹 만들기</span>
              </div>
            </Link>
          </div>

          <div className={styles.groupContainer}>
            {/* 더미 group card  나중에 map 사용 */}
            <GroupCard url="/images/tennis.jpeg" groupName="테니스" tagList={['tennis']} like />
            <GroupCard url="/images/tennis.jpeg" groupName="테니스" tagList={['tennis']} like />
            <GroupCard url="/images/tennis.jpeg" groupName="테니스" tagList={['tennis']} like />
            <GroupCard url="/images/tennis.jpeg" groupName="테니스" tagList={['tennis']} like />
            <GroupCard url="/images/tennis.jpeg" groupName="테니스" tagList={['tennis']} like />
            <GroupCard url="/images/tennis.jpeg" groupName="테니스" tagList={['tennis']} like />
            <GroupCard url="/images/tennis.jpeg" groupName="테니스" tagList={['tennis']} like />
            <GroupCard url="/images/tennis.jpeg" groupName="테니스" tagList={['tennis']} like />
            <GroupCard url="/images/tennis.jpeg" groupName="테니스" tagList={['tennis']} like />
            <GroupCard url="/images/tennis.jpeg" groupName="테니스" tagList={['tennis']} like />
          </div>
        </div>

        {/* 가입된 그룹 목록 */}
        <div className={styles.joinedContainer}>
          <span className={styles.textContainer}>가입된 그룹 목록</span>
          <div className={styles.groupContainer}>
            {/* 더미 group card  나중에 map 사용 */}
            <GroupCard url="/images/tennis.jpeg" groupName="테니스" tagList={['tennis']} like />
            <GroupCard url="/images/tennis.jpeg" groupName="테니스" tagList={['tennis']} like />
            <GroupCard url="/images/tennis.jpeg" groupName="테니스" tagList={['tennis']} like />
            <GroupCard url="/images/tennis.jpeg" groupName="테니스" tagList={['tennis']} like />
            <GroupCard url="/images/tennis.jpeg" groupName="테니스" tagList={['tennis']} like />
            <GroupCard url="/images/tennis.jpeg" groupName="테니스" tagList={['tennis']} like />
            <GroupCard url="/images/tennis.jpeg" groupName="테니스" tagList={['tennis']} like />
          </div>
        </div>

      </div>

    </div>
  );
}

export default GroupPage;
