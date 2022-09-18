import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import axios from 'axios';
import styles from '../../styles/main/ResetPassword.module.css';
import { rexEmail } from '../../RegExp';
import { SERVER_API } from '../../config';
import AuthTimer from './AuthTimer';

interface ResetPasswordProps {
  setResetPasswordView : Dispatch<SetStateAction<boolean>>;
}

function ResetPassword({ setResetPasswordView }:ResetPasswordProps) {
  const [view, setView] = useState({
    emailInput: true,
    emailCert: false,
    passwordReset: false,
  });

  const [pw, setPW] = useState({
    pw: '',
    pw2: '',
  });

  const [viewPW, setViewPW] = useState({
    pw: false,
    pw2: false,
  });
  const [resetTimer, setResetTimer] = useState(false);
  const [wrong, setWrong] = useState(true);
  const [resetData, setResetData] = useState({
    email: '',
    code: '',
    password: '',
  });

  useEffect(() => {

  }, [view]);

  useEffect(() => {
    if (pw.pw === pw.pw2 && pw.pw !== '') {
      setResetData({
        ...resetData,
        password: pw.pw,
      });
    }
  }, [pw]);

  const onChangeCertInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.currentTarget.value.length >= 7) {
      e.currentTarget.value = resetData.code;
    } else {
      setResetData({
        ...resetData,
        code: e.currentTarget.value,
      });
    }
  };

  const onClickReSend = () => {
    /* 인증번호 재발송 */
    // eslint-disable-next-line no-console
    setResetTimer(!resetTimer);
    alert('인증번호가 재발송 되었습니다.');

    axios.post(`${SERVER_API}/members/email/requestCode`, {
      email: resetData.email,
    })
      .then(() => {

      }).catch((err) => {
        console.log(err);
      });
  };

  const onClickSendEmail = () => {
    alert('인증번호가 발송되었습니다.');

    setView({
      emailInput: false,
      emailCert: true,
      passwordReset: false,
    });

    axios.post(
      `${SERVER_API}/members/email/requestCode`,
      {
        email: resetData.email,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    ).then((res) => {
      if (res.status === 200) {
        setView({
          emailInput: false,
          emailCert: true,
          passwordReset: false,
        });
      }
    })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalTopContainer}>
        {
              view.emailInput
                ? (
                  <>
                    <div className={styles.tmpDiv} />
                    <h1>비밀번호 찾기</h1>
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */}
                    <img
                      onClick={() => {
                        setResetPasswordView(false);
                      }}
                      className={styles.modalTopIcon}
                      src="/icons/창닫기 버튼.png"
                      alt="close modal"
                    />
                  </>
                )
                : null
          }

        {
              view.emailCert
                ? (
                  <>
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */}
                    <img
                      onClick={() => {
                        setView({
                          emailInput: true,
                          emailCert: false,
                          passwordReset: false,
                        });
                      }}
                      className={styles.modalTopIcon}
                      src="/icons/Return.png"
                      alt="뒤로가기"
                    />
                    <h1>이메일 인증</h1>
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */}
                    <img
                      onClick={() => {
                        setResetPasswordView(false);
                      }}
                      className={styles.modalTopIcon}
                      src="/icons/창닫기 버튼.png"
                      alt="close modal"
                    />
                  </>
                )
                : null
          }

        {
              view.passwordReset
                ? (
                  <>
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */}
                    <img
                      onClick={() => {
                        setView({
                          emailInput: false,
                          emailCert: true,
                          passwordReset: false,
                        });
                      }}
                      className={styles.modalTopIcon}
                      src="/icons/Return.png"
                      alt="뒤로가기"
                    />
                    <h1>비밀번호 재설정</h1>
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */}
                    <img
                      onClick={() => {
                        setResetPasswordView(false);
                      }}
                      className={styles.modalTopIcon}
                      src="/icons/창닫기 버튼.png"
                      alt="close modal"
                    />
                  </>
                )
                : null
          }
      </div>

      <div className={styles.modalContentContainer}>
        {
              view.emailInput
                ? (
                  <div className={styles.emailInputContainer}>
                    <div>
                      <h1 className={styles.text}>이메일을 입력해주세요.</h1>
                      <input
                        onKeyPress={(e) => {
                          if (e.code === 'Enter' && !wrong) {
                            onClickSendEmail();
                          }
                        }}
                        onChange={(e) => {
                          if (e.currentTarget.value.search(rexEmail) <= -1) {
                            setWrong(true);
                          } else {
                            setWrong(false);
                            setResetData({
                              ...resetData,
                              email: e.currentTarget.value,
                            });
                          }
                        }}
                        className={styles.emailInput}
                        type="text"
                      />
                      {
                            wrong
                              ? <div className={styles.wrongText}>이메일 형식이 아닙니다.</div>
                              : <div className={styles.wrongText} />
                        }
                    </div>
                    <div>
                      <button onClick={wrong ? null : onClickSendEmail} className={wrong === false ? styles.nextButtonTrue : styles.nextButtonFalse} type="button">다음</button>
                    </div>
                  </div>
                )
                : null
          }

        {
              view.emailCert
                ? (
                  <div className={styles.modalContentContainer}>
                    <div className={styles.container1}>
                      <h1 className={styles.text}>이메일로 인증번호가 발송되었습니다.</h1>
                      <h3>6자리 숫자를 입력해주세요.</h3>

                      <div className={styles.certNumberInputContainer}>
                        <input maxLength={6} onChange={onChangeCertInput} className={styles.certNumberInput} type="number" />
                        <AuthTimer resetTimer={resetTimer} />
                      </div>
                    </div>
                    <div className={styles.resendCertNumberContainer}>
                      {/* eslint-disable-next-line max-len */}
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                      <h3 onClick={onClickReSend}>인증번호 재발송</h3>
                    </div>
                    <div className={styles.buttonContainer}>
                      <button
                        onClick={() => {
                          setView({
                            emailInput: false,
                            emailCert: false,
                            passwordReset: true,
                          });
                        }}
                        className={
                        resetData.code.length === 6
                          ? styles.nextButtonTrue
                          : styles.nextButtonFalse
                        }
                        type="button"
                      >
                        다음
                      </button>
                    </div>

                  </div>
                )
                : null
          }

        {
          view.passwordReset
            ? (
              <div className={styles.modalContentContainer}>
                <div className={styles.passwordResetInnerContainer}>
                  <div className={styles.inputContainer}>
                    <div className={styles.passwordResetContainer}>
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label className={styles.labelText} htmlFor="password">
                        Password 재설정
                      </label>
                      <input
                        onChange={(e) => {
                          setPW({
                            ...pw,
                            pw: e.currentTarget.value,
                          });
                        }}
                        className={styles.passwordInput}
                        id="password"
                        type={viewPW.pw ? 'text' : 'password'}
                      />
                      {/* eslint-disable-next-line max-len */}
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                      <img
                        className={styles.icon}
                        onClick={() => {
                          if (viewPW.pw) {
                            setViewPW({
                              ...viewPW,
                              pw: false,
                            });
                          } else {
                            setViewPW({
                              ...viewPW,
                              pw: true,
                            });
                          }
                        }}
                        src={viewPW.pw ? '/icons/CheckedCircle.png' : '/icons/CheckCircle.png'}
                        alt="password view"
                      />
                      <span className={styles.smallText}>표시</span>

                    </div>

                    <div className={styles.passwordResetContainer}>
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label className={styles.labelText} htmlFor="passwordCheck">
                        Password 확인
                      </label>
                      <input
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            axios.put(
                              `${SERVER_API}/password/reset/verify`,
                              resetData,
                              {
                                headers: {
                                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                                },
                              },
                            ).then((res) => {
                              if (res.status === 200) {
                                alert('비밀번호 재 설정 성공');
                                setResetPasswordView(false);
                              }
                            })
                              .catch(() => {
                                alert('인증 코드가 올바르지 않거나 만료되었습니다.');
                              });
                          }
                        }}
                        onChange={(e) => {
                          setPW({
                            ...pw,
                            pw2: e.currentTarget.value,
                          });
                        }}
                        className={styles.passwordInput}
                        id="passwordCheck"
                        type={viewPW.pw2 ? 'text' : 'password'}
                      />
                      {/* eslint-disable-next-line max-len */}
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                      <img
                        className={styles.icon}
                        onClick={() => {
                          if (viewPW.pw2) {
                            setViewPW({
                              ...viewPW,
                              pw2: false,
                            });
                          } else {
                            setViewPW({
                              ...viewPW,
                              pw2: true,
                            });
                          }
                        }}
                        src={viewPW.pw2 ? '/icons/CheckedCircle.png' : '/icons/CheckCircle.png'}
                        alt="password view"
                      />
                      <span className={styles.smallText}>표시</span>
                    </div>
                    <h2 className={pw.pw === pw.pw2 && pw.pw !== '' ? styles.notWrongText : styles.wrongText}>{pw.pw === pw.pw2 && pw.pw !== '' ? '일치합니다.' : '일치하지 않습니다.' }</h2>
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        axios.put(
                          `${SERVER_API}/password/reset/verify`,
                          resetData,
                          {
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                          },
                        ).then((res) => {
                          if (res.status === 200) {
                            alert('비밀번호 재 설정 성공');
                            setResetPasswordView(false);
                          }
                        })
                          .catch(() => {
                            alert('인증 코드가 올바르지 않거나 만료되었습니다.');
                          });
                      }}
                      className={pw.pw === pw.pw2 && pw.pw !== '' ? styles.nextButtonTrue : styles.nextButtonFalse}
                      type="submit"
                    >
                      완료
                    </button>
                  </div>
                </div>
              </div>
            )
            : null
        }
      </div>
    </div>
  );
}

export default ResetPassword;
