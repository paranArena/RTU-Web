import Tag from 'components/common/Tag';
import React, { useState } from 'react';
import styles from 'styles/group/SearchResultGroupCard.module.css';
import { JoinButton } from 'components/common/Button';

// interface SearchResultGroupCardProps {
//   groupName : string; // 그룹이름
//   groupPersonnel : number; // 가입된 그룹 인원
//   tagList : string[]; // 태그 목록
//   Membership : boolean; // 사용자 가입 여부
//   groupIntroduce : string; // 그룹 소개
//   request : boolean;
// }

interface IGroupCard {
  name: string;
  hashtags: string[];
  clubRole: string;
  id: number;
  introduction: string;
  thumbnailPath: string
}

function SearchResultGroupCard({
  name, hashtags, clubRole, id, thumbnailPath, introduction,
} : IGroupCard) {
  const flag = false;
  const [requestFlag, setRequestFlag] = useState<boolean>(false);

  return (
    <div className={styles.cardContainer}>
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
      <img className={styles.groupImage} src="https://picsum.photos/200" alt="group Image" />

      <div className={styles.textContainer}>
        <div className={styles.textTopContainer}>
          <div>
            <span className={styles.groupNameText}>{name}</span>
            <span className={styles.groupPersonnelMembership}>멤버73명</span>
          </div>

          {/* eslint-disable-next-line no-nested-ternary,max-len */}
          { !flag ? <JoinButton requestFlag={requestFlag} setRequestFlag={setRequestFlag} />
            : <span className={styles.groupPersonnelMembership}>가입된 그룹</span>}
        </div>
        <div className={styles.tagContainer}>
          {
            hashtags.map(
              (tag) => (<Tag tag={tag} />),
            )
          }
        </div>
        <span className={styles.introduceText}>{introduction}</span>
      </div>
    </div>
  );
}

export default SearchResultGroupCard;
