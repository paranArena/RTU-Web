import React, { useEffect, useState } from 'react';
import GroupModal, { ClubData } from 'components/group/GroupModal';
import styles from 'styles/group/main/GroupMainPage.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SERVER_API } from '../../../config';

function GroupMain() {
  const router = useRouter();
  const [clubData, setClubData] = useState<ClubData | null>(null);

  useEffect(() => {
    if (router !== undefined && router !== null) {
      console.log(router.query.id);
      axios.get(`${SERVER_API}/clubs/${router.query.id}/info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            setClubData(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className={styles.outerContainer}>
      {
            clubData !== null
              ? <GroupModal clubData={clubData} />
              : null
        }

    </div>
  );
}

export default GroupMain;
