import React from 'react';
import styles from '../../../styles/admin/dashboard/NotificationItem.module.css';
import { IClubNotice } from '../../../globalInterface';

interface NotificationItemProps {
  notification : IClubNotice;
}

function NotificationItem({ notification }:NotificationItemProps) {
  const date = new Date(notification.updatedAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        {
              notification.imagePath === '' || notification.imagePath === null
                ? null
                : (
                  <div className={styles.noticeImgContainer}>
                    <img src={notification.imagePath} alt="notice img" className={styles.noticeImg} />
                  </div>
                )
          }
        <div className={styles.noticeTitleNdateContainer}>
          <span className={styles.TextTitle}>{notification.title}</span>
          <span className={styles.TextDate}>
            {year}
            -
            {month}
            -
            {day}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NotificationItem;
