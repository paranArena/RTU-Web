import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
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
  setShowDetail :Dispatch<SetStateAction<boolean>>;
  setNoticeId : Dispatch<SetStateAction<number>>;
}

function NoticeItem({
  notice,
  setShowDetail,
  setNoticeId,

} : NoticeProps) {
  const date = new Date(Date.parse(notice.createdAt));
  const noticeDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

  return (
  // eslint-disable-next-line max-len
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      onClick={() => {
        setShowDetail(true);
        setNoticeId(notice.id);
      }}
      className={styles.noticeItemContainer}
    >

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

export interface NoticeDetailModalProps {
  clubId: number;
  noticeId : number;
  setShowDetail: Dispatch<SetStateAction<boolean>>;
}

export interface INoticeResponse {
  id : number;
  clubId : number;
  createdAt : string;
  updatedAt : string;
  title : string;
  isPublic : boolean;
  imagePath :string;
  content : string;
}

export const defaultNotice:INoticeResponse = {
  id: 0,
  clubId: 0,
  createdAt: '',
  updatedAt: '',
  title: '',
  isPublic: true,
  imagePath: '',
  content: '',
};

export function NoticeDetailModal({ clubId, noticeId, setShowDetail }:NoticeDetailModalProps) {
  const [notice, setNotice] = useState<INoticeResponse>(defaultNotice);
  const [showPicture, setShowPicture] = useState(false);

  useEffect(() => {
    axios.get(
      `${SERVER_API}/clubs/${clubId}/notifications/${noticeId}`,
      {
        headers:
              {
                Authorization: `Bearer ${localStorage.getItem('token')}`,

              },
      },
    ).then((res) => {
      setNotice(res.data.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className={styles.showDetailNoticeContainer}>
      <div className={styles.showDetailNoticeInnerContainer}>
        <div className={styles.showDetailNoticeTopContainer}>
          <div className={styles.showDetailNoticeTitleContainer}>
            <h1>{notice.title}</h1>
          </div>
          <div className={styles.showDetailNoticeCloseButtonContainer}>
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            <img onClick={() => { setShowDetail(false); }} className={styles.icon} src="/icons/창닫기 버튼.png" alt="close" />
          </div>
        </div>

        {
          showPicture
            ? (
          // eslint-disable-next-line max-len
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
              <div onClick={() => { setShowPicture(false); }} className={styles.PictureBig}>
                <div className={styles.pictureInnerContainer}>
                  {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                  <img src={notice.imagePath} alt="notice picture" />
                </div>
              </div>
            )
            : null
        }

        <div className={styles.showDetailNoticeContainerContainer}>
          <div className={styles.showDetailContentNoImgContainer}>
            <div className={styles.showDetailNoticeContentContainer}>
              {notice.content}
              {
                notice.imagePath !== ''
                  ? (
                // eslint-disable-next-line max-len
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events,max-len,jsx-a11y/no-static-element-interactions
                    <div className={styles.imgMiniContainer} onClick={() => { setShowPicture(true); }}>
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label>Click ME!</label>
                      <img className={styles.imgMini} src={notice.imagePath} alt="add img" />
                    </div>
                  ) : null
              }

            </div>
            {/* <div className={styles.showDetailNoticeContentContainer}> */}
            {/*  /!* 이미지 여러개일대*!/ */}
            {/*  {notice.content} */}
            {/* </div> */}
          </div>

          {/* { */}
          {/*  (notice.imagePath.length === 0) */}
          {/*    ? null */}
          {/*    : ( */}

          {/*  //  이미지 여러개일때 */}
          {/*  // <div className={styles.showDetailImgContainer}> */}
          {/*  //   { */}
          {/*  //     Array.isArray(notice.imagePath) */}
          {/* eslint-disable-next-line max-len */}
          {/*  //       ? notice.imagePath.map((src) => <img className={styles.showDetailNoticeImage} src={src} alt="notice" />) */}
          {/* eslint-disable-next-line max-len */}
          {/*  //       : <img className={styles.showDetailNoticeImage} src={notice.imagePath} alt="notice" /> */}
          {/*  //   } */}
          {/*  // </div> */}
          {/*    ) */}
          {/* } */}

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
  const [showDetail, setShowDetail] = useState(false);
  const [noticeId, setNoticeId] = useState(0);

  const [mount, setMount] = useState(0);

  useEffect(() => {
    if (mount === 1) {
      setMount(1);
    } else {
      axios.get(`${SERVER_API}/clubs/${clubId}/notifications/search/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            if (Array.isArray(res.data.data)) {
              setNotificationList(res.data.data.sort((a, b) => b.id - a.id));
            }
          }
        })
        .catch((err) => {
          console.log('err.response : ', err.response);
        });
    }
  }, [mount]);

  if (showCreateNoticeModal === false) {
    return (
      <div className={styles.noticeContainer}>
        {
          showDetail
          // eslint-disable-next-line max-len
            ? <NoticeDetailModal setShowDetail={setShowDetail} clubId={Number(clubId)} noticeId={noticeId} />
            : null
        }
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
              // eslint-disable-next-line max-len
                      notificationList !== undefined ? notificationList.map((notice) => (
                        // eslint-disable-next-line max-len
                        <NoticeItem notice={notice} setShowDetail={setShowDetail} setNoticeId={setNoticeId} />
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
