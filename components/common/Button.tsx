import React, { Dispatch, SetStateAction } from 'react';
import styles from 'styles/common/Button.module.css';

interface ButtonProps {
  requestFlag : boolean;
  setRequestFlag : Dispatch<SetStateAction<boolean>>;
}

interface RegisterButtonProps {
  buttonCSS : boolean;
}

interface CommonButtonProps {
  text : string;
  onClickEvent : React.MouseEventHandler<HTMLButtonElement>;
}

function JoinButton({ requestFlag, setRequestFlag }:ButtonProps) {
  return (
    <button
      onClick={() => { setRequestFlag(!requestFlag); }}
      className={requestFlag ? styles.requestButton : styles.joinButton}
      type="submit"
    >
      { requestFlag ? '요청완료' : '가입요청'}
    </button>
  );
}

// function RequestButton({ requestFlag, setRequestFlag }:ButtonProps) {
//   return (
//     <button
//       onClick={() => { setRequestFlag(!requestFlag); }}
//       className={styles.requestButton}
//       type="submit"
//     >
//       요청완료
//     </button>
//   );
// }

function RegisteredButton({ buttonCSS } :RegisterButtonProps) {
  console.log('RegisteredButton : ', buttonCSS);
  if (buttonCSS !== false) {
    return (
      <button
        className={styles.active}
        onClick={() => { console.log('submit'); }}
        type="submit"
      >
        등록하기
      </button>
    );
  }
  return (
    <button
      className={styles.unActive}
      onClick={() => { console.log('submit'); }}
      type="submit"
    >
      등록하기
    </button>
  );
}

function CommonButton({ text, onClickEvent }:CommonButtonProps) {
  return (
    <button className={styles.commonButton} type="submit" onClick={onClickEvent}>{text}</button>
  );
}

export { JoinButton, RegisteredButton, CommonButton };
