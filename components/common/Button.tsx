import React, { Dispatch, SetStateAction } from 'react';
import styles from 'styles/common/Button.module.css';

// interface ButtonProps {
//   requestFlag : boolean;
//   onCickEvent : any;
//   id : number;
// }
//
// interface RegisterButtonProps {
//   buttonCSS : boolean;
// }

interface CommonButtonProps {
  text : string;
  onClickEvent : React.MouseEventHandler<HTMLButtonElement>;
}
//
// function JoinButton({ requestFlag, onCickEvent, id }:ButtonProps) {
//   return (
//     <button
//       id={id}
//       onClick={onCickEvent}
//       className={requestFlag ? styles.requestButton : styles.joinButton}
//       type="submit"
//     >
//       { requestFlag ? '요청완료' : '가입요청'}
//     </button>
//   );
// }

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

function CommonButton({ text, onClickEvent }:CommonButtonProps) {
  return (
    <button className={styles.commonButton} type="submit" onClick={onClickEvent}>{text}</button>
  );
}

export { CommonButton };
