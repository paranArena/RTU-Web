import styles from 'styles/pages/MyPage.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_API } from '../../config';

interface IClub {
  id : number;
  club : string;
}

interface IUserInfo {
  id : number;
  email : string;
  name : string;
  phoneNumber : string;
  studentId : string;
  major : string;
  activated : boolean;
  clubList : IClub[];
  rentals : [];
  authorities : [];
}

const defaultUserInfo :IUserInfo = {
  id: 0,
  email: '',
  name: '',
  phoneNumber: '',
  studentId: '',
  major: '',
  activated: false,
  clubList: [{ id: 0, club: '' }],
  rentals: [],
  authorities: [],
};

function MyPage() {
  const [userInfo, setUserInfo] = useState<IUserInfo>(defaultUserInfo);
  const [myClubs, setMyClubs] = useState('');

  // 클럽 조회 버튼 이벤트
  const onClickGetMyClub = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    axios.get(`${SERVER_API}/members/my/clubs`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.data);
          setMyClubs(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get(`${SERVER_API}/members/my/info`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log('res.data.data : ', res.data.data);
          setUserInfo(res.data.data);
        }
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log('userInfo', userInfo);
  }, [userInfo]);

  return (
    <div className={styles.myPageConatiner}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>{userInfo.name}</h1>
      <h1>{userInfo.email}</h1>
      <h1>{userInfo.id}</h1>
      <h1>{userInfo.major}</h1>
      <h1>{userInfo.phoneNumber}</h1>
      <h1>{userInfo.studentId}</h1>
      <h1>{userInfo.activated}</h1>
      <button onClick={onClickGetMyClub} type="submit">내가 가입한 클럽 조회</button>
      <h1>
        내가 가입한 클럽 :
        {myClubs}
      </h1>

    </div>
  );
}

export default MyPage;
