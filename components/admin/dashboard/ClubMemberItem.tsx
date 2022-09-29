import React from 'react';
import styles from '../../../styles/admin/dashboard/ClubMemberItem.module.css';
import { IClubMember } from '../../../globalInterface';

interface ClubMemberItemProps {
  member : IClubMember;
}

function ClubMemberItem({ member }:ClubMemberItemProps) {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.profileImgContainer}>
          <img alt="user profile" className={styles.userProfileImg} src="/images/defaultUser.png" />
        </div>
        <div className={styles.userInfoContainer}>
          <span className={styles.TextName}>{member.name}</span>
          <span className={styles.TextMajorNstId}>{member.major}</span>
          <span className={styles.TextMajorNstId}>{member.studentId}</span>
        </div>
      </div>
    </div>
  );
}

export default ClubMemberItem;
