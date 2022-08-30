import React, {
  Dispatch, SetStateAction, useCallback, useEffect, useState,
} from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import styles from 'styles/main/RegisterModal.module.css';
import axios from 'axios';

interface ShowProps {
  isOpenRegisterOpen: boolean;
  setIsOpenRegisterOpen: Dispatch<SetStateAction<boolean>>;
  isCert: boolean;
  setIsCert: Dispatch<SetStateAction<boolean>>;
}

const headers = {
  Accept: 'application/json',
  'x-ms-version': '2019-07-11',
  'x-ms-documentdb-isquery': true,
  'Content-Type': 'application/query+json',
  'x-ms-documentdb-query-enablecrosspartition': 'true',
  'cache-control': 'no-cache',
  'Access-Control-Allow-Origin': '*',
};

const OverlapCheckedButton = styled.button`
  margin-left: 3.5%;
  width: 14.3640350877%;
  height: 100%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 33px;

  color: #ffffff;
  background: #1e2f97;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  border-radius: 30px;
  border: none;
`;

function RegisterModal({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isCert,
  setIsCert,
  isOpenRegisterOpen,
  setIsOpenRegisterOpen,
}: ShowProps): React.ReactElement<ShowProps> {
  // 회원가입 필드 변수
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null); // password input
  const [checkPassword, setCheckPassword] = useState<string | null>(null); // password check input
  const [name, setName] = useState<string | null>(null);
  const [department, setDepartment] = useState<string | null>(null);
  const [studentID, setStudentID] = useState<number | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<number | null>(null);

  // event 처리용 변수
  const [isOverlap, setIsOverlap] = useState<boolean>(false); // 이메일 중복확인
  // eslint-disable-next-line max-len
  const [isCorrectPW, setIsCorrectPW] = useState<boolean | null>(null); // password와 password check 비교
  const [isActive, setIsActive] = useState<boolean>(false); // 완료버튼 활성화
  const [isCheckedPassword, setIsCheckedPassword] = useState<{ visible: boolean; type: string }>({
    visible: false,
    type: 'password',
  });
  // eslint-disable-next-line max-len
  const [isCheckedPasswordCheck, setIsCheckedPasswordCheck] = useState<{ visible: boolean; type: string }>({
    visible: false,
    type: 'password',
  });

  // Password 표시 event
  const onClickCheckedPassword = useCallback(() => {
    if (!isCheckedPassword.visible) {
      setIsCheckedPassword({
        visible: true,
        type: 'text',
      });
    } else {
      setIsCheckedPassword({
        visible: false,
        type: 'password',
      });
    }
  }, [isCheckedPassword]);

  // Password Check 표시 event
  const onClickCheckedPasswordCheck = useCallback(() => {
    if (!isCheckedPasswordCheck.visible) {
      setIsCheckedPasswordCheck({
        visible: true,
        type: 'text',
      });
    } else {
      setIsCheckedPasswordCheck({
        visible: false,
        type: 'password',
      });
    }
  }, [isCheckedPasswordCheck]);

  // Password onChange event 함수
  const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.currentTarget.value);
  };

  // Password 확인 onChange event 함수
  const onChangeCheckPassword = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCheckPassword(e.currentTarget.value);
  };

  /* 완료 버튼 활성화 이벤트 함수 */
  useEffect(() => {
    if (
      email !== null
      && password !== null
      && checkPassword !== null
      && name !== null
      && department !== null
      && studentID !== null
      && phoneNumber !== null
      && isCorrectPW !== false
      && isOverlap
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password, checkPassword, name, department, studentID, phoneNumber, isOverlap]);

  /* 회원가입 완료 버튼 이벤트 함수 */
  const onClickSubmitButton = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params = JSON.stringify({
      email: 'test@test.com',
      password: 'qwerqwer',
      name: 'john',
      phoneNumber: '01012345678',
      studentId: '202020700',
      major: 'software',
    });

    axios.post('/signup', params, {
      headers,
    }).then((res) => {
      // eslint-disable-next-line no-console
      console.log(res);
    })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });

    /* 서버로 요청 */
    // axios.post('https://rtu-rent-server-uwdjr.run.goorm.io/signup', {
    //   email: 'test@test.com',
    //   password: 'qwerqwer',
    //   name: 'john',
    //   phoneNumber: '01012345678',
    //   studentId: '202020700',
    //   major: 'software',
    // }).then((res) => { console.log(res); })
    //   .catch((e: AxiosError) => { console.log(e); });

    setIsCert(true);
  };

  useEffect(() => {
    if (password !== null || checkPassword !== null) {
      if (password === checkPassword) {
        setIsCorrectPW(true);
      } else {
        setIsCorrectPW(false);
      }
    }
  }, [checkPassword, password]);

  useEffect(() => {

  }, [isCorrectPW]);

  // 회원가입 모달 창 닫기 버튼 이벤트
  const onClickCloseModal = useCallback(() => {
    setIsOpenRegisterOpen(!isOpenRegisterOpen);
  }, [isOpenRegisterOpen]);

  // 이메일 중복확인 버튼 이벤트
  const onClickOverlapButton = useCallback(() => {
    /* 백엔드로 중복된 이메일 있는지 요청 */
    setIsOverlap(!isOverlap);
  }, [isOverlap]);

  return (
    <div className={styles.modalContainer}>
      {' '}
      {/* container */}
      <div className={styles.modalTopContainer}>
        {/* 회원가입, X */}
        <span className={styles.modalTitle}>회원가입</span>

        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <img onClick={onClickCloseModal} src="/icons/Close.png" alt="Close Button" className={styles.closeButton} />
      </div>
      <div className={styles.formContainer}>
        {/*  form  */}
        <div className={styles.inputContainer}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>아주대학교 이메일</label>
          <input
            className={styles.emailInput}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
          />
          <span>@ajou.ac.kr</span>
          {isOverlap ? (
            <OverlapCheckedButton onClick={onClickOverlapButton}>중복확인</OverlapCheckedButton>
          ) : (
            <button type="button" onClick={onClickOverlapButton} className={styles.overlapCheckButton}>
              중복확인
            </button>
          )}
        </div>

        <div className={styles.inputContainer}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>Password</label>
          {/* eslint-disable-next-line max-len */}
          <input onChange={onChangePassword} className={styles.commonInputTag} type={isCheckedPassword.type} />
          {isCheckedPassword.visible ? (
            <Image
              width={20}
              height={20}
              onClick={onClickCheckedPassword}
              alt="show password check"
              src="/icons/CheckedCircle.png"
            />
          ) : (
            <Image
              width={20}
              height={20}
              onClick={onClickCheckedPassword}
              alt="show password check"
              src="/icons/CheckCircle.png"
            />
          )}
          <span>표시</span>
        </div>

        <div className={styles.inputContainer}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>Password 확인</label>
          <input
            onChange={onChangeCheckPassword}
            className={styles.commonInputTag}
            type={isCheckedPasswordCheck.type}
          />
          {isCheckedPasswordCheck.visible ? (
            <Image
              width={20}
              height={20}
              onClick={onClickCheckedPasswordCheck}
              alt="show password check"
              src="/icons/CheckedCircle.png"
            />
          ) : (
            <Image
              width={20}
              height={20}
              onClick={onClickCheckedPasswordCheck}
              alt="show password check"
              src="/icons/CheckCircle.png"
            />
          )}
          <span>표시</span>
          {/* eslint-disable-next-line no-nested-ternary */}
          {isCorrectPW === null ? null : isCorrectPW ? (
            <p className={styles.correct}>비밀번호가 일치합니다.</p>
          ) : (
            <p className={styles.notCorrect}>비밀번호가 일치하지 않습니다.</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>이름</label>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            className={styles.commonInputTag}
            type="text"
          />
        </div>

        <div className={styles.inputContainer}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="department">학과</label>
          <input
            id="department"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setDepartment(e.currentTarget.value);
            }}
            className={styles.commonInputTag}
            type="text"
          />
        </div>

        <div className={styles.inputContainer}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="studentID">학번</label>
          <input
            id="studentID"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setStudentID(Number(e.currentTarget.value));
            }}
            className={styles.commonInputTag}
            type="text"
          />
        </div>

        <div className={styles.inputContainer}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>휴대폰 번호</label>
          <input
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setPhoneNumber(Number(e.currentTarget.value));
            }}
            className={styles.commonInputTag}
            placeholder={"' - '을 제외한 숫자로 된 전화번호를 입력해주세요."}
            type="text"
          />
        </div>
      </div>
      <div className={styles.submitButtonContainer}>
        {isActive ? (
          <button type="submit" onClick={onClickSubmitButton} className={styles.submitButtonActive}>
            완료
          </button>
        ) : (
          <button type="submit" className={styles.submitButton}>완료</button>
        )}
      </div>
    </div>
  );
}

export default RegisterModal;
