import React from 'react';
import styles from 'styles/rent/RentItemCurrentInfo.module.css';
import { IRentItemCurrentInfo } from '../../globalInterface';

function RentItemCurrentInfo(rentInfo :IRentItemCurrentInfo) {
  return (
    <div className={styles.ItemInfoContainer}>
      {
          // eslint-disable-next-line react/destructuring-assignment
            rentInfo.type === '선착순'
            // eslint-disable-next-line react/destructuring-assignment
              ? <span className={styles.tagFC}>{rentInfo.type}</span>
            // eslint-disable-next-line react/destructuring-assignment
              : <span className={styles.tagTerm}>{rentInfo.type}</span>
        }

      {/* eslint-disable-next-line react/destructuring-assignment */}
      <span className={styles.rentItemName}>{rentInfo.name}</span>
      <div className={styles.rentDateContainer}>
        <span className={styles.rentDate}>
          {/* eslint-disable-next-line react/destructuring-assignment */}
          {rentInfo.lender !== null ? `${rentInfo.lender} 대여` : null}
        </span>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        <span className={styles.rentDate}>{rentInfo.lender === null ? '대여가능' : `~${rentInfo.rentDate}`}</span>
      </div>
    </div>
  );
}

export default RentItemCurrentInfo;
