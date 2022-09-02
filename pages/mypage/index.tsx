import React from 'react';
import Header from 'components/common/Header';
import TopNavigation from 'components/common/TopNavigation';
import styles from 'styles/pages/MyPage.module.css';

// useEffect(() => {
//   axios.post(`/members/:${loginData.email}/info`)
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }, []);

function MyPage() {
  return (
    <div className={styles.mypageConatiner}>
      <Header />
      <TopNavigation />

    </div>
  );
}

export default MyPage;
