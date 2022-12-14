import Tag from 'components/common/Tag';
import React, {
  useEffect, useState,
} from 'react';
import styles from 'styles/group/SearchResultGroupCard.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SERVER_API } from '../../config';

interface IGroupCard {
  name: string;
  hashtags: string[];
  clubRole: string;
  id: number;
  memberNumber:number;
  introduction: string;
  thumbnailPath: string;
  // isClicked : boolean;
  // setIsClicked : Dispatch<SetStateAction<boolean>>;
}

function SearchResultGroupCard({
  name, hashtags, clubRole, id, thumbnailPath, introduction, memberNumber,
  // setIsClicked, isClicked,
} : IGroupCard) {
  const [flag, setFlag] = useState<boolean>(false);
  const [role, setRole] = useState<string>(clubRole);
  const router = useRouter();

  useEffect(() => {
    if (role === 'WAIT') {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [role]);

  const onClickGroupCard = (e : React.MouseEvent<HTMLElement | HTMLButtonElement>) => {
    e.preventDefault();
    if (e.currentTarget.id === 'container') {
      router.push({
        pathname: '/group/main',
        query: { id },
      });
    }
  };

  const onClickJoinEventButton = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (e.currentTarget.id === 'button') {
      axios({
        method: 'post',
        url: `${SERVER_API}/clubs/${id}/requests/join`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then((res) => {
          if (res.status === 200) {
            setRole('WAIT');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    e.stopPropagation();
  };

  const onClickCancelEventButton = (e : React.MouseEvent<HTMLButtonElement>) => {
    // console.log('cancel');
    // console.log('id', ' : ', id);
    // console.log(' user Club Role : ', clubRole);

    e.preventDefault();
    if (e.currentTarget.id === 'button') {
      axios({
        method: 'delete',
        url: `${SERVER_API}/clubs/${id}/requests/join/cancel`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then((res) => {
          // console.log('cancel : ', res);
          if (res.status === 200) {
            setRole('NONE');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    e.stopPropagation();
  };

  useEffect(() => {
    // console.log(`id : ${id}, clubRole : ${clubRole}, role state : ${role}`);

  }, [flag, role]);

  return (
  // eslint-disable-next-line max-len
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div id="container" className={styles.cardContainer} onClick={onClickGroupCard}>
      {/* eslint-disable-next-line max-len */}
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
      <img className={styles.groupImage} src={thumbnailPath} alt="group Image" />

      {/* eslint-disable-next-line max-len */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className={styles.textContainer}>
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className={styles.textTopContainer}>
          <div>
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <span className={styles.groupNameText}>{name}</span>
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,max-len */}
            <span className={styles.groupPersonnelMembership}>
              ??????
              {memberNumber}
              ???
            </span>
          </div>

          {/* eslint-disable-next-line no-nested-ternary,max-len */}
          {/* // requestFlag === flase => ?????? ???????????? ????????? ??? */}
          {/* Club Role
          ClubRole ??????
          "OWNER": ?????? ????????? (?????? ??????)
          "ADMIN": ?????? ?????????
          "USER": ????????????

          "WAIT": ?????? ?????????
          "NONE":  ?????? ????????? ?????? ??????
          */}

          { (clubRole !== 'OWNER' && clubRole !== 'ADMIN' && clubRole !== 'USER')
            ? <button id="button" name="button" type="submit" onClick={flag ? onClickCancelEventButton : onClickJoinEventButton} className={flag ? styles.requestButton : styles.joinButton}>{flag ? '????????????' : '????????????'}</button>
            : <span className={styles.groupPersonnelMembership}>????????? ??????</span>}

        </div>
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className={styles.tagContainer}>
          {
            Array.isArray(hashtags)
              ? hashtags.map(
                (tag) => (<Tag tag={tag} />),
              )
              : null
          }
        </div>
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <span className={styles.introduceText}>{introduction}</span>
      </div>
    </div>
  );
}

export default SearchResultGroupCard;
