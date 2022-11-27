import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import styles from 'styles/group/GroupModalTabView.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SERVER_API } from '../../config';
import { IClubNotice, IRentalProduct, RentalItemModal } from '../../globalInterface';
// eslint-disable-next-line import/no-cycle
import { ClubData } from './GroupModal';

interface INoticeListItem {
  thumbnailPath : string | null;
  noticeTitle : string | null;
  noticeContent : string;
  noticeWriter : string;
  noticeDateCreated : string;
  // eslint-disable-next-line react/require-default-props
  setNoticeDetail? : Dispatch<SetStateAction<boolean>>;
  // eslint-disable-next-line react/require-default-props
  setDetailNotice? : Dispatch<SetStateAction<{
    title:string;
    content:string;
    writeDate:string;
    imagePath : string;
  }>>;
  id : number;
  clubId:number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IRentalItem {
  thumbnailPath : string | null;
  rentalItemName : string;
  quantityTotal : number;
  quantityLeft : number;
}

function NoticeListItem({
  // eslint-disable-next-line max-len
  thumbnailPath, noticeTitle, noticeContent, noticeWriter, noticeDateCreated, setNoticeDetail, setDetailNotice, id, clubId,
}:INoticeListItem) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const today = new Date();
  // TODO 몇일까지가 최근 글인지 정해야할 듯
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [newNotice, setNewNotice] = useState(false);
  const date = new Date(Date.parse(noticeDateCreated));
  const noticeDate = `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;

  const onClickEventNoticeListItem = (e) => {
    e.preventDefault();

    if (setNoticeDetail !== undefined && setDetailNotice !== undefined) {
      setNoticeDetail(true);

      axios.get(
        `${SERVER_API}/clubs/${clubId}/notifications/${id}`,
        {
          headers:
                {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
        },
      ).then((res) => {
        setDetailNotice({
          title: res.data.data.title,
          content: res.data.data.content,
          writeDate: noticeDate,
          imagePath: res.data.data.imagePath,
        });
      })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
  // eslint-disable-next-line max-len
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <li
      className={styles.noticeItemContainer}
      onClick={onClickEventNoticeListItem}
    >
      <div className={styles.noticeImageTitleContainer}>
        {
          thumbnailPath !== ''
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
            ? <img className={styles.noticeImage} src={thumbnailPath} alt="notice image" />
            : null
          }
        <div className={styles.noticeTitleContentContainer}>
          <h1 id="noticeTitle">{noticeTitle}</h1>
          <h3 id="noticeContent">{noticeContent}</h3>
        </div>
      </div>

      <div className={styles.noticeWriterDateContainer}>
        <span id="noticeWriter">
          {noticeWriter}
        </span>
        <span id="noticeDate">
          {
            noticeDate
          }
        </span>
        {/* <div> */}
        {/*  /!* TODO:: 최신 기준 정해야함.  TODO:: 다음에 최신기준 정하고, N 아이콘 추가 *!/ */}
        {/*  /!*{newNotice ? null : <img src="/icons/new 아이콘.png" alt="new" /> }*!/ */}
        {/* </div> */}
      </div>
    </li>
  );
}

interface RentalItemProps {
  clubId : number;
  // eslint-disable-next-line react/require-default-props
  setCurrentTab?: Dispatch<SetStateAction<string>>;
  id : number;
  thumbnailPath : string | null;
  rentalItemName : string;
  quantityTotal : number;
  quantityLeft : number;
}

function RentalItem({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clubId, id,
  setCurrentTab,
  thumbnailPath, rentalItemName, quantityTotal, quantityLeft,
}: RentalItemProps) {
  let quantity = true;
  if (rentalItemName === '' && thumbnailPath === '' && quantityTotal === 0 && quantityLeft === 0) {
    quantity = false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  const onClickItem = () => {
    if (rentalItemName === '더보기') {
      setCurrentTab('대여');
    }
    // else {
    //   router.push(`/rent/products?clubId=${clubId}&productId=${id}`);
    // }
  };

  return (
  // eslint-disable-next-line max-len
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <li onClick={onClickItem} className={styles.rentalItemContainer}>
      {quantity
        ? (
          <>
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img className={styles.rentalItemImage} src={thumbnailPath === null ? '/images/defaultImg.png' : thumbnailPath} alt="Rental Item Image" />
            <h3>{rentalItemName}</h3>
            <span>
              {quantityLeft}
              {
                quantityLeft === null && quantityTotal === null
                  ? null
                  : '/'
              }
              {quantityTotal}
            </span>
          </>
        )
        : (
          <>
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img className={styles.rentalItemImage} src="https://picsum.photos/200/200" alt="Rental Item Image" />
            <h3>더보기</h3>
          </>
        )}
    </li>
  );
}

interface IGroupModalHome {
  show : boolean
  clubId : number;
  setCurrentTab: Dispatch<SetStateAction<string>>;
}

// 그룹 모달 홈 탭
function GroupModalHome({ show, clubId, setCurrentTab } : IGroupModalHome) {
  // const queryString = window.location.search;
  // const clubId = queryString.slice(queryString.search('=') + 1);

  // useEffect(() => {
  //   axios.get(`${SERVER_API}/clubs/${clubId}/notifications`)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // club notification all
  // GET searchNotificationsAll

  const [noticeDetail, setNoticeDetail] = useState(false);
  const [detailNotice, setDetailNotice] = useState({
    title: '',
    writeDate: '',
    content: '',
    imagePath: '',
  });

  const [clubNotice, setClubNotice] = useState<IClubNotice[]>([]);
  const [rentalProduct, setRentalProduct] = useState<IRentalProduct[]>([]);
  const [detailNoticeImg, setDetailNoticeImg] = useState(false);

  useEffect(() => {

  }, [noticeDetail, detailNotice]);

  useEffect(() => {
    // eslint-disable-next-line react/destructuring-assignment
    // GET searchNotificationsAll
    axios.get(`${SERVER_API}/clubs/${clubId}/notifications/search/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          const sortNotice = res.data.data.sort((a, b) => {
            // eslint-disable-next-line no-param-reassign
            a = new Date(a.updatedAt);
            // eslint-disable-next-line no-param-reassign
            b = new Date(b.updatedAt);

            // eslint-disable-next-line no-nested-ternary
            return a > b ? -1 : a < b ? 1 : 0;
          });
          setClubNotice(sortNotice.slice(0, 3));
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // GET CLlub Rental Item
    axios.get(`${SERVER_API}/clubs/${clubId}/products/search/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        const arr = [];
        if (res.data.data.length >= 4) {
          for (let i = 0; i < 4; i += 1) {
            arr.push(res.data.data[i]);
          }
          setRentalProduct(arr);
        } else {
          setRentalProduct(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.groupHomeContainer}>
      {
        noticeDetail ? (
          <div className={styles.noticeDetailContainer}>
            {
              detailNoticeImg
                ? (
              // eslint-disable-next-line max-len
              // eslint-disable-next-line max-len,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                  <div className={styles.detailNoticeImgContainer} onClick={() => { setDetailNoticeImg(false); }}>
                    <img className={styles.detailNoticeImg} src={detailNotice.imagePath} alt="notice img" />
                  </div>
                )
                : null
            }

            <div className={styles.noticeDetailInnerContainer}>
              <div className={styles.noticeDetailTitleContainer}>
                <span>{detailNotice.title}</span>
                {/* eslint-disable-next-line max-len */}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                <img onClick={() => { setNoticeDetail(false); }} className={styles.closeButton} src="/icons/창닫기 버튼.png" alt="close" />
              </div>

              <div className={styles.noticeDetailInfoContainer}>
                <div className={styles.writerContainer}>
                  <span className={styles.graySmallText}>작성자</span>
                  <span className={styles.blackSmallText}>관리자</span>
                </div>
                <div className={styles.writeDateContainer}>
                  <span className={styles.graySmallText}>작성일</span>
                  <span className={styles.blackSmallText}>{detailNotice.writeDate}</span>
                </div>
              </div>

              <div className={styles.noticeDetailOuterContainer}>
                <div className={styles.noticeDetailInnerContainer}>
                  <span className={styles.noticeDetailContent}>{detailNotice.content}</span>
                  {
                    detailNotice.imagePath
                      ? (
                        <div className={styles.noticeImgContainer}>
                          {/* eslint-disable-next-line max-len */}
                          {/* eslint-disable-next-line jsx-a11y/img-redundant-alt,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                          <img onClick={() => { setDetailNoticeImg(true); }} className={styles.noticeImg} src={detailNotice.imagePath} alt="image" />
                        </div>
                      )
                      : null
                  }
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.titleContainer}>
            {/* Home 제목 */}
            <h1>HOME</h1>
          </div>
        )
      }

      {
        // eslint-disable-next-line no-nested-ternary
        (!show && !noticeDetail) ? (
          <>
            <div className={styles.noticeListContainer}>
              {/* 공지사항 */}
              <h1 className={styles.detailTitle}>공지사항</h1>
              <ul>
                {
        clubNotice.map((notice) => (
          <NoticeListItem
            clubId={clubId}
            id={notice.id}
            setDetailNotice={setDetailNotice}
            setNoticeDetail={setNoticeDetail}
            thumbnailPath={notice.imagePath}
        // thumbnailPath={notice.imagePath}
            noticeTitle={notice.title}
            noticeContent=""
            noticeWriter="관리자"
            noticeDateCreated={notice.updatedAt}
          />
        ))

      }
              </ul>
            </div>
            <div className={styles.groupRentContainer}>
              {/* 대여물품 */}
              <h1 className={styles.detailTitle}>대여물품</h1>
              <ul className={styles.rentalItemScrollContainer}>
                {
        rentalProduct.map((product) => (
          <RentalItem
            setCurrentTab={setCurrentTab}
            clubId={product.clubId}
            id={product.id}
            thumbnailPath={product.imagePath}
            rentalItemName={product.name}
            quantityTotal={product.max}
            quantityLeft={product.left}
          />
        ))
      }
                {
                  rentalProduct.length !== 0
                    ? (
                      <RentalItem
                        setCurrentTab={setCurrentTab}
                        clubId={rentalProduct[0].clubId}
                        id={rentalProduct[0].id}
                        thumbnailPath="/images/물품더보기.png"
                        rentalItemName="더보기"
                        quantityTotal={null}
                        quantityLeft={null}
                      />
                    )
                    : null
                }

              </ul>
            </div>
          </>
        )
          : show ? <h1>가입하고 확인하세요</h1> : null
      }
    </div>
  );
}

interface IGroupModalRent {
  clubData :ClubData;
  show : boolean;
}

// 그룹 모달 렌탈 탭
function GroupModalRent({ clubData, show } : IGroupModalRent) {
  const [rentalItem, setRentalItem] = useState<RentalItemModal[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rentItemRendering = () => {
    const result = [];
    // eslint-disable-next-line array-callback-return
    if (rentalItem !== undefined) {
      rentalItem.map((item) => (
        <RentalItem
          clubId={item.clubId}
          id={item.id}
          thumbnailPath={item.imagePath}
          rentalItemName={item.name}
          quantityTotal={item.max}
          quantityLeft={item.left}
        />
      ));
    }
    return result;
  };

  // searchClubProductsAll
  useEffect(() => {
    // eslint-disable-next-line react/destructuring-assignment
    axios.get(`${SERVER_API}/clubs/${clubData.id}/products/search/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.status === 200 && res.data.data !== []) {
          setRentalItem(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.groupRentContainer}>
      <div className={styles.titleContainer}>
        {/* Home 제목 */}
        <h1>대여</h1>
      </div>

      { !show
        ? (
          <div className={styles.rentalItemListOuterContainer}>
            <div className={styles.rentalItemListTitleContainer}>
              <h3>물품 목록</h3>
              {rentalItem !== null
                ? (
                  <h3>
                    총
                    {' '}
                    {rentalItem.length}
                    {' '}
                    개
                  </h3>
                )
                : null}
            </div>

            <ul className={styles.rentalItemInnerContainer}>
              {
                (rentalItem !== null)
                  ? rentalItem.map((item) => (
                    <RentalItem
                      clubId={item.clubId}
                      id={item.id}
                      thumbnailPath={item.imagePath}
                      rentalItemName={item.name}
                      quantityTotal={item.max}
                      quantityLeft={item.left}
                    />
                  ))
                  : null
              }
            </ul>
          </div>
        )
        : <h1>가입하고 확인하세요</h1>}

    </div>
  );
}

interface GroupModalNoticeProps {
  clubId : number;
  show : boolean;
}

function GroupModalNotice({ clubId, show }:GroupModalNoticeProps) {
  const [noticeList, setNoticeList] = useState<IClubNotice[]>([]);
  const [noticeDetail, setNoticeDetail] = useState(false);
  const [detailNotice, setDetailNotice] = useState({
    title: '',
    writeDate: '',
    content: '',
  });

  useEffect(() => {
    axios.get(`${SERVER_API}/clubs/${clubId}/notifications/search/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        setNoticeList(res.data.data);
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.GroupModalRentalTabContainer}>
      {
        noticeDetail ? null
          : (
            <div className={styles.GroupModalRentalTabTitleContainer}>
              {/* 공지 제목 */}
              <h1>공지</h1>
            </div>
          )
      }

      {
        !show
          ? (
            <div className={styles.GroupModalRentalTabNoticeListContainer}>
              {/* 공지 리스트 */}

              {
                noticeDetail ? (
                  <div className={styles.noticeDetailContainer}>
                    <div className={styles.noticeDetailInnerContainer}>
                      <div className={styles.noticeDetailTitleContainer}>
                        <span>{detailNotice.title}</span>
                        {/* eslint-disable-next-line max-len */}
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                        <img onClick={() => { setNoticeDetail(false); }} className={styles.closeButton} src="/icons/창닫기 버튼.png" alt="close" />

                      </div>

                      <div className={styles.noticeDetailInfoContainer}>
                        <div className={styles.writerContainer}>
                          <span className={styles.graySmallText}>작성자</span>
                          <span className={styles.blackSmallText}>관리자</span>
                        </div>
                        <div className={styles.writeDateContainer}>
                          <span className={styles.graySmallText}>작성일</span>
                          <span className={styles.blackSmallText}>{detailNotice.writeDate}</span>
                        </div>
                      </div>

                      <div className={styles.noticeDetailOuterContainer}>
                        <div className={styles.noticeDetailInnerContainer}>
                          <span className={styles.noticeDetailContent}>{detailNotice.content}</span>

                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ul>
                    {
                    noticeList.map((notice) => (
                      <NoticeListItem
                        thumbnailPath={notice.imagePath}
                            // thumbnailPath={notice.imagePath}
                        noticeTitle={notice.title}
                        noticeContent=""
                        noticeWriter="관리자"
                        id={notice.id}
                        clubId={clubId}
                        setNoticeDetail={setNoticeDetail}
                        noticeDateCreated={notice.updatedAt}
                        setDetailNotice={setDetailNotice}
                      />
                    ))
                  }
                  </ul>
                )
              }

            </div>
          )
          : <h1>가입하고 확인하세요</h1>
      }

    </div>
  );
}

export { GroupModalHome, GroupModalRent, GroupModalNotice };
