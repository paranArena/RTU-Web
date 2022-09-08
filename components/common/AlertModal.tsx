import React from 'react';
import styles from 'styles/common/AlertModal.module.css';
import { IAlertModal } from '../../globalInterface';

function AlertModal({
  type, titleText, contentText, onClickEvent, top, button, onClickButtonEvent,
} : IAlertModal) {
  return (
    <div className={top === 10 ? styles.alertModalContainer : styles.alertModalContainer_30}>
      <div className={styles.closeIconContainer}>
        <button onClick={onClickEvent} type="button"><img className={styles.closeIcon} src="/icons/Close.png" alt="Close Button" /></button>
      </div>
      <div className={styles.alertTextContainer}>

        {/* TODO icon 변경 */}
        {/* eslint-disable-next-line no-nested-ternary */}
        <img className={styles.representativeIcon} src={type === 'alert' ? '/icons/WarningCircle.png' : (type === 'info' ? '/icons/infoCircleIcon.png' : null)} alt="info icons" />
        { titleText !== null ? <span className={styles.titleText}>{titleText}</span> : null}
        {contentText !== null ? <span>{contentText}</span> : null}
      </div>

      {
            button
              ? (
                <div className={styles.buttonContainer}>
                  <button type="submit" onClick={onClickButtonEvent !== undefined ? onClickButtonEvent : () => { alert('버튼'); }} className={styles.button}>예</button>
                </div>
              )
              : null
        }
    </div>
  );
}

export default AlertModal;
