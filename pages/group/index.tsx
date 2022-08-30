import React from 'react';
import Header from 'components/common/Header';
import TopNavigation from 'components/common/TopNavigation';
import styles from 'styles/pages/GroupPage.module.css';
import Link from 'next/link';
import GroupCard from '../../components/group/GroupCard';

const rendering = () => {
  const result = [];
  for (let i = 0; i < 80; i += 1) {
    result.push(
      <GroupCard
        url="/images/tennis.jpeg"
        groupName="테니스"
        tagList={['tennis']}
        like
      />,
    );
  }

  return result;
};

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
                {/* eslint-disable-next-line max-len */}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <span>그룹 만들기</span>
              </div>
            </Link>
          </div>

          <div className={styles.groupContainer}>
            {/* 더미 group card  나중에 map 사용 */}
            <GroupCard
              url="/images/tennis.jpeg"
              groupName="테니스"
              tagList={['tennis']}
              like
            />
            <GroupCard
              url="/images/tennis.jpeg"
              groupName="테니스"
              tagList={['tennis']}
              like
            />
            <GroupCard
              url="/images/tennis.jpeg"
              groupName="테니스"
              tagList={['tennis']}
              like
            />
            <GroupCard
              url="/images/tennis.jpeg"
              groupName="테니스"
              tagList={['tennis']}
              like
            />
            <GroupCard
              url="/images/tennis.jpeg"
              groupName="테니스"
              tagList={['tennis']}
              like
            />
            <GroupCard
              url="/images/tennis.jpeg"
              groupName="테니스"
              tagList={['tennis']}
              like
            />
            <GroupCard
              url="/images/tennis.jpeg"
              groupName="테니스"
              tagList={['tennis']}
              like
            />
            <GroupCard
              url="/images/tennis.jpeg"
              groupName="테니스"
              tagList={['tennis']}
              like
            />
            <GroupCard
              url="/images/tennis.jpeg"
              groupName="테니스"
              tagList={['tennis']}
              like
            />
            <GroupCard
              url="/images/tennis.jpeg"
              groupName="테니스"
              tagList={['tennis']}
              like
            />
          </div>
        </div>

        {/* 가입된 그룹 목록 */}
        <div className={styles.joinedContainer}>
          <span className={styles.textContainer}>가입된 그룹 목록</span>
          <div className={styles.groupContainer}>
            {/* 더미 group card  나중에 map 사용 */}
            {rendering()}
          </div>
        </div>
        {/* TODO pagenation 구현하기
          https://www.daleseo.com/react-pagination/
        */}
      </div>
    </div>
  );
}

export default GroupPage;
