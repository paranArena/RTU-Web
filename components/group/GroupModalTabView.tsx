import React, { useEffect, useState } from 'react';
import styles from 'styles/group/GroupModalTabView.module.css';
import axios from 'axios';
import { SERVER_API } from '../../config';
import { ClubDataModal, RentalItemModal } from '../../globalInterface';

interface INoticeListItem {
  imageUrl : string | null;
  noticeTitle : string | null;
  noticeContent : string;
  noticeWriter : string;
  noticeDateCreated : string;
}

interface IRentalItem {

  imageUrl : string | null;
  rentalItemName : string;
  quantityTotal : number;
  quantityLeft : number;
}

function NoticeListItem({
  imageUrl, noticeTitle, noticeContent, noticeWriter, noticeDateCreated,
}:INoticeListItem) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const today = new Date();
  // TODO 몇일까지가 최근 글인지 정해야할 듯
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [newNotice, setNewNotice] = useState(false);

  return (
    <li className={styles.noticeItemContainer}>
      <div className={styles.noticeImageTitleContainer}>
        {
              imageUrl
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
                ? <img className={styles.noticeImage} src={imageUrl} alt="notice image" />
                : null
          }
        <div className={styles.noticeTitleContentContainer}>
          <h1>{noticeTitle}</h1>
          <h3>{noticeContent}</h3>
        </div>
      </div>

      <div className={styles.noticeWriterDateContainer}>
        <span>
          {noticeWriter}
        </span>
        <span>
          {noticeDateCreated}
        </span>
        <div>
          {newNotice ? <span>new</span> : null }
        </div>
      </div>
    </li>
  );
}

function RentalItem({
  imageUrl, rentalItemName, quantityTotal, quantityLeft,
}: IRentalItem) {
  let quantity = true;
  if (rentalItemName === '' && imageUrl === '' && quantityTotal === 0 && quantityLeft === 0) {
    quantity = false;
  }
  return (
    <li className={styles.rentalItemContainer}>
      {quantity
        ? (
          <>
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img className={styles.rentalItemImage} src={imageUrl} alt="Rental Item Image" />
            <h3>{rentalItemName}</h3>
            <span>
              {quantityLeft}
              /
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
}

function GroupModalHome({ show } : IGroupModalHome) {
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

  return (
    <div className={styles.groupHomeContainer}>
      <div className={styles.titleContainer}>
        {/* Home 제목 */}
        <h1>HOME</h1>
      </div>
      {
        !show ? (
          <>
            <div className={styles.noticeListContainer}>
              {/* 공지사항 */}
              <h1 className={styles.detailTitle}>공지사항</h1>
              <ul>
                <NoticeListItem imageUrl="https://picsum.photos/200" noticeTitle="쓰레기 잘 치워주세요!" noticeContent="쓰레기 잘 치웁시다. 안 치우면 500원" noticeWriter="김현지" noticeDateCreated="2022.07.23" />
                <NoticeListItem imageUrl="https://picsum.photos/200" noticeTitle="공지사항 제목" noticeContent="쓰레기 잘 치웁시다." noticeWriter="김현지" noticeDateCreated="2022.07.23" />
                <NoticeListItem imageUrl={null} noticeTitle="공지사항 제목/사진 없을 " noticeContent="쓰레기 잘 치웁시다." noticeWriter="김현지" noticeDateCreated="2022.07.23" />
              </ul>
            </div>
            <div className={styles.groupRentContainer}>
              {/* 대여물품 */}
              <h1 className={styles.detailTitle}>대여물품</h1>
              <ul>
                <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
                <RentalItem imageUrl="https://picsum.photos/200/" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
                <RentalItem imageUrl="https://picsum.photos/200/" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
                <RentalItem imageUrl="https://picsum.photos/200?gray" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
                <RentalItem imageUrl="https://picsum.photos/200/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
                <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="" quantityTotal={0} quantityLeft={0} />
              </ul>
            </div>
          </>
        )
          : <h1>가입하고 확인하세요</h1>
      }
    </div>
  );
}

interface IGroupModalRent {
  clubData :ClubDataModal
}

function GroupModalRent({ clubData } : IGroupModalRent) {
  const [rentalItem, setRentalItem] = useState<RentalItemModal[] | null>(null);

  const rentItemRendering = () => {
    const result = [];
    // eslint-disable-next-line array-callback-return
    rentalItem.map((item) => {
      result.push(
        <RentalItem
          imageUrl={item.thumbnailPath === null || item.thumbnailPath === '' ? '/images/defaultImg.png' : item.thumbnailPath}
          rentalItemName={item.name}
          quantityTotal={item.maxQuantity}
          quantityLeft={item.quantity}
        />,
      );
    });
    return result;
  };

  useEffect(() => {
    console.log('rentalItem, :', rentalItem);
  }, [rentalItem]);

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
        console.log('rent modal : ', res.data.data);
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
            rentalItem !== null
              ? rentItemRendering()
              : null
          }

        </ul>
      </div>
    </div>
  );
}

export { GroupModalHome, GroupModalRent };
