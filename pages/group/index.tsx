import React, { useEffect, useState } from 'react';
import styles from 'styles/pages/GroupPage.module.css';
import axios from 'axios';
import Link from 'next/link';
import GroupCard from '../../components/group/GroupCard';
import { SERVER_API } from '../../config';
import { ClubData } from '../../components/group/GroupModal';

const rendering = (joinedClubList : ClubData[]) => {
  const result = [];

  if (joinedClubList === null) {
    return null;
  }

  joinedClubList.forEach((item) => {
    result.push(
      <GroupCard
        id={item.id}
        url={item.thumbnailPath}
        groupName={item.name}
        tagList={item.hashtags}
      />,
    );
  });

  return result;
};

function GroupPage() {
  const [joinedClubList, setjoinedClubList] = useState<ClubData[] | null>();

  useEffect(() => {
    axios.get(`${SERVER_API}/members/my/clubs`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        setjoinedClubList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log();
  }, [joinedClubList]);

  return (
    <div className={styles.outerContainer}>

      <div className={styles.innerContainer}>
        {/* /!* 즐겨찾기 *!/ */}
        {/* <div className={styles.likeContainer}> */}
        {/*  <div className={styles.textContainer}> */}
        {/*    <span>즐겨찾기</span> */}

        {/*  </div> */}

        {/*  <div className={styles.groupContainer}> */}
        {/*    /!* 더미 group card  나중에 map 사용 *!/ */}
        {/*    <GroupCard */}
        {/*      url="/images/tennis.jpeg" */}
        {/*      groupName="테니스" */}
        {/*      tagList={['tennis']} */}
        {/*      like */}
        {/*    /> */}

        {/*  </div> */}
        {/* </div> */}

        {/* 가입된 그룹 목록 */}
        <div className={styles.likeContainer}>
          <div className={styles.textContainer}>
            <span>가입된 그룹 목록</span>

            <Link href="/addGroup">
              <div className={styles.addGroupButtonContainer}>
                <div className={styles.addImage} />
                <span>그룹 만들기</span>
              </div>
            </Link>
          </div>

          <div className={styles.groupContainer}>
            {/* 더미 group card  나중에 map 사용 */}
            {
              joinedClubList !== undefined
                // ? null : null
                ? rendering(joinedClubList) : null
            }
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
