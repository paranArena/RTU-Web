import React, { Dispatch, SetStateAction } from 'react';
import styles from 'styles/common/Button.module.css';

interface buttonProps {
  requestFlag : boolean;
  setRequestFlag : Dispatch<SetStateAction<boolean>>;
}

function JoinButton({ requestFlag, setRequestFlag }:buttonProps) {
  return (
    <button
      onClick={() => { setRequestFlag(!requestFlag); }}
      className={styles.joinButton}
      type="button"
    >
      가입요청
    </button>
  );
}

function RequestButton({ requestFlag, setRequestFlag }:buttonProps) {
  return (
    <button
      onClick={() => { setRequestFlag(!requestFlag); }}
      className={styles.requestButton}
      type="button"
    >
      요청완료
    </button>
  );
}

export { JoinButton, RequestButton };
