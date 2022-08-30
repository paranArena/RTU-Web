import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from 'styles/pages/Login.module.css';
import RegisterModal from 'components/register/RegisterModal';
import CertificationModal from 'components/register/CertificationModal';
import RegisterSuccessModal from 'components/register/RegisterSuccessModal';
import Header from 'components/common/Header';
import axios, { AxiosError } from 'axios';

// const API_SERVER = '';

interface LoginDate {
  email: string;
  password: string;
}

function Login() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [wrongVisible, setWrongVisible] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<LoginDate>({ email: '', password: '' });
  const router = useRouter();

  // Cert Modal Props
  const [isCert, setIsCert] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setIsRegisterOpen(!isRegisterOpen);
  }, [isRegisterOpen]);

  const onChangeEmailHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const currentLoginData = loginData;
    currentLoginData.email = e.currentTarget.value;
    setLoginData(currentLoginData);
  };

  const onChangePasswordHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const currentLoginData = loginData;
    currentLoginData.password = e.currentTarget.value;
    setLoginData(currentLoginData);
  };

  const onClickLogin = () => {
    // setWrongVisible(!wrongVisible);
    // 서버에 로그인 요청

    axios.post('http://ec2-13-125-234-225.ap-northeast-2.compute.amazonaws.com:8080/authenticate', loginData)
      .then((res: { status: number; data: { token: any; }; }) => {
        if (res.status === 200) {
          // eslint-disable-next-line no-console
          console.log(res.data.token);
        }
      }).catch((error : AxiosError) => {
      // eslint-disable-next-line no-console
        console.log(error);
      });
    router.push('/main');
  };

  useEffect(() => {}, [isCert]);

  return (
    <div className={styles.container}>

      <Header />

      <main className={styles.main}>
        {isRegisterOpen ? (
          <RegisterModal
            isOpenRegisterOpen={isRegisterOpen}
            setIsOpenRegisterOpen={setIsRegisterOpen}
            isCert={isCert}
            setIsCert={setIsCert}
          />
        ) : null}
        {isCert ? (
          <CertificationModal
            setRegisterSuccess={setRegisterSuccess}
            registerSuccess={registerSuccess}
            isOpenRegisterOpen={isRegisterOpen}
            setIsOpenRegisterOpen={setIsRegisterOpen}
            isCert={isCert}
            setIsCert={setIsCert}
          />
        ) : null}
        {/* eslint-disable-next-line max-len */}
        {registerSuccess ? (<RegisterSuccessModal registerSuccess={registerSuccess} setRegisterSuccess={setRegisterSuccess} />) : null}
        <section className={styles.renderingImage}>{/* 렌더링 페이지 이미지 넣을 곳 */}</section>

        <section className={styles.loginSection}>
          {/* 로그인 넣을 구역 */}

          <div className={styles.logoContainer}>
            {/* 로고 넣을 곳 */}
            로고
          </div>

          <div className={styles.explainTextContainer}>
            <span className={styles.firstText}>Welcome!</span>
            <span className={styles.secondText}>로그인 후 다양한 &quot;가치&quot;를 누려보세요!</span>
          </div>

          <div className={styles.loginBox}>
            <input
              onChange={onChangeEmailHandler}
              name="email"
              type="email"
              className={styles.inputTag}
              placeholder="Email"
            />
            <input
              onChange={onChangePasswordHandler}
              name="password"
              type="password"
              className={styles.inputTag}
              placeholder="Password"
            />
          </div>

          {wrongVisible ? (
            <div className={styles.wrongInput}>이메일 또는 비밀번호를 잘못 입력했습니다.</div>
          ) : (
            <div className={styles.wrongInputHidden} />
          )}

          <div className={styles.submitLinkBox}>
            <button onClick={onClickLogin} className={styles.submitButton} type="submit">
              로그인
            </button>

            <div className={styles.passwordSignBox}>
              {/* TODO 회원가입 Link Tag 삭제 */}
              <div className={styles.passwordSignLink}>
                {/* eslint-disable-next-line react/button-has-type */}
                <button onClick={onClickToggleModal} className={styles.buttonStyle}>비밀번호 찾기</button>
              </div>
              <div className={styles.divide} />
              <div className={styles.passwordSignLink}>
                {/* eslint-disable-next-line react/button-has-type */}
                <button onClick={onClickToggleModal} className={styles.buttonStyle}>
                  회원가입
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;
