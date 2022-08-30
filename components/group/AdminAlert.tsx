import React from 'react';
import styles from 'styles/group/components/AdminAlert.module.css';

function AdminAlert() {
  return (
    <div className={styles.adminContainer}>
      <img className={styles.closeButton} src="/icons/Close.png" alt="close Button" />
      <img className={styles.warningIcon} src="/icons/CheckedCircle.png" alt="warning icon" />
      <h1 className={styles.alertMessage}>관리자 권한필요합니다!</h1>
    </div>
  );
}

export default AdminAlert;
