
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
    <div className={styles.mypageConatiner} />
  );
}

export default MyPage;
