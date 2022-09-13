import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from 'styles/pages/Login.module.css';
import RegisterModal from 'components/register/RegisterModal';
import CertificationModal from 'components/register/CertificationModal';
import RegisterSuccessModal from 'components/register/RegisterSuccessModal';
import Header from 'components/common/Header';
import axios from 'axios';
import { SERVER_API } from '../config';

// axios.defaults.baseURL = 'http://ec2-15-165-38-225.ap-northeast-2.compute.amazonaws.com:80/';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://15.165.38.225:8080';

export interface SignUpProps {
  email: string
  password: string
  name: string
  major: string
  studentId: string
  phoneNumber: string
}

export const defaultSignUpProps: SignUpProps = {
  email: '',
  password: '',
  name: '',
  major: '',
  studentId: '',
  phoneNumber: '',
};

declare global {
  interface Window {
    kakao: any;
  }
}

interface LoginDate {
  email: string;
  password: string;
}

function Login() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [wrongVisible, setWrongVisible] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);
  const [signupProps, setSignUpProps] = useState<SignUpProps>(defaultSignUpProps);

  const router = useRouter();

  const [loginData, setLoginData] = useState<LoginDate>({ email: '', password: '' });
  // Cert Modal Props
  const [isCert, setIsCert] = useState<boolean>(false);

  const onClickLoginButton = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(loginData);

    if (loginData.email === '' && loginData.password === '') {
      alert('아이디와 비밀번호를 입력해주세요');
    } else {
      console.log(SERVER_API);
      axios.post(`${SERVER_API}/authenticate`, loginData)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            router.push('/main');
          }
        })
        .catch(() => {
          alert('아이디 또는 비번이 틀렸습니다.');
        });
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    console.log('localStorage : ', localStorage);
  }, []);

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
  useEffect(() => {
    console.log('uE isCert :: loginData : ', loginData);
  }, [isCert]);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {isRegisterOpen ? (
          <RegisterModal
            signupProps={signupProps}
            setSignUpProps={setSignUpProps}
            isOpenRegisterOpen={isRegisterOpen}
            setIsOpenRegisterOpen={setIsRegisterOpen}
            isCert={isCert}
            setIsCert={setIsCert}
          />
        ) : null}
        {isCert ? (
          <CertificationModal
            email={signupProps.email.concat('@ajou.ac.kr')}
            setRegisterSuccess={setRegisterSuccess}
            registerSuccess={registerSuccess}
            isOpenRegisterOpen={isRegisterOpen}
            setIsOpenRegisterOpen={setIsRegisterOpen}
            isCert={isCert}
            setIsCert={setIsCert}
            signupProps={signupProps}
          />
        ) : null}
        {/* eslint-disable-next-line max-len */}
        {registerSuccess ? (<RegisterSuccessModal registerSuccess={registerSuccess} setRegisterSuccess={setRegisterSuccess} />) : null}
        <section className={styles.renderingImage}>{/* 렌더링 페이지 이미지 넣을 곳 */}</section>

        <section className={styles.loginSection}>
          {/* 로그인 넣을 구역 */}

          <div className={styles.logoContainer}>
            {/* 로고 넣을 곳 */}
            <img className={styles.logoImg} src="/images/logo/ren2U_logo.png" alt="Ren2U Logo" />
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
            <button onClick={onClickLoginButton} className={styles.submitButton} type="submit">
              로그인
            </button>

            <div className={styles.passwordSignBox}>
              {/* TODO 회원가입 Link Tag 삭제 */}
              <div className={styles.passwordSignLink}>
                {/* eslint-disable-next-line react/button-has-type */}
                <button onClick={() => { alert('아직 지원하지 않는 기능입니다.'); }} className={styles.buttonStyle}>비밀번호 찾기</button>
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
