import Tag from 'components/common/Tag';
import React from 'react';
import styles from 'styles/group/GroupCard.module.css';
import { useRouter } from 'next/router';

interface GroupCardProps {
  url : string | null;
  groupName : string;
  id:number;
  tagList : Array<string> | null;
  // like : boolean;
}

function GroupCard({
  url, groupName, tagList, id,
  // like,
} : GroupCardProps) {
  const router = useRouter();

  const onClickGroupCard = (e : React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    router.push({
      pathname: '/group/main',
      query: { id },
    });
  };

  return (
  // eslint-disable-next-line max-len
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className={styles.groupContainer} onClick={onClickGroupCard}>
      <div className={styles.groupImageContainer}>
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img className={styles.groupRepresentativeImage} src={url} alt="Group representative Image" />
      </div>
      {/* 즐겨찾기 버튼 넣을 곳 */}
      {/* { like ? null : null } */}
      <span className={styles.groupNameText}>{groupName}</span>
      <div className={styles.groupTagContainer}>
        {
          tagList.map((tag) => (<Tag tag={tag} />))
        }
      </div>

    </div>

  );
}

export default GroupCard;
