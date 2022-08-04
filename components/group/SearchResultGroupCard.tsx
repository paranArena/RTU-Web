import Tag from 'components/common/Tag';
import React, { useState } from 'react';
import styles from 'styles/group/SearchResultGroupCard.module.css';
import { JoinButton, RequestButton } from 'components/common/Button';

interface SearchResultGroupCardProps {
  groupName : string; // 그룹이름
  groupPersonnel : number; // 가입된 그룹 인원
  tagList : string[]; // 태그 목록
  Membership : boolean; // 사용자 가입 여부
  groupIntroduce : string; // 그룹 소개
  request : boolean;
}

interface props {
  Membership : boolean;
}

function SearchResultGroupCard({ Membership } :props) {
  const flag = Membership;
  const [requestFlag, setRequestFlag] = useState<boolean>(false);

  return (
    <div className={styles.cardContainer}>
      <img className={styles.groupImage} src="/images/tennis.jpeg" alt="group Image" />

      <div className={styles.textContainer}>
        <div className={styles.textTopContainer}>
          <div>
            <span className={styles.groupNameText}>그룹이름</span>
            <span className={styles.groupPersonnelMembership}>멤버73명</span>
          </div>

          { !flag ? !requestFlag ? <JoinButton requestFlag={requestFlag} setRequestFlag={setRequestFlag} />
            : <RequestButton requestFlag={requestFlag} setRequestFlag={setRequestFlag} />
            : <span className={styles.groupPersonnelMembership}>가입된 그룹</span>}
        </div>
        <div className={styles.tagContainer}>
          <Tag tag="태그" />
          <Tag tag="태그" />
        </div>
        <span className={styles.introduceText}>안녕하세요. 테니스 동아리 ARC입니다. 정기연습은 월, 목입니다.</span>
      </div>
    </div>
  );
}

export default SearchResultGroupCard;
