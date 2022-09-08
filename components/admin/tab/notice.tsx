import React, { useEffect, useState } from 'react';
import styles from 'styles/admin/notice.module.css';
import axios from 'axios';
import CreateNoticeModal from './CreateNoticeModal';
import { SERVER_API } from '../../../config';

interface INotice {
  id : number;
  clubId : number;
  title : string;
  createdAt :string;
  imagePath : string;
  isPublic : boolean;
  updateAt : string;
}

interface NoticeProps {
  notice : INotice;
}

function NoticeItem({
  notice,
} : NoticeProps) {
  const date = new Date(Date.parse(notice.createdAt));
  const noticeDate = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;

  return (
    <div className={styles.noticeItemContainer}>
      <div className={styles.noticeItem1Section}>
        <div className={styles.noticeIdContainer}>
          {/* numbering */}
          <span>{notice.id}</span>
        </div>
        <div className={styles.noticeItemTitleContainer}>
          {/*  title  */}
          <h3>{notice.title}</h3>
          {/*    new icon */}
          <img className={styles.newIcon} src="icons/new 아이콘.png" alt="new" />
        </div>
      </div>

      <div className={styles.noticeItem2Section}>
        <div>
          {/*    name */}
          <span>관리자</span>
        </div>
        <div>
          {/*    date */}
          <span>{noticeDate}</span>
        </div>
        <div className={styles.viewsContainer}>
          {/* 조회수? */}
          1
        </div>
      </div>

    </div>
  );
}

function Notice() {
  // 공지사항 글쓰기 모달을 위한 스테이트
  const [showCreateNoticeModal, setShowCreateNoticeModal] = useState<boolean>(false);
  const queryString = window.location.search;
  const clubId = queryString.slice(queryString.search('=') + 1);
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    axios.get(`${SERVER_API}/clubs/${clubId}/notifications/search/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setNotificationList(res.data.data);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log('err.response : ', err.response);
        console.log('err.response.data : ', err.response.data);
      });

    notificationList.map((notice) => console.log(notice));
  }, []);

  if (showCreateNoticeModal === false) {
    return (
      <div className={styles.noticeContainer}>
        <div className={styles.noticeModalInnerContainer}>
          <div className={styles.noticeTitleContainer}>
            {/* 공지사항 */}
            <h1 className={styles.noticeTitle}>공지사항</h1>
          </div>

          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,max-len,jsx-a11y/no-static-element-interactions */}
          <div className={styles.addNoticeButtonContainer} onClick={() => { setShowCreateNoticeModal(true); }}>
            {/* 글쓰기 버튼 */}
            {/* 아이콘 */}
            <img className={styles.icon} src="/icons/추가하기.png" alt="add notice button icon" />
            <span>글쓰기</span>
          </div>

          <div className={styles.noticeListContainer}>
            {/* 공지사항 리스트 보여주기 */}
            {
                      notificationList !== undefined ? notificationList.map((notice) => (
                        <NoticeItem notice={notice} />
                      ))
                        : null
                  }
          </div>

          <div className={styles.noticePageNationContainer}>
            {/* 페이지 네이션 구현하기 */}
          </div>
        </div>
      </div>
    );
  }

  return <div className={styles.createNoticeModalContainer}><CreateNoticeModal /></div>;
}

export default Notice;
