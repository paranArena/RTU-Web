import React from 'react';
import styles from 'styles/common/AlertModal.module.css';
import { IAlertModal } from '../../globalInterface';

function AlertModal({ titleText, contentText, onClickEvent } : IAlertModal) {
  return (
    <div className={styles.alertModalContainer}>
      <div className={styles.closeIconContainer}>
        <button onClick={onClickEvent} type="button"><img className={styles.closeIcon} src="icons/Close.png" alt="Close Button" /></button>
      </div>
      <div className={styles.alertTextContainer}>

        {/* TODO icon 변경 */}
        <img className={styles.representativeIcon} src="icons/WarningCircle.png" alt="info icons" />
        { titleText !== null ? <span className={styles.titleText}>{titleText}</span> : null}
        {contentText !== null ? <span>{contentText}</span> : null}
      </div>
    </div>
  );
}

export default AlertModal;
