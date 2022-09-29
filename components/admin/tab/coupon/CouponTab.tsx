import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import axios from 'axios';
import styles from '../../../../styles/admin/coupon/CouponTab.module.css';
import AddCouponTab from './AddCouponTab';
import CouponDetail from './CouponDetail';
import { SERVER_API } from '../../../../config';

interface ICouponItem {
  id : number;
  clubId : number;
  clubName : string;
  name : string;
  imagePath : string;
  actDate : string;
  expDate : string;
  setSelectCoupon : Dispatch<SetStateAction<number>>;
}

function CouponItem(
  {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSelectCoupon, id, clubId, clubName, name, imagePath, actDate, expDate,
  }:ICouponItem,
) {
  return (
  // eslint-disable-next-line max-len
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={styles.couponItemContainer}
      onClick={() => {
        console.log('CouponItem id : ', id);
        setSelectCoupon(id);
      }}
    >
      <div className={styles.couponImgContainer}>
        <img className={styles.couponImg} src={imagePath === null ? '/images/defaultImg.png' : imagePath} alt="coupon img" />
      </div>
      <div className={styles.infoContainer}>
        <h3 className={styles.couponName}>{name}</h3>
        <span className={styles.dateOfUseInCoupon}>
          {new Date((actDate.toString()).concat('Z')).getFullYear()}
          .
          {new Date((actDate.toString()).concat('Z')).getMonth() + 1}
          .
          {new Date((actDate.toString()).concat('Z')).getDate()}
          {' '}
          ~
          {' '}
          {new Date((expDate.toString()).concat('Z')).getFullYear()}
          .
          {new Date((expDate.toString()).concat('Z')).getMonth() + 1}
          .
          {new Date((expDate.toString()).concat('Z')).getDate()}
          {' '}

        </span>
      </div>
    </div>
  );
}

function CouponTab() {
  const [coupon, setCoupon] = useState({
    coupon: true,
    addCoupon: false,
    modifyCoupon: false,
  });

  useEffect(() => {
    console.log(coupon);
  }, [coupon]);

  const [mount, setMount] = useState(0);
  const [couponList, setCouponList] = useState<ICouponItem[]>([]);
  const [selectCoupon, setSelectCoupon] = useState(0);

  useEffect(() => {
    if (mount === 0) {
      setMount(1);
    } else {
      const clubId = window.location.href.slice(window.location.href.search('=') + 1);
      axios.get(
        `${SERVER_API}/clubs/${clubId}/coupons/admin`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
        .then((res) => {
          if (res.status === 200) {
            setCouponList(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [mount]);

  if (selectCoupon === 0) {
    return (
      <div className={styles.couponTabContainer}>

        {
            coupon.coupon
              ? (
                <>
                  <div className={styles.couponTitleContainer}>
                    <h1>쿠폰 등록</h1>
                  </div>
                  <div className={styles.couponRegistrationContainer}>
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                    <div
                      className={styles.couponRegisterButton}
                      onClick={() => {
                        setCoupon({
                          coupon: false,
                          addCoupon: true,
                          modifyCoupon: false,
                        });
                      }}
                    >
                      <img src="/icons/추가하기.png" alt="coupon register button" />
                      <span>등록하기</span>
                    </div>
                  </div>
                  <div className={styles.couponListContainer}>
                    {
                      couponList.map((item) => (
                        <CouponItem
                          setSelectCoupon={setSelectCoupon}
                          id={item.id}
                          clubId={item.clubId}
                          clubName={item.clubName}
                          name={item.name}
                          imagePath={item.imagePath}
                          actDate={item.actDate}
                          expDate={item.expDate}
                        />
                      ))
                     }
                  </div>
                </>
              )
              : null
          }

        {
            coupon.addCoupon
              ? <AddCouponTab type="add" />
              : null
          }

      </div>
    );
  }

  if (coupon.modifyCoupon) {
    return (
      <div className={styles.couponTabContainer}>
        <AddCouponTab type="modify" couponId={selectCoupon} />
      </div>
    );
  }

  return (
    <CouponDetail couponId={selectCoupon} setCoupon={setCoupon} />
  );
}

export default CouponTab;
