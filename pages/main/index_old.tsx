import React, { useEffect, useState } from 'react';
import styles from 'styles/pages/Main_old.module.css';
import axios from 'axios';
import { SERVER_API } from '../../config';

function Main() {
  const [user, setUser] = useState('');

  useEffect(() => {
    axios.get(
      `${SERVER_API}/members/my/info`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    ).then((res) => {
      setUser(res.data.data.name);
    });
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainInnerContainer}>
        <span className={user === '' ? styles.mainPageTextHidden : styles.mainPageText}>
          Hello,
          {' '}
          {user}
        </span>
        <span className={user === '' ? styles.mainPageText2Hidden : styles.mainPageText2}>
          Welcome,
          {' '}
          Ren2U
        </span>
      </div>
    </div>
  );
}

export default Main;
