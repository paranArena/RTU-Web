import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import styles from 'styles/admin/AdminRentalModal.module.css';
import axios from 'axios';
import router from 'next/router';
import { SERVER_API } from '../../../config';

interface INumberingItem {
  id : number;
  numbering : number;
  rentalInfo : {
    expDate : string;
    meRental : boolean;
    rentDate : string;
    rentalStatus : 'RENT' | 'WAIT' | 'RESERVE';
  };
  rentalPolicy : 'FIFO' | 'RESERVE';
}

interface IProductItem {
  category : string;
  caution : string;
  fifoRentalPeriod : number;
  id : number;
  imagePath : string;
  items : INumberingItem[];
  location : {
    name : string;
    latitude : number;
    longitude : number;
  };
  name : string;
  price : number;
  reserveRentalPeriod : number;
}

interface NumberingRentalItemProps {
  productName : string;
  item : INumberingItem;
  setRentView : Dispatch<SetStateAction<{ view : boolean, type : string, id : number }>>;
}

function NumberingRentalItem({
  productName,
  item,
  setRentView,
}:NumberingRentalItemProps) {
  const [viewDate, setViewDate] = useState('');

  useEffect(() => {
    let exp;
    let rent;
    if (item.rentalInfo !== null) {
      let Year;
      let Month;
      let Day;
      let view;
      if (item.rentalInfo.expDate !== null) {
        exp = new Date((item.rentalInfo.expDate).concat('z'));

        Year = exp.getFullYear().toString();
        Month = (exp.getMonth() + 1).toString();
        Day = exp.getDate().toString();

        view = Year.concat('.');
        view = view.concat(Month);
        view = view.concat('.');
        view = view.concat(Day);
      }

      if (item.rentalInfo.rentDate !== null) {
        rent = new Date((item.rentalInfo.rentDate).concat('z'));
        Year = rent.getFullYear().toString();
        Month = (rent.getMonth() + 1).toString();
        Day = rent.getDate().toString();

        let view2 = Year.concat('.');
        view2 = view2.concat(Month);
        view2 = view2.concat('.');
        view2 = view2.concat(Day);
        if (view !== null && view !== undefined) {
          view = (view2.concat('~')).concat(view);
        } else {
          view = view2;
        }
        setViewDate(view);
      }
    }
  }, [item.rentalInfo]);

  return (
    <div className={styles.NumberingRentalItemContainer}>
      <div className={styles.NumberingRentalItemLeftContainer}>
        <div className={styles.NumberingText1Container}>
          <span className={styles.NumberingTitle}>
            {productName}
            -0
            {item.numbering}
          </span>
          {
            item.rentalPolicy === 'FIFO'
              ? <span className={styles.rentalTypeFIFO}>선착순</span>
              : <span>기간제</span>
          }
        </div>
        <span className={styles.memberName}>
          {
            item.rentalInfo !== null && item.rentalInfo.rentalStatus === 'RENT'
              ? '대여중'
              : null
          }
          {
            item.rentalInfo !== null && item.rentalInfo.rentalStatus === 'WAIT'
              ? '예약중'
              : null
          }
        </span>
        <span className={styles.rentDate}>
          {
            item.rentalInfo !== null
              ? viewDate
              : null
          }
        </span>
      </div>

      <div className={styles.NumberingRentalItemRightContainer}>
        <button id={item.rentalInfo === null ? '예약' : '반납'} onClick={(e) => { setRentView({ view: true, type: e.currentTarget.id, id: item.id }); }} className={styles.rentNreturnButton} type="submit">
          {
            item.rentalInfo === null
              ? '예약'
              : '반납'
          }
        </button>
      </div>
    </div>
  );
}

interface AdminRentalModalProps {
  setViewAdminRental:Dispatch<SetStateAction<{ view : boolean, productId : number }>>;
  viewAdminRental : { view : boolean, productId : number };
}

function AdminRentalModal({ viewAdminRental, setViewAdminRental }:AdminRentalModalProps) {
  const [mount, setMount] = useState(0);
  const [adminRentName, setAdminRentName] = useState<string>('');
  const [adminRentStudentId, setAdminRentStudentId] = useState<string>('');

  useEffect(() => {

  }, [viewAdminRental]);

  const [rentView, setRentView] = useState({
    view: false,
    type: '예약',
    id: 0,
  });

  const [productNumbering, setProductNumbering] = useState<IProductItem>({
    category: '',
    caution: '',
    fifoRentalPeriod: 0,
    id: 0,
    imagePath: '',
    items: [{
      id: 0,
      numbering: 0,
      rentalInfo: {
        expDate: '',
        meRental: false,
        rentDate: '',
        rentalStatus: 'RENT',
      },
      rentalPolicy: 'FIFO',
    }],
    location: {
      name: '',
      latitude: 0,
      longitude: 0,
    },
    name: '',
    price: 0,
    reserveRentalPeriod: 0,
  });

  useEffect(() => {
    if (mount === 0) {
      setMount(1);
    } else {
      const { productId } = viewAdminRental;
      const clubId = router.query.id;
      axios.get(
        `${SERVER_API}/clubs/${clubId}/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      ).then((res) => {
        setProductNumbering(res.data.data);
      }).catch((err) => { console.log(err); });
    }
  }, [mount]);

  const EventAdminRentNReturn = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const clubID = router.query.id;
    const itemId = rentView.id;
    const body = {
      name: adminRentName,
      studentId: adminRentStudentId,
    };
    if (rentView.type === '예약') {
      axios.post(`${SERVER_API}/clubs/${clubID}/rentals/${itemId}/apply/admin`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            alert('렌탈 성공');
            setViewAdminRental({
              view: true,
              productId: 0,
            });
          }
          window.location.reload();
        })
        .catch((err) => {
          if (err.response.data.code === 'SAME_STUDENTID_EXIST') {
            alert(err.response.data.message);
          } else {
            alert('오류');
          }
          setRentView({
            view: false,
            id: 0,
            type: '',
          });
          console.log(err);
          window.location.reload();
        });
    } else {
      axios.put(`${SERVER_API}/clubs/${clubID}/rentals/${itemId}/return/admin`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          alert('렌탈 반납 성공');
          setRentView({
            view: false,
            id: 0,
            type: '',
          });
          window.location.reload();
        }
      })
        .catch((err) => {
          console.log(err);
          if (err.response.data.code === 'MEMBER_NOT_FOUND') {
            alert('해당 학번 또는 이름의 멤버를 찾을 수 없습니다.');
          } else if (err.response.data.code === 'SAME_STUDENTID_EXIST') {
            alert(err.response.data.message);
          } else {
            console.log(err);
            alert('오류');
          }
          window.location.reload();
        });
    }
  };

  useEffect(() => {
    console.log();
  }, [adminRentName, adminRentStudentId]);

  return (
    <div className={styles.AdminRentalModalContainer}>
      <div className={styles.AdminRentalModalInnerContainer}>
        <div className={styles.closeContainer}>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <img onClick={() => { setViewAdminRental({ view: false, productId: 0 }); }} className={styles.closeIcon} src="/icons/창닫기 버튼.png" alt="close" />
        </div>
        <section className={styles.AdminRentalRightSection}>
          <div className={styles.RightSectionInnerContainer}>
            {
                Array.isArray(productNumbering.items)
                && productNumbering.items.map((item) => (
                  // eslint-disable-next-line max-len
                  <NumberingRentalItem
                    setRentView={setRentView}
                    item={item}
                    productName={productNumbering.name}
                  />
                ))
              }
          </div>
        </section>

        <section className={styles.AdminRentalLeftSection}>
          <div className={styles.LeftSectionInnerContainer}>
            {
              rentView.view
                ? (
                  <div className={styles.rentNreturnViewContainer}>
                    {/* 대여인 정보 */}
                    <div className={styles.rentNreturnTitleContainer}>
                      <span className={styles.rentNreturnTitle}>
                        {
                          rentView.type === '반납'
                            ? '반납인 정보'
                            : '대여인 정보'
                        }
                      </span>
                    </div>
                    <div>
                      <div className={styles.rentNreturnInputNLabelContainer}>
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label className={styles.labelText}>이름</label>
                        <input onChange={(e) => { setAdminRentName(e.currentTarget.value); }} minLength={2} className={styles.rentNreturnInput} type="string" />
                      </div>

                      <div className={styles.rentNreturnInputNLabelContainer}>
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label className={styles.labelText}>학번</label>
                        <input onChange={(e) => { setAdminRentStudentId(e.currentTarget.value); }} maxLength={7} minLength={6} className={styles.rentNreturnInput} type="number" />
                      </div>
                    </div>

                    <div className={styles.rentNreturnSubmitButtonContainer}>
                      <button onClick={EventAdminRentNReturn} className={styles.rentNreturnSubmitButton} type="submit">완료</button>
                      <button
                        onClick={() => {
                          setRentView({
                            view: false,
                            type: '예약',
                            id: 0,
                          });
                        }}
                        className={styles.rentNreturnSubmitButton}
                        type="button"
                      >
                        닫기
                      </button>
                    </div>
                  </div>
                )
                : null
            }
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminRentalModal;
