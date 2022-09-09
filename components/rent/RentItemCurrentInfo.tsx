import React from 'react';
import styles from 'styles/rent/RentItemCurrentInfo.module.css';
import { RentItem } from '../../pages/rent/products';

interface RentItemCurrentInfoProps {
  rentItem :RentItem;
  itemName : string;
}

function RentItemCurrentInfo({ rentItem, itemName } :RentItemCurrentInfoProps) {
  return (
    <div className={styles.ItemInfoContainer}>
      <div className={styles.itemNameNPolicyContainer}>
        {
                // eslint-disable-next-line react/destructuring-assignment
                rentItem.rentalPolicy === 'FIFO'
                // eslint-disable-next-line react/destructuring-assignment
                  ? <span className={styles.tagFC}>선착순</span>
                // eslint-disable-next-line react/destructuring-assignment
                  : <span className={styles.tagTerm}>기간제</span>
            }

        {/* eslint-disable-next-line react/destructuring-assignment */}
        <span className={styles.rentItemName}>
          {itemName}
          {' '}
          -
          {' '}
          {rentItem.numbering}
        </span>
      </div>

      <div className={styles.rentDateContainer}>
        <span className={styles.rentDate}>
          {/* eslint-disable-next-line react/destructuring-assignment */}
          {(rentItem.rentalInfo !== null && rentItem.rentalInfo.rentalStatus === 'RENT')
            ? '대여중' : null}
        </span>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        <span
          className={styles.rentDate}
        >
          {
              rentItem.rentalInfo === null
                ? '대여가능'
                : `~ ${`${new Date((Date.parse(rentItem.rentalInfo.rentDate))).getMonth()}/${new Date((Date.parse(rentItem.rentalInfo.rentDate))).getDate()}`}`
            }
        </span>
      </div>
    </div>
  );
}

export default RentItemCurrentInfo;
