/* eslint-disable react/jsx-props-no-multi-spaces */
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import styles from 'styles/main/RegisterModal.module.css';
import axios from 'axios';
import { rexIDCheck, rexPhoneNumber } from '../../RegExp';

interface ShowProps {
  isOpenRegisterOpen: boolean
  setIsOpenRegisterOpen: Dispatch<SetStateAction<boolean>>
  isCert: boolean
  setIsCert: Dispatch<SetStateAction<boolean>>
}

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

interface SignUpProps {
  email: string | null
  password: string | null
  name: string | null
  major: string | null
  studentId: string | null
  phoneNumber: string | null
}

const defaultSignUpProps: SignUpProps = {
  email: null,
  password: null,
  name: null,
  major: null,
  studentId: null,
  phoneNumber: null,
};

const onInputMaxLengthCheck = (object) => {
  if (object.target.value.length > object.target.maxLength) {
    // eslint-disable-next-line no-param-reassign
    object.target.value = object.target.value.slice(0, object.target.maxLength);
  }
};

interface OverlapProps {
  flag : boolean;
  overlap : string;
}

function RegisterModal({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isCert,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsCert,
  isOpenRegisterOpen,
  setIsOpenRegisterOpen,
}: ShowProps): React.ReactElement<ShowProps> {
  // 회원가입 필드 변수
  const [signupProps, setSignUpProps] = useState<SignUpProps>(defaultSignUpProps);
  const [checkPassword, setCheckPassword] = useState<string | null>(null);

  // event 처리용 변수
  const [isOverlap, setIsOverlap] = useState<OverlapProps>({ flag: false, overlap: '' }); // 이메일 중복확인
  // eslint-disable-next-line max-len
  const [isCorrectPW, setIsCorrectPW] = useState<boolean | null>(null); // password와 password check 비교
  const [isActive, setIsActive] = useState<boolean>(false); // 완료버튼 활성화
  const [isCheckedPassword, setIsCheckedPassword] = useState<{
    visible: boolean
    type: string
  }>({
    visible: false,
    type: 'password',
  });
  // eslint-disable-next-line max-len
  const [isCheckedPasswordCheck, setIsCheckedPasswordCheck] = useState<{
    visible: boolean
    type: string
  }>({
    visible: false,
    type: 'password',
  });

  // TODO 나중에 onChange 함수 아래와 같은 방식으로 변경
  //  //input에 입력될 때마다 account state값 변경되게 하는 함수
  //   const onChangeAccount = (e) => {
  //     setAccount({
  //       ...account,
  //       [e.target.name]: e.target.value,
  //     });
  //   };
  // 출처: https://anerim.tistory.com/180 [디발자 뚝딱:티스토리]

  // Password  표시 event
  const onClickCheckedPassword = () => {
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
  };

  // Password Check 표시 event
  const onClickCheckedPasswordCheck = () => {
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
  };

  useEffect(() => {
    const { email } = signupProps;

    if (isOverlap.flag === true && email.length !== (isOverlap.overlap).length) {
      setIsOverlap({ ...isOverlap, flag: false });
    }
  }, [signupProps]);

  useEffect(() => {
    console.log(isCheckedPasswordCheck);
    console.log(isCheckedPassword);
  }, [isCheckedPasswordCheck, isCheckedPassword]);

  useEffect(() => {
    console.log('useEffect');
    console.log(signupProps.password);
    console.log(checkPassword);
  }, [signupProps, checkPassword]);

  /* 완료 버튼 활성화 이벤트 함수 */
  useEffect(() => {
    if (
      signupProps.email !== ('' || null) && rexIDCheck.test(signupProps.email) && signupProps.password !== ('' || null) && checkPassword !== ('' || null) && signupProps.name !== ('' || null) && signupProps.major !== ('' || null) && ((signupProps.phoneNumber).search(rexPhoneNumber) > -1) && signupProps.studentId !== ('' || null) && isCorrectPW !== false
      && isOverlap.flag) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [signupProps, isActive]);

  useEffect(() => {
    if (signupProps.password !== null || checkPassword !== null) {
      if (signupProps.password === checkPassword) {
        setIsCorrectPW(true);
      } else {
        setIsCorrectPW(false);
      }
    }
  }, [signupProps, isCorrectPW]);

  /* 회원가입 완료 버튼 이벤트 함수 */
  // const onClickSubmitButton = (e: React.FormEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //
  //   axios
  //     .post(
  //       'http://ec2-13-125-234-225.ap-northeast-2.compute.amazonaws.com:8080/signup',
  //       signupProps,
  //     )
  //     .then((res) => {
  //       // eslint-disable-next-line no-console
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       // eslint-disable-next-line no-console
  //       console.log(error);
  //     });
  //   setIsCert(true);
  // };

  // 회원가입 모달 창 닫기 버튼 이벤트
  const onClickCloseModal = useCallback(() => {
    setIsOpenRegisterOpen(!isOpenRegisterOpen);
  }, [isOpenRegisterOpen]);

  // 이메일 중복확인 버튼 이벤트
  const onClickOverlapButton = () => {
    /* 백엔드로 중복된 이메일 있는지 요청 */
    // TODO email 중복 확인
    if (signupProps.email === '' || signupProps.email === null) {
      alert('형식이 올바르지 않음.');
    } else {
      const params = (signupProps.email).concat('@ajou.ac.kr');

      axios
        .get(
          `http://ec2-13-125-234-225.ap-northeast-2.compute.amazonaws.com:8080/members/:${params}/exists`,
        )
        .then((res) => {
          if (res.data) {
            // 중복되는 이메일 존재
            setIsOverlap({ ...isOverlap, flag: false });
          } else {
            // 중복되는 이메일이 존재하지 않음.
            setIsOverlap({ flag: true, overlap: signupProps.email });
          }
        })
        .catch((error) => console.log(error));

      setIsOverlap({ ...isOverlap, flag: !(isOverlap.flag) });
    }
  };

  return (
    <div className={styles.modalContainer}>
      {' '}
      {/* container */}
      <div className={styles.modalTopContainer}>
        {/* 회원가입, X */}
        <span className={styles.modalTitle}>회원가입</span>

        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <img
          onClick={onClickCloseModal}
          src="/icons/Close.png"
          alt="Close Button"
          className={styles.closeButton}
        />
      </div>
      <div className={styles.formContainer}>
        {/*  form  */}
        <div className={styles.inputContainer}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>아주대학교 이메일</label>
          <input
            minLength={5}
            maxLength={30}
            className={styles.emailInput}
            onChange={(e) => {
              if (e.currentTarget.value.search(rexIDCheck) > -1) {
                setSignUpProps({ ...signupProps, email: e.currentTarget.value });
              } else {
                setSignUpProps({ ...signupProps, email: '' });
              }
            }}
            type="text"
          />
          <span>@ajou.ac.kr</span>
          {isOverlap.flag ? (
            <OverlapCheckedButton onClick={onClickOverlapButton}>
              중복확인
            </OverlapCheckedButton>
          ) : (
            <button
              type="button"
              onClick={onClickOverlapButton}
              className={styles.overlapCheckButton}
            >
              중복확인
            </button>
          )}
        </div>

        <div className={styles.inputContainer}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>Password</label>
          {/* eslint-disable-next-line max-len */}
          <input
            minLength={8}
            maxLength={30}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setSignUpProps({
                ...signupProps,
                password: e.currentTarget.value,
              });
            }}

            className={styles.commonInputTag}
            type={isCheckedPassword.type}
          />
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
            minLength={8}
            maxLength={30}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              e.preventDefault();
              setCheckPassword(e.currentTarget.value);
            }}
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
            minLength={2}
            maxLength={10}
            onChange={(e) => {
              setSignUpProps({ ...signupProps, name: e.currentTarget.value });
            }}
            className={styles.commonInputTag}
            type="text"
          />
        </div>

        <div className={styles.inputContainer}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="major">학과</label>
          <input
            id="major"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setSignUpProps({
                ...signupProps,
                major: e.currentTarget.value,
              });
            }}
            className={styles.commonInputTag}
            type="text"
          />
        </div>

        <div className={styles.inputContainer}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="studentId">학번</label>
          <input
            onInput={onInputMaxLengthCheck}
            type="number"
            minLength={6}
            maxLength={15}
            id="studentId"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setSignUpProps({
                ...signupProps,
                studentId: String(e.currentTarget.value),
              });
            }}
            className={styles.commonInputTag}
          />
        </div>

        <div className={styles.inputContainer}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>휴대폰 번호</label>
          <input
            onInput={onInputMaxLengthCheck}
            minLength={11}
            maxLength={11}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setSignUpProps({
                ...signupProps,
                phoneNumber: e.currentTarget.value,
              });
            }}
            className={styles.commonInputTag}
            placeholder={"' - '을 제외한 숫자로 된 전화번호를 입력해주세요."}
            type="text"
          />
        </div>
      </div>
      <div className={styles.submitButtonContainer}>
        {/* // TODO */}
        {/* //  1. 중복확인했는지 체크하는 로직 isOverlap.flag */}
        { isActive ? (
          <button
            type="submit"
            onClick={() => {
              let Email = signupProps.email;
              Email = Email.concat('@ajou.ac.kr');

              axios.post('http://ec2-13-125-234-225.ap-northeast-2.compute.amazonaws.com:8080/signup', {
                email: Email,
                password: signupProps.password,
                name: signupProps.name,
                phoneNumber: signupProps.phoneNumber,
                studentId: signupProps.studentId,
                major: signupProps.major,
              })
                .then((res) => {
                  console.log('res : ', res);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
            className={styles.submitButtonActive}
          >
            완료
          </button>
        ) : (
          <button
            type="submit"
            onClick={() => {
              alert('완료버튼 활서화 안됨.');
            }}
            className={styles.submitButton}
          >
            완료
          </button>
        )}

      </div>
    </div>
  );
}

export default RegisterModal;
