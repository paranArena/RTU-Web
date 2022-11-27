import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import styles from 'styles/admin/product.module.css';
import axios from 'axios';
import router from 'next/router';
import { IoReloadCircleOutline } from 'react-icons/io5';
import { SERVER_API } from '../../../config';
import { MapComponent } from '../../Map';

export const rentalLocation = [
  {
    key: 1, text: '우리집', latitude: 37.27206960304626, longitude: 127.04518368153681,
  },
  {
    key: 2, text: '팔달관', latitude: 37.28450648122086, longitude: 127.04445813482072,
  },
  {
    key: 3, text: '산학원', latitude: 37.2865287947272, longitude: 127.04586045518012,
  },
  {
    key: 4, text: '성호관', latitude: 37.28292491589741, longitude: 127.04509714010233,
  },
  {
    key: 5, text: '신학생회관', latitude: 37.28450648122086, longitude: 127.04445813482072,
  },
  {
    key: 6, text: '구학생회관', latitude: 37.28450648122086, longitude: 127.04445813482072,
  },
  {
    key: 7, text: '중앙도서관', longitude: 127.0441154519935, latitude: 37.28182601788163,
  },
  {
    key: 8, text: '다산관', longitude: 127.0477894351656, latitude: 37.28301171091047,
  },
  {
    key: 9, text: '율곡관', longitude: 127.04632865694208, latitude: 37.282223882292996,
  },
  {
    key: 10, text: '일신관', longitude: 127.04699244720311, latitude: 37.284327547055774,
  },
  {
    key: 11, text: '광교관', longitude: 127.04652517394291, latitude: 37.285474303640235,
  },
  {
    key: 12, text: '남제관', longitude: 127.04583925992465, latitude: 37.284073455720765,
  },
  {
    key: 13, text: '연암관', longitude: 127.04762543753087, latitude: 37.28223463065516,
  },
  {
    key: 14, text: '홍재관', longitude: 127.04779700355395, latitude: 37.281606086555804,
  },
  {
    key: 15, text: '송재관', longitude: 127.04713969712915, latitude: 37.2808562347841,
  },
  {
    key: 16, text: '텔레토비동산', longitude: 127.04563998294971, latitude: 37.28086583289586,
  },
  {
    key: 17, text: '체육관', longitude: 127.04538573803057, latitude: 37.27997840665075,
  },
  {
    key: 18, text: '서관', longitude: 127.04254630177627, latitude: 37.283718774671826,
  },
  {
    key: 19, text: '동관', longitude: 127.04367402616057, latitude: 37.28384450943755,
  },
  {
    key: 20, text: '원천정보관', longitude: 127.0437414663352, latitude: 37.28346604811299,
  },
  {
    key: 21, text: '원천관', longitude: 127.04332677170262, latitude: 37.28297062908177,
  },
  {
    key: 22, text: '국제학사', longitude: 127.04725490433565, latitude: 37.28476895165975,
  },
  {
    key: 23, text: '제1학생회관', longitude: 127.04542176834845, latitude: 37.28364337050268,
  },
  {
    key: 24, text: '제2학생회관', longitude: 127.04597130194553, latitude: 37.283321036875265,
  },
  {
    key: 25, text: '성호관', longitude: 127.0451816942208, latitude: 37.28289334728198,
  },
  {
    key: 26, text: '팔달관', longitude: 127.04435375458354, latitude: 37.28438488011573,
  },
  {
    key: 27, text: '노천극장', latitude: 127.04552497016576, longitude: 37.28180746340893,
  },
  {
    key: 28, text: '화공실험동', latitude: 127.04274627899989, longitude: 37.283398833738055,
  },
  {
    key: 29, text: '에너지센터', latitude: 127.0426329171173, longitude: 37.28234015353003,
  },
  {
    key: 30, text: '종합설계동', latitude: 127.04229562623287, longitude: 37.284124332085746,
  },
  {
    key: 31, text: '토목실험동', latitude: 127.04353613257712, longitude: 37.28426804858332,
  },
  {
    key: 32, text: '대운동장', latitude: 127.04438531963036, longitude: 37.28052842015183,
  },
  {
    key: 33, text: '아주대학교병원', latitude: 127.04742352794702, longitude: 37.27943698400659,
  },
  {
    key: 34, text: '화홍관', latitude: 127.0463473685448, longitude: 37.28515450460402,
  },
  {
    key: 35, text: '약학관', latitude: 127.0484236537713, longitude: 37.282887560277246,
  },
  {
    key: 36, text: '산학협력원', latitude: 127.04575615861087, longitude: 37.286506292757494,
  },
  {
    key: 37, text: '학생군사교육단', latitude: 127.04493216318889, longitude: 37.285195597006805,
  },
  {
    key: 38, text: '아주대학교정문', latitude: 127.0436887872692, longitude: 37.280118706245126,
  },
  {
    key: 39, text: '대형지반연구실험동', latitude: 127.04272695015163, longitude: 37.28411516679311,
  },
];
interface ITab {
  reserve: boolean;
  rental: boolean;
  return: boolean;
}

// search club rental all api interface
interface IReserveList {
  clubId : number;
  clubName : string;
  id : number;
  imagePath : string;
  memberName : string;
  name : string;
  numbering : number;
  rentalInfo :RentalInfo;
  rentalPolicy : 'FIFO' | 'RESERVE';
}

const TabDefault:ITab = {
  reserve: true,
  rental: false,
  return: false,
};

interface ProductManageModalProps {
  clubId : string;
  setViewAdminRental : Dispatch<SetStateAction<{ view:boolean, productId:number }>>;
  viewAdminRental : {
    view : boolean;
    productId : number;
  }
}

interface IProduct {
  forceUpdate: boolean;
  id : number;
  name: string;
  clubId : number;
  // eslint-disable-next-line react/require-default-props
  category? : string;
  imagePath : string;
  // eslint-disable-next-line react/require-default-props
  left? : number;
  // eslint-disable-next-line react/require-default-props
  max? : number;
  rentalPolicy : 'FIFO' | 'RESERVE';
  memberName : string;
  rentDate : string;
}

// 물품관리
interface ClubProductItemProps {
  imagePath : string;
  name : string;
  max : number;
  itemId : number;
  setClickItemId : Dispatch<SetStateAction<number>>;
  setShowAddProduct :Dispatch<SetStateAction<string>>;
  setViewAdminRental:Dispatch<SetStateAction<{ view : boolean, productId : number }>>;
}

function ReturnItemCard({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  expDate,
  memberName,
  numbering,
  productName,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rentalStatus,
  rentDate,
  thumbnailPath,
  returnDate,
}:IReturnInfo) {
  let Year;
  let Month;
  let Day;
  let ExpDateString;

  if (expDate !== null) {
    const expireDate = new Date(expDate.concat('z'));
    Year = expireDate.getFullYear().toString();
    Month = (expireDate.getMonth() + 1).toString();
    Day = expireDate.getDate().toString();

    Year = Year.concat('.');
    Month = Month.concat('.');

    ExpDateString = (Year.concat(Month)).concat(Day).toString();
  }

  const RentDate = new Date(rentDate.concat('z'));

  Year = RentDate.getFullYear().toString();
  Month = (RentDate.getMonth() + 1).toString();
  Day = RentDate.getDate().toString();

  Year = Year.concat('.');
  Month = Month.concat('.');

  const RentDateString = (Year.concat(Month)).concat(Day).toString();

  const ReturnDate = new Date(returnDate.concat('z'));

  Year = ReturnDate.getFullYear().toString();
  Month = (ReturnDate.getMonth() + 1).toString();
  Day = ReturnDate.getDate().toString();

  Year = Year.concat('.');
  Month = Month.concat('.');

  const ReturnDateString = Month.concat(Day);

  let ViewDateString;
  if (ExpDateString === undefined) {
    ViewDateString = (RentDateString.concat('~'));
  } else {
    ViewDateString = (RentDateString.concat('~')).concat(ExpDateString);
  }

  let flag = 'return';
  let passedDate;
  if (expDate !== null) {
    const exp = new Date(expDate.concat('z'));
    const Return = new Date(returnDate.concat('z'));
    passedDate = (Return.getTime() - exp.getTime()) / (1000 * 3600 * 24);
    if (passedDate >= 1) {
      flag = 'overdue';
      passedDate = Math.ceil(passedDate);
    }
  }

  if (expDate !== null && returnDate === null) {
    flag = 'non-return';
  }

  if (expDate === null) {
    flag = 'rate';
  }

  return (
    <div className={styles.RentalItemCardOuterContainer}>
      <div className={styles.RentalItemCardInnerContainer}>
        <div className={styles.RentalItemLeftContainer}>
          <div className={styles.RentalItemImageContainer}>
            <img
              className={styles.RentalItemImage}
              src={thumbnailPath === null ? '/images/defaultImg.png' : thumbnailPath}
              alt="rental item"
            />
          </div>

          <div className={styles.ReturnItemTextInfoContainer}>
            <span className={styles.RentalItemProductName}>{(productName.concat('-0')).concat(numbering.toString())}</span>
            <span className={styles.RentalItemMemberName}>{memberName}</span>
            <span className={styles.RentalItemRentalDate}>{ViewDateString}</span>
          </div>

        </div>

        {/* TODO:: 후기 버튼 나중에 추가할 것 */}
        {/* <span>후기</span> */}

        <div className={styles.RentalItemRightContainer}>
          {/*
            1. expDate보다 returnDate가 늦으면 n일늦음✅
            2. expDate null => 예약시간에 맞춰서 오지 못함 ( 대여확정을 못함 ) ✅
            3. expDate 존재 returnDate === null => 미반납✅
            4. expDate >= returnDate => 반납완료 RentalItemReturnDateTitle ✅
          */}

          {
            flag === 'rate' ? (
              <span className={styles.redText}>
                예약 시간 늦음
              </span>
            )
              : null
          }

          {
            flag === 'return'
              ? (
                <span className={styles.RentalItemReturnDateTitle}>
                  반납 완료
                </span>
              )
              : null
          }

          {
            flag === 'non-return'
              ? (
                <span className={styles.redText}>
                  미반납
                </span>
              )
              : null
          }

          {
            flag === 'overdue'
              ? (
                <span className={styles.redText}>
                  {passedDate}
                  일 늦음
                </span>
              )
              : null
          }

          <span className={styles.RentalItemReturnDate}>{ReturnDateString}</span>
        </div>

      </div>
    </div>
  );
}

// RentalItemCard
function RentalItemCard({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clubId, clubName, id,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  imagePath, memberName, name, numbering, rentalInfo, rentalPolicy,
}:IReserveList) {
  const RentDate = new Date(rentalInfo.rentDate.concat('z'));
  const ExpDate = new Date(rentalInfo.expDate.concat('z'));

  let hour: string | number = ExpDate.getHours();
  let minute: string | number = ExpDate.getMinutes();

  if (hour < 10 && typeof hour === 'number') {
    hour = '0'.concat(hour.toString());
  } else {
    hour = hour.toString();
  }

  if (minute < 10 && typeof minute === 'number') {
    minute = '0'.concat(minute.toString());
  } else {
    minute = minute.toString();
  }

  let Year = RentDate.getFullYear().toString();
  let Month = (RentDate.getMonth() + 1).toString();
  let Day = RentDate.getDate().toString();

  Year = Year.concat('.');
  Month = Month.concat('.');

  const RentDateString = (Year.concat(Month)).concat(Day).toString();

  Year = ExpDate.getFullYear().toString();
  Month = (ExpDate.getMonth() + 1).toString();
  Day = ExpDate.getDate().toString();

  Year = Year.concat('.');
  Month = Month.concat('.');

  const ExpDateString = (Year.concat(Month)).concat(Day).toString();
  const ReturnDate = Month.concat(Day);

  return (
    <div className={styles.RentalItemCardOuterContainer}>
      <div className={styles.RentalItemCardInnerContainer}>
        <div className={styles.RentalItemLeftContainer}>
          <div className={styles.RentalItemImageContainer}>
            <img
              className={styles.RentalItemImage}
              src={imagePath === null ? '/images/defaultImg.png' : imagePath}
              alt="rental item"
            />
          </div>

          <div className={styles.RentalItemTextInfoContainer}>
            <div className={styles.rentalInfoTextLeft}>
              <span className={styles.RentalItemProductName}>{name.concat('-0').concat(numbering.toString())}</span>
              <span className={styles.RentalItemMemberName}>{memberName}</span>
              <span className={styles.RentalItemRentalDate}>{RentDateString.concat('~').concat(ExpDateString)}</span>
            </div>
          </div>

        </div>
        <div className={styles.RentalItemRightContainer}>
          <span className={styles.RentalItemReturnDateTitle}>반납일</span>
          <span className={styles.timeText}>{ReturnDate}</span>
        </div>
      </div>
    </div>
  );
}

function ClubProductItem({
  imagePath, name, max, setShowAddProduct, setClickItemId, itemId, setViewAdminRental,
}:ClubProductItemProps) {
  // const [onOff, setOnOff] = useState(true);

  const EventRentalModal = (e : React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setViewAdminRental({ view: true, productId: itemId });
  };

  const EventDeleteButton = (e : React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    axios.delete(`${SERVER_API}/clubs/${router.query.id}/products/${itemId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        alert('물품 삭제 성공');
        window.location.reload();
      }
    })
      .catch((err) => { console.log(err); });
  };

  return (
    <div className={styles.ProductItemContainer}>
      <div className={styles.ProductInfoContainer}>
        <div className={styles.ProductImageContainer}>
          <img
            src={(imagePath !== null && imagePath !== '') ? imagePath : '/images/productDefaultImg.png'}
            alt="product item"
          />
        </div>

        <div className={styles.ProductInfoTextContainer}>
          <span className={styles.productName}>{name}</span>
          {/* TODO 무슨 기능인지 모르겠음 */}
          <div className={styles.reserveNfifoQuantityContainer}>
            <span className={styles.quantityRound1}>{max}</span>
            {/* <img className={styles.icon} src="/icons/선착순.png" alt="icon1" /> */}
            {/* <img className={styles.icon} src="/icons/기간제.png" alt="icon2" /> */}
          </div>
        </div>
      </div>

      <div className={styles.ClubProductItemRightContainer}>

        <div className={styles.modifyTextContainer}>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <span onClick={() => {
            setShowAddProduct('modify');
            setClickItemId(itemId);
          }}
          >
            수정
          </span>
        </div>

        <div>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
          <span onClick={EventRentalModal} className={styles.HoverBlueText}>렌탈</span>
        </div>
        <div>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <span onClick={EventDeleteButton} className={styles.deleteText}>삭제</span>
        </div>

        {/* <div className={styles.toggleButtonOuterContainer}> */}
        {/*  /!* 토글 *!/ */}
        {/*  /!* eslint-disable-next-line max-len *!/ */}
        {/*  <div className={styles.toggleButtonInnerContainer}> */}
        {/*    <input type="checkbox" id="toggle" className={styles.toggle} hidden /> */}
        {/*    /!* eslint-disable-next-line jsx-a11y/label-has-associated-control *!/ */}
        {/*    <label htmlFor="toggle" className={styles.toggleSwitch}> */}
        {/*      <span className={styles.toggleButton} /> */}
        {/*    </label> */}
        {/*    /!* <span className={styles.toggleState}>{ false ? 'off' : 'on'}</span> *!/ */}
        {/*  </div> */}
        {/* </div> */}
      </div>

    </div>
  );
}

function ProductItem({
  forceUpdate,
  id,
  name,
  clubId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  category,
  imagePath,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  left,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  max,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rentalPolicy,
  rentDate,
  memberName,
}:IProduct) {
  // 예약 취소를 위한 기능
  // const [cancel, setCancel] = useState(false);
  // const onClickCancelReserve = (e) => {
  //   e.preventDefault();
  //   axios.delete(`${SERVER_API}/clubs/${clubId}/rentals/${id}/cancel`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res.data.data);
  //       setCancel(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const [apply, setApply] = useState(false);

  const onClickRentApply = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    axios({
      method: 'put',
      url: `${SERVER_API}/clubs/${clubId}/rentals/${id}/apply`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      console.log(res);
      setApply(true);
    })
      .catch((err) => {
        console.log(err);
      });
  };

  // const [min, setMin] = useState(0);
  // const [sec, setSec] = useState(0);

  // FIXME :: 나중에 깔끔하게 정리
  // 남은 시간 계산 나중에 정리
  const rentedTime = new Date(rentDate.concat('z'));
  const current = new Date();
  const pickup = new Date(rentedTime.setMinutes(rentedTime.getMinutes() + 10));
  const remainTime = ((pickup.getTime() - current.getTime()) / (1000));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const M = Math.floor(remainTime / (60));
  const S = Math.floor(remainTime % (60));
  let leftTime = M.toString().concat(' : ').concat(S.toString());
  if ((M < 0) && (S < 0)) {
    leftTime = '기한 늦음';
  }
  useEffect(() => {}, [forceUpdate]);
  // setMin(Number(M));
  // setSec(Number(S));

  // useEffect(() => {
  //   // clearInterval(timer);
  //   const timer = setInterval(() => {
  //     if (Number(sec) > 0) {
  //       setSec(Number(sec) - 1);
  //     }
  //     if (Number(sec) === 0) {
  //       if (Number(min) === 0) {
  //         clearInterval(timer);
  //       } else {
  //         setMin(Number(min) - 1);
  //         setSec(59);
  //       }
  //     }
  //   }, 1000);
  //
  //   if (min === 0 && min === 0) {
  //     alert('픽업시간이 초과되었습니다.');
  //     window.location.reload();
  //   }
  //   return () => clearInterval(timer);
  // }, [min, sec]);

  return (
    <div className={styles.ProductItemContainer}>
      <div className={styles.ProductInfoContainer}>
        <div className={styles.ProductImageContainer}>
          <img
            src={(imagePath !== null && imagePath !== '') ? imagePath : '/images/productDefaultImg.png'}
            alt="product item"
          />
        </div>

        <div className={styles.ProductInfoTextContainer}>
          <span className={styles.productName}>{name}</span>
          <span className={styles.productLender}>{memberName}</span>
          {/* <span className={styles.productRentalDate}>d</span> */}
        </div>
      </div>

      <div className={styles.pickupOuterContainer}>
        <div className={styles.pickupInnerContainer}>
          <span className={styles.pickUpText}>픽업</span>
          {/*  */}
          <span className={styles.fifoTimeText}>
            {leftTime}
          </span>
        </div>
      </div>

      <div className={styles.reserveButtonContainer}>
        {
            apply ? <span>수락</span>
              : <button onClick={onClickRentApply} className={styles.reserveButton} type="submit">수락</button>
            // 아직 관리자가 예약취소하는 것은 지원하지 않음
            // // TODO : 예약취소 버튼 누르면 버튼말고 텍스트로 변경
            // cancel ? null
          // eslint-disable-next-line max-len
            //   : <button onClick={onClickCancelReserve} className={styles.reserveButton} type="submit">예약취소</button>
        }
      </div>
    </div>
  );
}

// server에게 product 등록시 보내야하는 값들
interface IProductBoday {
  name : string;
  category : string;
  price : number | null;
  rentalPolicies : 'FIFO' | 'RESERVE';
  fifoRentalPeriod : number;
  reserveRentalPeriod : number;
  rentalFifoCount : number;
  locationName : string;
  longitude : number;
  latitude : number;
  caution : string;
  image : any[];
}

interface IAddProductModal {
  setShowAddProduct : Dispatch<SetStateAction<string>>;
  ModalType : 'add' | 'modify';
  itemId : number;
}

// @ts-ignore
const defaultIProduct :IProductBoday = {
  name: '',
  category: '',
  price: null,
  rentalPolicies: 'FIFO',
  fifoRentalPeriod: 0,
  reserveRentalPeriod: 0,
  rentalFifoCount: 0,
  locationName: '',
  longitude: 0,
  latitude: 0,
  caution: '',
  image: [],
};

// 물품 추가 / 수정
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function AddProductModal({ setShowAddProduct, ModalType, itemId }:IAddProductModal) {
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState(defaultIProduct);
  const [modiProduct, setModiProduct] = useState();

  const category = ['게임/취미', '공부할 때', '도서', '디지털기기', '비오는 날', '생활용품', '스포츠/레저', '의류', '주방용 기구', '춥거나, 더울 때', '피크닉', '행사'];
  // const [donation, setDonation] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const [mapIndex, setMapIndex] = useState(0);
  const [submitActive, setSubmitActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [url, setUrl] = useState('');

  const onChangeLocation = (e) => {
    setProduct({ ...product, locationName: e.currentTarget.value });
    if (product.locationName !== '') {
      // eslint-disable-next-line no-plusplus
      const locationNameTmp = e.currentTarget.value;
      for (let i = 0; i < rentalLocation.length; i += 1) {
        if (locationNameTmp.search(rentalLocation[i].text) === 0) {
          setProduct({
            // eslint-disable-next-line max-len
            ...product, locationName: e.currentTarget.value, longitude: rentalLocation[i].longitude, latitude: rentalLocation[i].latitude,
          });
          setMapIndex(i);
        }
      }
    }
  };

  useEffect(() => {
  }, [submitActive]);

  useEffect(() => {
    if (ModalType === 'modify') {
      const clubId = window.location.search.slice(window.location.search.search('=') + 1);
      axios.get(`${SERVER_API}/clubs/${clubId}/products/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(async (res) => {
          setModiProduct(res.data.data);
        }).catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (modiProduct !== undefined) {
      setProduct({
        // @ts-ignore
        category: modiProduct.category,
        // @ts-ignore
        caution: modiProduct.caution,
        // @ts-ignore
        fifoRentalPeriod: modiProduct.fifoRentalPeriod,
        // @ts-ignore
        image: modiProduct.imagePath,
        // @ts-ignore
        latitude: modiProduct.location.latitude,
        // @ts-ignore
        locationName: modiProduct.location.name,
        // @ts-ignore
        longitude: modiProduct.location.longitude,
        // @ts-ignore
        price: modiProduct.price,
        // @ts-ignore
        rentalFifoCount: modiProduct.items.length,
        // @ts-ignore
        rentalPolicies: 'FIFO',
        // @ts-ignore
        reserveRentalPeriod: 0,
        // @ts-ignore
        name: modiProduct.name,
      });

      // @ts-ignore
      if (modiProduct.imagePath !== undefined) {
        // @ts-ignore
        setUrl(modiProduct.imagePath);
      } else {
        setUrl('');
      }
    }
  }, [modiProduct]);

  // imageURL to Blob
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const convertURLtoFile = async (imgURL: string) => {
    const response = await fetch(imgURL);
    const data = await response.blob();
    const ext = imgURL.split('.').pop(); // url 구조에 맞게 수정할 것
    const filename = imgURL.split('/').pop(); // url 구조에 맞게 수정할 것
    const metadata = { type: `image/${ext}` };
    return new File([data], filename!, metadata);
  };

  const onClickProductSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const clubId = window.location.search.slice(window.location.search.search('=') + 1);

    const data = new FormData();
    data.append('name', product.name);
    data.append('category', product.category);
    if (product.price !== null) {
      data.append('price', product.price.toString());
    } else {
      data.append('price', '0');
    }
    if (modiProduct === undefined) {
      for (let i = 0; i < product.rentalFifoCount; i += 1) {
        data.append('rentalPolicies', 'FIFO');
      }
    }
    data.append('reserveRentalPeriod', product.reserveRentalPeriod.toString());
    data.append('fifoRentalPeriod', product.fifoRentalPeriod.toString());
    data.append('locationName', product.locationName);
    // @ts-ignore
    data.append('longitude', product.longitude);
    // @ts-ignore
    data.append('latitude', product.latitude);
    data.append('caution', product.caution);
    files.forEach((file) => {
      data.append('image', file.uploadedFile);
    });

    if (modiProduct === undefined) {
      axios.post(`${SERVER_API}/clubs/${clubId}/products`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then(() => {
        alert('물품 생성 성공');
        window.location.reload();
      }).catch((err) => {
        console.log(err);
      });
    } else {
      // @ts-ignore
      const imgFile = modiProduct.imagePath;
      data.append('image', imgFile);
      axios.post(`${SERVER_API}/clubs/${clubId}/products/${itemId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        if (res.data.statusCode === 200 && res.data.responseMessage.search('수정') > -1) {
          alert('물품 생성 성공');
          window.location.reload();
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  // FIXME 물품 수정
  const onClickProductUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const clubId = window.location.search.slice(window.location.search.search('=') + 1);

    const data = new FormData();
    data.append('name', product.name);
    data.append('category', product.category);
    data.append('price', product.price.toString());
    if (modiProduct === undefined) {
      for (let i = 0; i < product.rentalFifoCount; i += 1) {
        data.append('rentalPolicies', 'FIFO');
      }
    }
    data.append('reserveRentalPeriod', product.reserveRentalPeriod.toString());
    data.append('fifoRentalPeriod', product.fifoRentalPeriod.toString());
    data.append('locationName', product.locationName);
    // @ts-ignore
    data.append('longitude', product.longitude);
    // @ts-ignore
    data.append('latitude', product.latitude);
    data.append('caution', product.caution);

    // files.forEach((file) => {
    //   console.log('file :', file);
    //   data.append('image', file.uploadedFile);
    // });

    // data.append('image', null);
    // data.append('image', []);
    // data.append('image', null);

    if (modiProduct === undefined) {
      axios.post(`${SERVER_API}/clubs/${clubId}/products`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then(() => {
        window.location.reload();
      }).catch((err) => {
        console.log(err);
      });
    } else {
      // @ts-ignore
      // TODO
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // const imgFile = modiProduct.imagePath;
      // data.append('image', imgFile);
      // data.append('image', '');

      files.forEach((file) => {
        data.append('image', file.uploadedFile);
      });

      axios.put(`${SERVER_API}/clubs/${clubId}/products/${itemId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        if (res.data.statusCode === 200 && res.data.responseMessage.search('수정') > -1) {
          alert('물품 수정 성공');
          window.location.reload();
        }
        // window.location.reload();
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  const handleImgUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    // @ts-ignore

    setFiles([...files, { uploadedFile: file }]);
    const Url = URL.createObjectURL(file);
    if (Url !== undefined) {
      setUrl(Url);
    }
  };

  useEffect(() => {}, [page]);

  useEffect(() => {
    if (product.name !== ''
    && product.caution !== ''
    && product.locationName !== ''
        && product.price !== 0
        && product.category !== '') {
      setSubmitActive(true);
    } else {
      setSubmitActive(false);
    }
  }, [product]);

  useEffect(() => { console.log(); }, [showMap]);

  if (page === 1) {
    return (
      <div className={styles.AddProductModalContainer}>
        <div className={styles.AddProductSection1N2Container}>
          <section className={styles.AddProductSection1}>
            <div className={styles.ModalTitleContainer}>
              {/* title */}

              <h1>{ModalType === 'add' ? '물품 등록' : '물품 수정'}</h1>
            </div>
            <div className={styles.ProductRegistrationInputContainer}>
              {
                ModalType === 'add' ? (
                  <div className={styles.ImageInputContainer}>
                    {/*  대여 물품 사진 */}

                    <h1>대여 물품의 사진을 선택해주세요.</h1>
                    <div className={styles.QuantityNDateInputInnerContainer}>
                      <button className={styles.AddImgButton} type="button">
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="img">
                          사진 추가
                        </label>
                        <input onChange={handleImgUpload} id="img" className={styles.productImgUpload} type="file" />
                      </button>

                      {/* TODO 이미지 여러개 업로드 물품 대표 이미지::다음에 할 것 */}
                      {/* https://velog.io/@jkl1545/%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%8B%A4%EC%A4%91-%EC%97%85%EB%A1%9C%EB%93%9C-%EB%B0%8F-%EB%AF%B8%EB%A6%AC%EB%B3%B4%EA%B8%B0 */}
                      <div className={styles.productImageListContainer}>
                        <div className={styles.productImageListInnerContainer}>
                          <img className={styles.productImg} src={url !== '' ? url : '/images/defaultImg.png'} alt="product" />
                          {/* eslint-disable-next-line max-len */}
                          {/*  <img className={styles.productImg} src="/images/defaultImg.png" alt="product" /> */}
                          {/* eslint-disable-next-line max-len */}
                          {/*  <img className={styles.productImg} src="/images/defaultImg.png" alt="product" /> */}
                          {/* eslint-disable-next-line max-len */}
                          {/*  <img className={styles.productImg} src="/images/defaultImg.png" alt="product" /> */}
                          {/* </div> */}
                        </div>
                      </div>
                      <span className={styles.imgText}>대표사진</span>
                    </div>
                  </div>
                )
                  : null
            }

              {
                  ModalType === 'modify' ? (
                    <div className={styles.ImageInputContainer}>
                      {/*  대여 물품 사진 */}
                      <h1>물품 이미지</h1>
                      <div className={styles.QuantityNDateInputInnerContainer}>
                        <div className={styles.productImageListContainer}>
                          <div className={styles.productImageListInnerContainer}>
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                            <label htmlFor="img">
                              <img className={styles.productImg} src={url !== '' ? url : '/images/defaultImg.png'} alt="product" />
                            </label>
                            {/* eslint-disable-next-line max-len */}
                            {/*  <img className={styles.productImg} src="/images/defaultImg.png" alt="product" /> */}
                            {/* eslint-disable-next-line max-len */}
                            {/*  <img className={styles.productImg} src="/images/defaultImg.png" alt="product" /> */}
                            {/* eslint-disable-next-line max-len */}
                            {/*  <img className={styles.productImg} src="/images/defaultImg.png" alt="product" /> */}
                            {/* </div> */}
                          </div>
                        </div>
                        <span className={styles.imgText}>대표사진</span>
                        <button className={styles.AddImgButton} type="button">
                          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                          <label htmlFor="img">
                            사진 수정
                            <input onChange={handleImgUpload} id="img" className={styles.productImgUpload} type="file" />
                          </label>
                        </button>

                        {/* TODO 이미지 여러개 업로드 물품 대표 이미지::다음에 할 것 */}
                        {/* https://velog.io/@jkl1545/%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%8B%A4%EC%A4%91-%EC%97%85%EB%A1%9C%EB%93%9C-%EB%B0%8F-%EB%AF%B8%EB%A6%AC%EB%B3%B4%EA%B8%B0 */}

                      </div>
                    </div>
                  )
                    : null

              }

              {/*  물건을 픽업할 장소를 정해주세요. */}
              <div className={styles.LocationInputContainer}>
                <h1>다음 사항을 입력해주세요.</h1>
                <div className={styles.location2addressContainer}>

                  <div className={styles.locationMapContainer}>
                    <span className={styles.subTitle}>물품 이름</span>
                    <input value={product.name} onChange={(e) => { setProduct({ ...product, name: e.currentTarget.value }); }} className={styles.inputStyle} type="text" />
                  </div>

                  <div className={styles.productPriceContainer}>
                    <span className={styles.subTitle}>
                      물품 가치
                    </span>
                    <div className={styles.priceOuterContainer}>
                      <div className={styles.priceInnerContainer}>
                        <input
                          value={product.price}
                          onChange={(e) => {
                            // eslint-disable-next-line max-len
                            if (e.currentTarget.value === null || Number(e.currentTarget.value) === 0) {
                              setProduct({ ...product, price: null });
                            } else {
                              setProduct({ ...product, price: Number(e.currentTarget.value) });
                            }
                          }}
                          className={styles.inputStyle}
                          type="number"
                        />
                        <span className={styles.underText}>대여물품 파손 및 손상 시 이용자가 배상해야 할 금앱입니다.</span>
                      </div>
                      {/* <div className={styles.checkContainer}> */}
                      {/*  { */}
                      {/*    donation */}
                      {/* eslint-disable-next-line max-len */}
                      {/*      ? <img onClick={() => { setDonation(false); }} src="/icons/CheckedCircle.png" alt="circle" /> */}
                      {/* eslint-disable-next-line max-len */}
                      {/*      : <img onClick={() => { setDonation(true); }} src="/icons/CheckCircle.png" alt="circle" /> */}
                      {/*  } */}
                      {/*  <span> 기부 </span> */}
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className={styles.contour} />

          <section className={styles.AddProductSection2}>
            {/*  사용시 주의 사항  textarea */}
            <div className={styles.cautionContainer}>
              <span className={styles.text}>카테고리 선택</span>
              <div className={styles.categoryOuterContainer}>
                <ul className={styles.categoryInnerContainer}>
                  {/* eslint-disable-next-line max-len */}
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                  <li onClick={(e) => { setProduct({ ...product, category: e.currentTarget.innerHTML }); }} className={product.category === '가전제품' ? styles.categoryFirstSelect : styles.categoryFirst}>가전제품</li>
                  {
                    category.map((item) => (

                      // eslint-disable-next-line max-len
                      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions,max-len
                      <li onClick={(e) => { setProduct({ ...product, category: e.currentTarget.innerHTML }); }} className={product.category === item ? styles.categorySelect : styles.category}>{item}</li>
                    ))
                  }
                  {/* eslint-disable-next-line max-len */}
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                  <li onClick={(e) => { setProduct({ ...product, category: e.currentTarget.innerHTML }); }} className={product.category === '기타' ? styles.categoryLastSelect : styles.categoryLast}>기타</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <section className={styles.AddProductSection3}>
          <div className={styles.buttonContainer}>
            <button onClick={() => { setPage(2); }} className={(product.name !== '' && product.price !== 0 && product.category !== '') ? styles.submitButtonActive : styles.submitButtonUnActive} type="submit">다음</button>
          </div>
        </section>
      </div>
    );
  }
  return (
    <div className={styles.AddProductModalContainer}>
      <div className={styles.AddProductSection1N2Container}>
        <section className={styles.AddProductSection1}>
          <div className={styles.ModalTitleContainer}>
            {/* title */}
            <h1>물품 등록</h1>
          </div>

          <div className={styles.ProductRegistrationInputContainer}>
            <div className={styles.QuantityInputContainer}>
              {/*  다음 사항을 입력해주세요. */}
              <h1>다음 사항을 입력해주세요.</h1>
              <div className={styles.QuantityNDateInputInnerContainer}>
                {/* 수량 */}
                <span className={styles.subTitle}>수량</span>
                <div className={styles.QuantityContainer}>

                  <div className={styles.fifoContainer}>
                    <span className={styles.text}>선착순</span>
                    <div>
                      {
                        modiProduct === undefined
                          ? <input onChange={(e) => { setProduct({ ...product, rentalFifoCount: Number(e.currentTarget.value) }); }} className={styles.NumberInput} type="number" />
                        // @ts-ignore
                          : <input value={modiProduct.items.length} onChange={(e) => { setProduct({ ...product, rentalFifoCount: Number(e.currentTarget.value) }); }} className={styles.NumberInput} type="number" />

                      }
                      <span className={styles.text}>개</span>
                    </div>
                  </div>

                  {/* <div className={styles.reserveContainer}> */}
                  {/*  <span className={styles.text}>기간제</span> */}
                  {/*  <div> */}
                  {/*    <input className={styles.NumberInput} type="number" /> */}
                  {/*    <span className={styles.text}>개</span> */}
                  {/*  </div> */}
                  {/* </div> */}
                </div>
              </div>

              <div className={styles.DateInputInnerContainer}>
                {/* 최대 대여기간 설정 */}
                <span className={styles.subTitle}>최대 대여기간 설정</span>
                <div className={styles.DateContainer}>
                  <div className={styles.fifoContainer}>
                    <span className={styles.text}>선착순</span>
                    <div>
                      <input value={product.fifoRentalPeriod} onChange={(e) => { setProduct({ ...product, fifoRentalPeriod: Number(e.currentTarget.value) }); }} className={styles.NumberInput} type="number" />
                      <span className={styles.text}>일</span>
                    </div>

                  </div>
                  {/* <div className={styles.reserveContainer}> */}
                  {/*  <span className={styles.text}>기간제</span> */}
                  {/*  <div> */}
                  {/*    <input className={styles.NumberInput} type="number" /> */}
                  {/*    <span className={styles.text}>일</span> */}
                  {/*  </div> */}
                  {/* </div> */}
                </div>
              </div>
            </div>

            {showMap ? (
              <div className={styles.mapModalOuterContainer}>
                <div className={styles.mapModalInnerContainer}>
                  <div className={styles.mapModalTopContainer}>
                    <div className={styles.titleContainer}>
                      <h1>장소 선택</h1>
                    </div>
                    <div>
                      {/* eslint-disable-next-line max-len */}
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                      <img onClick={() => { setShowMap(false); }} className={styles.closeIcon} src="/icons/창닫기 버튼.png" alt="close" />
                    </div>
                  </div>

                  <div className={styles.mapContainer}>
                    <div className={styles.mapNSelectLocationNameContainer}>
                      <div className={styles.MapComponentContainer}>

                        <MapComponent
                          latitude={rentalLocation[mapIndex].latitude}
                          longitude={rentalLocation[mapIndex].longitude}
                        />
                      </div>
                      <div className={styles.locationNameContainer}>
                        {
                                product.locationName
                        }
                      </div>
                    </div>

                    <div className={styles.MapButtonContainer}>
                      <button onClick={() => { setShowMap(false); }} type="button" className={styles.mapSubmitButton}>확인</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/*  물건을 픽업할 장소를 정해주세요. */}
            <div className={styles.LocationInputContainer}>
              <h1>물건을 픽업할 장소를 정해주세요.</h1>
              <div className={styles.location2addressContainer}>
                <div className={styles.addressContainer}>
                  <span className={styles.subTitle}>
                    건물명과 호수까지 입력해주세요.
                  </span>
                  <input value={product.locationName} onChange={onChangeLocation} className={styles.addressInput} type="text" />
                </div>

                <div className={styles.locationMapContainer}>
                  <span className={styles.subTitle}>지도로 장소 확인하기</span>
                  <button onClick={() => { setShowMap(true); }} type="button" className={product.locationName === '' ? styles.disabled : styles.mapButton}>지도에서 장소 표시</button>
                </div>
              </div>
            </div>
          </div>

        </section>

        <div className={styles.contour} />

        <section className={styles.AddProductSection2}>
          {/*  사용시 주의 사항  textarea */}
          <div className={styles.cautionContainer}>
            <span className={styles.text}>사용시 주의해야 할 사항이 있을까요?</span>
            <textarea value={product.caution} onChange={(e) => { setProduct({ ...product, caution: e.currentTarget.value }); }} className={styles.cautionTextArea} placeholder="텍스트를 입력해주세요." />
          </div>
        </section>
      </div>

      <section className={styles.AddProductSection3}>
        <div className={styles.buttonContainer}>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <span
            onClick={() => { setPage(1); }}
            className={styles.beforeButton}
          >
            이전
          </span>
          <button onClick={ModalType === 'add' ? onClickProductSubmit : onClickProductUpdate} className={submitActive ? styles.submitButtonActive : styles.submitButtonUnActive} type="submit">등록</button>
        </div>
      </section>
    </div>
  );
}

// eslint-disable-next-line max-len
const defaultProduct : { left: number; max: number; imagePath: string; name: string; clubId: number; id: number; category: string } = {
  id: 0,
  name: '',
  clubId: 0,
  category: '',
  imagePath: '',
  left: 0,
  max: 0,
};

// ProductManageModal에서 필요한것들
interface RentalInfo {
  expDate : string | null;
  meRental : boolean;
  rentDate : string;
  rentalStatus : string;
}

interface IReturnInfo {
  expDate : string;
  id : number;
  numbering : number;
  memberName : string;
  productName : string;
  rentDate : string;
  rentalStatus : 'DONE' | 'CANCEL';
  returnDate : string;
  thumbnailPath : string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars,max-len
function ProductManageModal({ viewAdminRental, clubId, setViewAdminRental }:ProductManageModalProps) {
  const [tab, setTab] = useState<ITab>(TabDefault);
  // eslint-disable-next-line max-len
  const [productList, setProductList] = useState<{ left: number; max: number; imagePath: string; name: string; clubId: number; id: number; category: string } []>([defaultProduct]);
  const [showAddProduct, setShowAddProduct] = useState<string>('');
  const [clickedItem, setClickedItem] = useState(0);

  // 대여 관리 :: 예약
  const [reserveList, setReserveList] = useState<IReserveList[]>([]);

  // 대여 관리 :: 대여
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rentalList, setRentalList] = useState<IReserveList[]>([]);

  // 대여 관리 :: 반납
  const [returnList, setReturnList] = useState<IReturnInfo[]>([]);
  const [forceUpdate, setForceUpdate] = useState<boolean>(true);

  // 새로고침
  const reload = () => {
    if (tab.reserve || tab.rental) {
      axios.get(`${SERVER_API}/clubs/${clubId}/rentals/search/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          const reserve = [];
          const rental = [];
          if (Array.isArray(res.data.data)) {
            res.data.data.forEach((item) => {
              if (item.rentalInfo.rentalStatus === 'WAIT') {
                reserve.push(item);
              } else if (item.rentalInfo.rentalStatus === 'RENT') {
                rental.push(item);
              }
            });
            setReserveList(reserve);
            setRentalList(rental);
          }
        }
      }).catch((err) => {
        console.log(err);
      });
    } else if (tab.return) {
      axios.get(`${SERVER_API}/clubs/${clubId}/rentals/history/search/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          setReturnList(res.data.data);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  const doForceUpdate = () => {
    setForceUpdate((fu) => !fu);
  };
  useEffect(() => {
    console.log();
  }, [reserveList, rentalList, returnList]);
  // 클럽에 등록된 모든 물품

  useEffect(() => {
    const clubID = window.location.search.slice(window.location.search.search('=') + 1);
    console.log('qweqweqwe : ', clubID);

    axios.get(`${SERVER_API}/clubs/${clubID}/products/search/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        setProductList(res.data.data);
      }
    }).catch((err) => {
      console.log(err);
    });

    if (tab.reserve) {
      // 예약 탭
      axios.get(`${SERVER_API}/clubs/${clubId}/rentals/search/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          let reserve = [];
          let rental = [];
          if (Array.isArray(res.data.data)) {
            res.data.data.forEach((item) => {
              if (item.rentalInfo.rentalStatus === 'WAIT') {
                reserve.push(item);
              } else if (item.rentalInfo.rentalStatus === 'RENT') {
                rental.push(item);
              }
            });

            reserve = reserve.sort((a, b) => {
              const aDate = new Date((a.rentalInfo.rentDate.concat('z')));
              const bDate = new Date((b.rentalInfo.rentDate.concat('z')));
              return aDate.valueOf() - bDate.valueOf();
            });

            rental = rental.sort((a, b) => {
              const aDate = new Date((a.rentalInfo.expDate.concat('z')));
              const bDate = new Date((b.rentalInfo.expDate.concat('z')));
              return aDate.valueOf() - bDate.valueOf();
            });

            setReserveList(reserve);
            setRentalList(rental);
          }
        }
      }).catch((err) => {
        console.log(err);
      });
    } else if (tab.return) {
      axios.get(`${SERVER_API}/clubs/${clubId}/rentals/history/search/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          let tmp = res.data.data;
          tmp = tmp.sort((a, b) => {
            const aDate = new Date((a.returnDate.concat('z')));
            const bDate = new Date((b.returnDate.concat('z')));
            return bDate.valueOf() - aDate.valueOf();
          });
          setReturnList(tmp);
        }
      }).catch((err) => {
        console.log(err);
      });
    } else {
    //  rental server 요청
    }
  }, [tab]);

  useEffect(() => {

  }, [showAddProduct]);

  useEffect(() => {

  }, [clickedItem]);

  const [mount, setMount] = useState(false);

  useEffect(() => {
    // clearInterval(timer);
    if (mount === false) {
      setMount(true);
    } else {
      setInterval(() => {
        doForceUpdate();
      }, 1000);
    }
  }, [mount]);

  if (showAddProduct === 'add') {
    return (
      <AddProductModal setShowAddProduct={setShowAddProduct} ModalType="add" itemId={clickedItem} />
    );
  }
  if (showAddProduct === 'modify') {
    return (
      <AddProductModal setShowAddProduct={setShowAddProduct} ModalType="modify" itemId={clickedItem} />
    );
  }
  // @ts-ignore
  return (
    <div className={styles.ProductManageModal}>
      <section className={styles.Section}>
        <div className={styles.InnerModalContainer}>
          {/*  대여 관리  */}
          <div className={styles.TitleContainer}>
            {/* 타이틀 */}
            <h1>대여 관리</h1>
            <div>
              <IoReloadCircleOutline style={{ cursor: 'pointer' }} onClick={reload} size={30} />
            </div>
          </div>

          <div className={styles.rentalNavContainer}>
            <nav className={styles.rentalNavigation}>
              <ul>
                {/* eslint-disable-next-line max-len */}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                <li
                  onClick={() => { setTab({ reserve: true, rental: false, return: false }); }}
                  className={tab.reserve ? styles.current : styles.notCurrent}
                >
                  예약
                </li>

                {/* eslint-disable-next-line max-len */}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                <li
                  onClick={() => { setTab({ reserve: false, rental: true, return: false }); }}
                  className={tab.rental ? styles.current : styles.notCurrent}
                >
                  대여
                </li>

                {/* eslint-disable-next-line max-len */}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                <li
                  onClick={() => { setTab({ rental: false, reserve: false, return: true }); }}
                  className={tab.return ? styles.current : styles.notCurrent}
                >
                  반납
                </li>
              </ul>
            </nav>
          </div>

          <div className={styles.outerContainer}>
            <div className={styles.innerContainer}>
              {/*  TODO : reserve */}
              {
                tab.reserve && reserveList.length > 0
                  ? reserveList.map((item) => (
                    <ProductItem
                      forceUpdate={forceUpdate}
                      id={item.id}
                      name={item.name}
                      clubId={item.clubId}
                      imagePath={item.imagePath}
                      rentalPolicy={item.rentalPolicy}
                      memberName={item.memberName}
                      rentDate={item.rentalInfo.rentDate}
                    />
                  ))
                  : null
              }

              {
                tab.rental && rentalList.length > 0
                  ? rentalList.map((item) => (
                    <RentalItemCard
                      clubId={item.clubId}
                      clubName={item.clubName}
                      id={item.id}
                      imagePath={item.imagePath}
                      memberName={item.memberName}
                      name={item.name}
                      numbering={item.numbering}
                      rentalInfo={item.rentalInfo}
                      rentalPolicy={item.rentalPolicy}
                    />
                  ))
                  : null
              }

              {
                tab.return && rentalList.length > 0
                  ? returnList.map((item) => (
                    <ReturnItemCard
                      expDate={item.expDate}
                      id={item.id}
                      numbering={item.numbering}
                      memberName={item.memberName}
                      productName={item.productName}
                      rentDate={item.rentDate}
                      rentalStatus={item.rentalStatus}
                      returnDate={item.rentDate}
                      thumbnailPath={item.thumbnailPath}
                    />
                  ))
                  : null
              }
            </div>
          </div>

        </div>
      </section>

      <section className={styles.Section2}>
        <div className={styles.InnerModalContainer}>
          {/*  물품 관리  */}
          <div className={styles.TitleContainer}>
            {/*  타이틀  */}
            <h1>물품 관리</h1>
          </div>

          <div className={styles.addProductAndSelectButtonOuterContainer}>
            <div className={styles.addProductAndSelectButtonInnerContainer}>
              <div className={styles.addProductAndSelectContainer}>
                {/* eslint-disable-next-line max-len */}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,max-len,jsx-a11y/no-static-element-interactions */}
                <div className={styles.addProductContainer} onClick={() => { setShowAddProduct('add'); }}>
                  <img className={styles.icon} src="/icons/추가하기.png" alt="add product icon" />
                  <span>등록하기</span>
                </div>
                {/* <div className={styles.selectContainer}> */}
                {/* eslint-disable-next-line max-len */}
                {/*  <img className={styles.icon} src="/icons/CheckCircle.png" alt="select icon" /> */}
                {/*  <span>선택</span> */}
                {/* </div> */}
              </div>
            </div>
          </div>

          <div className={styles.outerContainer}>
            <div className={styles.innerContainer}>
              {/* { */}
              {/*  productList.map((product) => ( */}
              {/*    // <ProductItem /> */}
              {/*  )) */}
              {/* } */}
              {
                productList.map((item) => (
                  <ClubProductItem
                    setViewAdminRental={setViewAdminRental}
                    setClickItemId={setClickedItem}
                    itemId={item.id}
                    setShowAddProduct={setShowAddProduct}
                    max={item.max}
                    name={item.name}
                    imagePath={item.imagePath}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductManageModal;
