import Tag from 'components/common/Tag';
import React from 'react';
import styles from 'styles/group/GroupCard.module.css';
import Link from 'next/link';

interface GroupCardProps {
  url : string | null;
  groupName : string;
  tagList : Array<string> | null;
  like : boolean;
}

function GroupCard({
  url, groupName, tagList, like,
} : GroupCardProps) {
  return (
    <Link href={`/group:${groupName}`}>
      <div className={styles.groupContainer}>
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img className={styles.groupRepresentativeImage} src={url} alt="Group representative Image" />
        {/* 즐겨찾기 버튼 넣을 곳 */}
        { like ? null : null }
        <span className={styles.groupNameText}>{groupName}</span>
        {
            tagList.map((tag) => (<Tag tag={tag} />))
          }
      </div>
    </Link>
  );
}

export default GroupCard;
