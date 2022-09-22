import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/mypage/profieSetting.module.css';
import { SERVER_API } from '../../config';
import { defaultUserInfo, IUserInfo } from '../../pages/mypage';

function ProfileSetting() {
  const [userInfo, setUserInfo] = useState<IUserInfo>(defaultUserInfo);

  useEffect(() => {
    axios.get(`${SERVER_API}/members/my/info`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setUserInfo(res.data.data);
        }
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  const onClickUpdateProfile = () => {
    if (userInfo.name !== '' && userInfo.major !== '' && userInfo.studentId !== '' && userInfo.phoneNumber !== '') {
      axios({
        method: 'put',
        url: `${SERVER_API}/members/my/info`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
          name: userInfo.name,
          phoneNumber: userInfo.phoneNumber,
          studentId: userInfo.studentId,
          major: userInfo.major,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            alert(`${userInfo.name}님의 프로필이 수정되었습니다.`);
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('필수 정보들을 입력해주세요.');
    }
  };

  return (
    <div className={styles.profileSettingOuterContainer}>
      <div className={styles.profileSettingInnerContainer}>
        <section className={styles.titleContainer}>
          <h1>프로필 수정</h1>
        </section>

        <section className={styles.profileImgNInfoContainer}>
          <section className={styles.profileImgContainer}>
            <label className={styles.profileImgLabel} htmlFor="profileImg">
              <img className={styles.profileImg} src="/images/defaultUser.png" alt="profile img" />
              {/* <input id="profileImg" type="file" style={{ display: 'none' }} /> */}
            </label>
            <span>{userInfo.email}</span>
          </section>

          <section className={styles.profileUserInfoInputContainer}>
            <div className={styles.userInfoInputContainer}>
              <span>
                이름
              </span>
              <input
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    name: e.currentTarget.value,
                  });
                }}
                value={userInfo.name}
                className={styles.userInfoInput}
                id="name"
                placeholder="(필수) 이름"
              />

            </div>

            <div className={styles.userInfoInputContainer}>
              <span>
                학과
              </span>
              <input
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    major: e.currentTarget.value,
                  });
                }}
                value={userInfo.major}
                className={styles.userInfoInput}
                placeholder="(필수) 학과"
              />
            </div>

            <div className={styles.userInfoInputContainer}>
              <span>
                휴대폰번호
              </span>
              <input
                onChange={(e) => {
                  if (e.currentTarget.value.length <= 11) {
                    setUserInfo({
                      ...userInfo,
                      phoneNumber: e.currentTarget.value,
                    });
                  }
                }}
                type="number"
                value={userInfo.phoneNumber}
                className={styles.userInfoInput}
                placeholder="(필수) 휴대폰번호"
              />
            </div>

            <div className={styles.userInfoInputContainer}>
              <span>
                학번
              </span>
              <input
                type="number"
                onChange={(e) => {
                  if (e.currentTarget.value.length <= 10) {
                    setUserInfo({
                      ...userInfo,
                      studentId: e.currentTarget.value,
                    });
                  }
                }}
                value={userInfo.studentId}
                className={styles.userInfoInput}
                placeholder="(필수) 학번"
              />
            </div>

          </section>
        </section>

        <section className={styles.buttonContainer}>
          <button onClick={onClickUpdateProfile} className={styles.submitButton} type="submit">확인</button>
        </section>
      </div>
    </div>
  );
}

export default ProfileSetting;
