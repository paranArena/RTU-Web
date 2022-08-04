import React, { Dispatch, SetStateAction, useCallback } from 'react';
import styles from 'styles/main/RegisterModal.module.css';

interface RegisterSuccessModalProps {
  registerSuccess: boolean;
  setRegisterSuccess: Dispatch<SetStateAction<boolean>>;
}

function RegisterSuccessModal({ registerSuccess, setRegisterSuccess }: RegisterSuccessModalProps): React.ReactElement {
  const onClickButton = () => {
    setRegisterSuccess(false);
  };

  return (
    <div className={styles.successModalContainer}>
      <div className={styles.modalTopContainer}>
        <img onClick={onClickButton} src="/icons/Close.png" alt="Close Button" className={styles.closeButton} />
      </div>

      <span className={styles.bigFont}>회원가입이 완료되었습니다!</span>
      <span className={styles.middleFont}>로그인 후 Ren2U의 다양한 가치를 누려보세요!</span>
      <button onClick={onClickButton} className={styles.successModalButton}>
        로그인
      </button>
    </div>
  );
}

export default RegisterSuccessModal;
