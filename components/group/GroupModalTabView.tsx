import React, { useState } from 'react';
import styles from 'styles/group/GroupModalTabView.module.css';
import Rent from '../../pages/rent';

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
  const today = new Date();
  // TODO 몇일까지가 최근 글인지 정해야할 듯
  const [newNotice, setNewNotice] = useState(false);

  return (
    <li className={styles.noticeItemContainer}>
      <div className={styles.noticeImageTitleContainer}>
        {
              imageUrl ? <img className={styles.noticeImage} src={imageUrl} alt="notice image" />
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
            <img className={styles.rentalItemImage} src="https://picsum.photos/200/200" alt="Rental Item Image" />
            <h3>더보기</h3>
          </>
        )}
    </li>
  );
}

function GroupModalHome() {
  return (
    <div className={styles.groupHomeContainer}>
      <div className={styles.titleContainer}>
        {/* Home 제목 */}
        <h1>HOME</h1>
      </div>
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
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200/" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200?gray" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200?blur" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="" rentalItemName="" quantityTotal={0} quantityLeft={0} />
        </ul>
      </div>
    </div>
  );
}

function GroupModalRent() {
  return (
    <div className={styles.groupRentContainer}>
      <div className={styles.titleContainer}>
        {/* Home 제목 */}
        <h1>대여</h1>
      </div>

      <div className={styles.rentalItemListOuterContainer}>
        <div className={styles.rentalItemListTitleContainer}>
          <h3>물품 목록</h3>
          <h3>총 36개</h3>
        </div>

        <ul className={styles.rentalItemInnerContainer}>
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />
          <RentalItem imageUrl="https://picsum.photos/200" rentalItemName="대여물품" quantityTotal={3} quantityLeft={1} />

        </ul>
      </div>
    </div>
  );
}

export { GroupModalHome, GroupModalRent };
