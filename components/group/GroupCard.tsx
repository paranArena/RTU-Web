import Tag from 'components/common/Tag';
import React from 'react';
import styles from 'styles/group/GroupCard.module.css';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SERVER_API } from '../../config';

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
    <div className={styles.groupContainer} onClick={onClickGroupCard}>
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
      <img className={styles.groupRepresentativeImage} src={url} alt="Group representative Image" />
      {/* 즐겨찾기 버튼 넣을 곳 */}
      {/* { like ? null : null } */}
      <span className={styles.groupNameText}>{groupName}</span>
      {
          tagList.map((tag) => (<Tag tag={tag} />))
        }
    </div>

  );
}

export default GroupCard;
