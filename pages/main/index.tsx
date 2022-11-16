import React, { useEffect, useState } from 'react';
import styles from 'styles/pages/Main.module.css';
import { getMyClubsRoles } from '../../api/member';

function Main() {
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    getMyClubsRoles().then((myRoles) => {
      if (Array.isArray(myRoles) && (myRoles.includes('ADMIN') || myRoles.includes('OWNER'))) setFlag(true);
    });
  }, []);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.topTitleContainer}>
          <h1>Ren2U</h1>
          <h3>관리자 모드</h3>
        </div>
      </div>

      <div className={styles.rightOuterContainer}>
        <div className={styles.rightInnerContainer}>
          {
            !flag ? <h1>관리하고 있는 그룹이 없습니다.</h1> : <h1>ㅇㅇ</h1>
          }
        </div>
      </div>
    </div>
  );
}

export default Main;
