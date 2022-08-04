import React, { Dispatch, SetStateAction } from 'react';
import styles from 'styles/main/RegisterModal.module.css';

interface RegisterSuccessModalProps {
  registerSuccess: boolean;
  setRegisterSuccess: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars,max-len
function RegisterSuccessModal({ registerSuccess, setRegisterSuccess }: RegisterSuccessModalProps): React.ReactElement {
  const onClickButton = () => {
    setRegisterSuccess(false);
  };

  return (
    <div className={styles.successModalContainer}>
      <div className={styles.modalTopContainer}>
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <img onClick={onClickButton} src="/icons/Close.png" alt="Close Button" className={styles.closeButton} />
      </div>

      <span className={styles.bigFont}>회원가입이 완료되었습니다!</span>
      <span className={styles.middleFont}>로그인 후 Ren2U의 다양한 가치를 누려보세요!</span>
      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={onClickButton} className={styles.successModalButton}>
        로그인
      </button>
    </div>
  );
}

export default RegisterSuccessModal;
