import React, {
  Dispatch, SetStateAction, useCallback, useEffect, useState,
} from 'react';
import styles from 'styles/main/CertificationModal.module.css';
import axios from 'axios';
import AuthTimer from './AuthTimer';
import { SERVER_API } from '../../config';
import { SignUpProps } from '../../pages';

interface Props {
  email: string;
  isOpenRegisterOpen: boolean;
  setIsOpenRegisterOpen: Dispatch<SetStateAction<boolean>>;
  isCert: boolean;
  setIsCert: Dispatch<SetStateAction<boolean>>;
  registerSuccess: boolean;
  setRegisterSuccess: Dispatch<SetStateAction<boolean>>;
  signupProps : SignUpProps;
}

function CertificationModal({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerSuccess,
  email,
  isCert,
  setIsCert,
  isOpenRegisterOpen,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setRegisterSuccess,
  signupProps,
  setIsOpenRegisterOpen,
}: Props): React.ReactElement {
  const [isActive, setIsActive] = useState<boolean>(false); // 완료버튼 활성화
  const [certNumber, setCertNumber] = useState<string>('');
  const [isNotCorrect, setIsNotCorrect] = useState<boolean>(false);
  const [reSend, setReSend] = useState<boolean>(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [one, setOne] = useState(0);

  useEffect(() => {
    if (one === 1) {
      axios.post(`${SERVER_API}/members/email/requestCode`, { email })
        .then(() => {
        }).catch((err) => {
          console.log(err);
        });
    } else if (one === 0) {
      setOne(1);
    }
  }, [one]);

  useEffect(() => {
    console.log();
  }, []);

  const onCLickSubmit = () => {
    let Email = signupProps.email;
    Email = Email.concat('@ajou.ac.kr');
    setIsNotCorrect(false);

    axios.post(`${SERVER_API}/signup`, {
      email: Email,
      password: signupProps.password,
      name: signupProps.name,
      phoneNumber: signupProps.phoneNumber,
      studentId: signupProps.studentId,
      major: signupProps.major,
      verificationCode: certNumber,
    })
      .then((res) => {
        if (res.status === 200) {
          setRegisterSuccess(true);
        }
      })
      .catch(() => {
        setIsNotCorrect(true);
      });
  };

  const onClickReSend = () => {
    /* 인증번호 재발송 */
    // eslint-disable-next-line no-console
    setReSend(true);
    setResetTimer(!resetTimer);

    axios.post(`${SERVER_API}/members/email/requestCode`, { email })
      .then(() => {
        alert('인증번호가 재발송 되었습니다.');
      }).catch((err) => {
        console.log(err);
      });
  };

  const onChangeCertInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.currentTarget.value.length >= 7) {
      e.currentTarget.value = certNumber;
    } else {
      setCertNumber(e.currentTarget.value);
    }
  };

  useEffect(() => {
    if (certNumber.length === 6) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [certNumber]);

  // 회원가입 모달 창 닫기 버튼 이벤트
  const onClickClose = useCallback(() => {
    setIsCert(false);
    setIsOpenRegisterOpen(false);
  }, [isCert, isOpenRegisterOpen]);

  const onClickReturn = useCallback(() => {
    setIsCert(false);
  }, [isCert]);

  /* 인증 완료 버튼 이벤트 함수 */
  // const onClickSubmitButton = (e: React.FormEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   /* 서버로 요청 */
  //   alert('submit');
  //
  //   setIsCert(true);
  // };

  useEffect(() => {}, [certNumber]);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalTopContainer}>
        {/* 뒤로가기 이메일 인증, X */}
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */}
        <img onClick={onClickReturn} src="/icons/Return.png" alt="Return Button" className={styles.returnButton} />
        <span className={styles.modalTitle}>이메일 인증</span>
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */}
        <img onClick={onClickClose} src="/icons/Close.png" alt="Close Button" className={styles.closeButton} />
      </div>

      {/* 인증번호가 발송되었습니다. 부분 */}
      <div className={styles.certModalMainContainer}>
        <div className={styles.certInputDiv}>
          <span className={styles.certInputDivTitle}> 이메일로 인증번호가 발송되었습니다.</span>
          <span className={styles.certInputSubText}>6자리 숫자를 입력해주세요.</span>

          <div className={styles.certInputContainer}>
            <input onChange={onChangeCertInput} maxLength={6} className={styles.certInput} type="number" />
            <AuthTimer resetTimer={resetTimer} />
          </div>

          {isNotCorrect ? (
            <span className={styles.notCorrectCert}>인증번호가 일치하지 않거나 만료되었습니다.</span>
          ) : (
            <span className={styles.notCorrectCert}>ㅤ</span>
          )}
        </div>

        <div className={styles.certReqDiv}>
          {/* 인증번호 재발송 버튼 */}
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <span onClick={onClickReSend} className={styles.certSendButton}>
            인증번호 재발송
          </span>
          {reSend ? <span className={styles.reSendText}>인증번호가 재발송되었습니다.</span> : null}
        </div>
      </div>

      {/* 완료 버튼 */}
      <div className={styles.submitButtonContainer}>
        {isActive ? (
          <button type="button" onClick={onCLickSubmit} className={styles.submitButtonActive}>
            완료
          </button>
        ) : (
          <button type="button" className={styles.submitButton}>완료</button>
        )}
      </div>
    </div>
  );
}

export default CertificationModal;
