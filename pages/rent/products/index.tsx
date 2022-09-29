import React, { useEffect, useState } from 'react';
import styles from 'styles/pages/RentalProducts.module.css';
import RentItemCurrentInfo from 'components/rent/RentItemCurrentInfo';
import AlertModal from 'components/common/AlertModal';
import { CommonButton } from 'components/common/Button';
import { useRouter } from 'next/router';
import axios from 'axios';
import { KAKAO_API_KEY, SERVER_API } from '../../../config';
import { Location } from '../../../globalInterface';
import { getLocation, measure } from '../../../components/common/getCurrentPosition';

// const KAKAO_API_KEY = 'KAKAO_API_KEY';

export interface MapProps {
  latitude: number; // 위도
  longitude: number; // 경도
}

export function MapComponent({ latitude, longitude }: MapProps) {
  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    // eslint-disable-next-line no-console
    // console.log('kakao key : ', `${KAKAO_API_KEY}`);
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`;
    document.head.appendChild(mapScript);
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
        };

        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, [latitude, longitude]);

  return (
    <div id="map" className={styles.map} />
  );
}

export interface RentalInfo {
  rentalStatus : 'WAIT' | 'RENT' | 'CANCEL' | 'LATE' | 'DONE';
  rentDate : string;
  expDate : string | null;
}

export interface RentItem {
  id : number;
  numbering : number;
  rentalPolicy : 'FIFO' | 'RESERVE'; // 예약제인지 선착순인지
  rentalInfo : RentalInfo | null;
}

// rent/products
interface RentalProductsPageProps {
  id : number; // 대여 물품 id
  name : string; // 대여 물품 이름
  category : string; // 카테고리
  location : Location; // 대여 픽업 위치
  fifoRentalPeriod : number; // 선착순기간?
  reserveRentalPeoriod : number; // 예약제/기간제
  price : number; // 가격
  caution : string; // 주의사항
  imagePath : string; // 대여 물품 이미지
  items : RentItem[];
}

const DefaultrentalItemData :RentalProductsPageProps = {
  id: 0,
  name: '',
  category: '',
  location: {
    name: '',
    latitude: 0,
    longitude: 0,
  },
  fifoRentalPeriod: 0,
  reserveRentalPeoriod: 0,
  price: 0,
  caution: '',
  imagePath: '',
  items: [{
    id: 0,
    numbering: 0,
    rentalPolicy: 'FIFO',
    rentalInfo: {
      rentalStatus: 'WAIT',
      rentDate: '',
      expDate: null,
    },
  }],
};

interface IMyRental {
  clubId: number;
  clubName : string;
  id :number;
  imagePath : string;
  location : {
    latitude : number;
    longitude : number;
    name : string;
  };
  name : string;
  numbering : number;
  rentalInfo :{
    expDate : null | string;
    meRental : boolean;
    rentDate : string;
    rentalStatus : 'WAIT' | 'RENT' | 'RESERVE';
  };
  rentalPolicy : string;
}

function RentalProductsPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [rentType, setRentType] = useState<string>('');
  const [selectedRentType, setSelectedRentType] = useState({
    'fixed-term': false,
    'first-come': false,
  });
  const [myRentals, setMyRentals] = useState<IMyRental[] | IMyRental>([]);
  const [meRentalState, setMeRentalState] = useState('NONE');
  const [rentalItemData, setRentalItemData] = useState(DefaultrentalItemData);
  const [expDate, setExpDate] = useState('');

  const [rentalState, setRentalState] = useState(false);

  useEffect(() => {
    if (meRentalState === 'RENT' && !Array.isArray(myRentals)) {
      const date = new Date(myRentals.rentalInfo.expDate.concat('z'));
      const month = ((date.getMonth() + 1).toString()).concat('월 ');
      const day = (date.getDate().toString()).concat('일 ');
      setExpDate(month.concat(day));
    }
  }, [meRentalState]);

  const router = useRouter();
  // const [rentalDate, setRentalDate] = useState<string>('');

  // 대여 확정까지 남은 시간
  const [min, setMin] = useState<number>(-1);
  const [sec, setSec] = useState<number>(-1);

  const onClickRentApply = async (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const [currentLocation] = await Promise.all([getLocation()]);
    const crrLocation:any = currentLocation;
    let crrlatitude = 0;
    if (crrLocation.latitude !== undefined) {
      crrlatitude = crrLocation.latitude;
    }

    let crrlongitude = 0;
    if (crrLocation.longtitude !== undefined) {
      crrlongitude = crrLocation.longitude;
    }

    // eslint-disable-next-line max-len
    // measure(currentLocation.latitude, currentLocation.longitude, myRentals.location.latitude, myRentals.location.longitude

    // eslint-disable-next-line max-len
    // console.log((measure(37.27206960304626, 127.04518368153681, currentLocation.latitude, currentLocation.longitude)));
    // eslint-disable-next-line max-len
    if (measure(37.27206960304626, 127.04518368153681, crrlatitude, crrlongitude) <= 30) {
      if (!Array.isArray(myRentals)) {
        const { clubId } = myRentals;
        const { id } = myRentals;

        axios({
          method: 'put',
          url: `${SERVER_API}/clubs/${clubId}/rentals/${id}/apply`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }).then((res) => {
          // FIXME :: 나중에 위치인증 넣어야함.
          alert('대여 확정 성공');
          setMyRentals(myRentals);
          // window.location.reload();
        })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      alert('픽업장소에 아직 도달하지 못했습니다.');
    }
  };

  // const [timer, setTimer] = useState();

  useEffect(() => {
    if (rentalItemData.items[0].id === 0) {
      const { clubId, productId } = router.query;
      axios.get(`${SERVER_API}/clubs/${clubId}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          setRentalItemData(res.data.data);
        }
      })
        .catch((err) => {
          console.log(err);
        });

      axios.get(`${SERVER_API}/members/my/rentals`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          setMyRentals(res.data.data);
        }
      })
        .catch((err) => {
          console.log(err);
        });
    }

    if (meRentalState && !Array.isArray(myRentals)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const rentedTime = new Date(myRentals.rentalInfo.rentDate.concat('z'));
      const current = new Date();
      const pickup = new Date(new Date(myRentals.rentalInfo.rentDate.concat('z')).setMinutes(new Date(myRentals.rentalInfo.rentDate.concat('z')).getMinutes() + 10));
      const resultM = ((pickup.getTime() - current.getTime()) / (1000 * 60));
      const M = resultM.toString().slice(0, resultM.toString().search('.') + 1);
      const S = resultM.toString().slice(resultM.toString().search('.') + 2).slice(0, 2);
      setMin(Number(M));
      setSec(Number(S));
    }
  }, [meRentalState]);

  useEffect(() => {
    let rentalIng = 0;
    for (let i = 0; i < rentalItemData.items.length; i += 1) {
      if (rentalItemData.items[i].rentalInfo !== null) {
        rentalIng += 1;
      }
    }

    if (rentalIng === rentalItemData.items.length) {
      setRentalState(false);
    } else {
      setRentalState(true);
    }
  }, [rentalItemData]);

  useEffect(() => {
    // clearInterval(timer);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const timer = setInterval(() => {
      if (Number(sec) > 0) {
        setSec(Number(sec) - 1);
      }
      if (Number(sec) === 0) {
        if (Number(min) === 0) {
          clearInterval(timer);
        } else {
          setMin(Number(min) - 1);
          setSec(59);
        }
      }
    }, 1000);

    if (min === 0 && min === 0) {
      alert('픽업시간이 초과되었습니다.');
      router.push('/rent/products');
    }
    return () => clearInterval(timer);
  }, [min, sec]);

  useEffect(() => {
    const { clubId, productId } = router.query;

    if (clubId !== undefined && productId !== undefined) {
      axios.get(`${SERVER_API}/clubs/${clubId}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          setRentalItemData(res.data.data);
        }
      })
        .catch((err) => {
          console.log(err);
        });

      axios.get(`${SERVER_API}/members/my/rentals`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          setMyRentals(res.data.data);
        }
      })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.query]);

  const onClickRentalCancel = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!Array.isArray(myRentals)) {
      const itemId = myRentals.id;
      axios({
        method: 'delete',
        url: `${SERVER_API}/clubs/${router.query.clubId}/rentals/${itemId}/cancel`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            alert('예약이 취소되었습니다.');
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onClickRentButton = (e : React.MouseEvent<HTMLButtonElement>) => {
    // submit button
    e.preventDefault();
    if (rentType === '') {
      setAlertShow(true);
    } else if (rentType === 'fixed-term') {
      // 기간제
      setSelectedRentType({
        'fixed-term': true,
        'first-come': false,
      });
    } else {
      // 선착순
      setSelectedRentType({
        'fixed-term': false,
        'first-come': true,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let rentalId = null;
      // rentalItemData.items.sort((a, b) => a.id - b.id);
      console.log('rentalItemData : \n', rentalItemData);
      if (Array.isArray(rentalItemData.items)) {
        // eslint-disable-next-line consistent-return
        rentalItemData.items.forEach((item) => {
          if (item.rentalInfo === null) {
            rentalId = item.id;
          }
        });
      }
      if (rentalId !== null) {
        axios({
          method: 'post',
          url: `${SERVER_API}/clubs/${router.query.clubId}/rentals/${rentalId}/request`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }).then(() => {
          alert(`${rentalItemData.name}대여신청 성공하였습니다.`);
        }).catch((err) => {
          console.log(err);
        });
      } else {
        alert('현재 대여 가능한 물품이 존재하지 않습니다.');
        window.location.reload();
      }
    }
  };

  const onClickSelectRentType = (e: React.MouseEvent<HTMLElement>) => {
    // 기간제/선착순 선택
    e.preventDefault();

    // @ts-ignore
    if (e.currentTarget.name === 'fixed-term') {
      // 기간제
      setRentType('fixed-term');
    } else {
      // 선착순
      setRentType('first-come');
    }
  };

  useEffect(() => {
    if (rentType !== '') {
      setAlertShow(false);
    }
  }, [rentType, selectedRentType]);

  useEffect(() => {
    if (Array.isArray(rentalItemData.items) && rentalItemData.items[0].id !== 0) {
      if (Array.isArray(myRentals)) {
        rentalItemData.items.forEach((item) => {
          myRentals.forEach((myRent) => {
            if (item.id === myRent.id) {
              setMeRentalState(item.rentalInfo.rentalStatus);
              setMyRentals(myRent);
            }
          });
        });
      }
    }
  }, [myRentals]);

  const EventReturnButton = async (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const currentLocation:unknown = await getLocation();
    const crrLocation:any = currentLocation;
    let crrlatitude = 0;
    if (crrLocation.latitude !== undefined) {
      crrlatitude = crrLocation.latitude;
    }

    let crrlongitude = 0;
    if (crrLocation.longtitude !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      crrlongitude = crrLocation.longitude;
    }
    // eslint-disable-next-line max-len
    // measure(currentLocation.latitude, currentLocation.longitude, myRentals.location.latitude, myRentals.location.longitude
    // eslint-disable-next-line max-len
    if (measure(crrlatitude, crrlongitude, 37.27206960304626, 127.04518368153681) <= 30) {
      if (!Array.isArray(myRentals)) {
        const itemId = myRentals.id;

        axios(
          {
            method: 'put',
            url: `${SERVER_API}/clubs/${router.query.clubId}/rentals/${itemId}/return`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        ).then((res) => {
          console.log(res);
          // TODO :: 나중에 위치기반 반납도 설정해야함.
          if (res.status === 200) {
            alert('반납이 성공적으로 완료되었습니다.');
            window.location.reload();
          }
        })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      alert('반납장소에 도착하지 못했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      { selectedRentType['fixed-term'] ? (
        <AlertModal
          top={30}
          type="alert"
          onClickEvent={() => {
            setSelectedRentType({
              'fixed-term': false,
              'first-come': false,
            });
          }}
          titleText="아직 지원하지 않는 기능입니다."
          contentText={null}
        />
      ) : null }
      {/* { selectedRentType['fixed-term'] ? <FixedRentModal /> : null } */}
      { !selectedRentType['first-come']
        ? (
          <div className={styles.totalOuterContainer}>
            <section className={styles.rentPrecautionsContainer}>
              <div className={styles.noticeContainer}>
                <h3>사용시 주의사항</h3>
                <div>
                  <p>
                    {rentalItemData.caution}
                  </p>
                </div>
              </div>
            </section>

            <section className={styles.rentItemOuterContainer}>
              <div className={styles.rentItemImageListContainer}>
                <div className={styles.rentImageRepresentativeOuterContainer}>
                  {/* eslint-disable-next-line max-len */}
                  {/* <img className={styles.buttonIcon} src="/icons/leftButton.png" alt="left Button" /> */}
                  {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                  <img
                    className={styles.rentItemRepresentativeImage}
                    src={(rentalItemData.imagePath !== null && rentalItemData.imagePath !== '') ? rentalItemData.imagePath : '/images/productDefaultImg.png'}
                    alt="Rental Item Image"
                  />
                  {/* eslint-disable-next-line max-len */}
                  {/* <img className={styles.buttonIcon} src="/icons/rightButton.png" alt="right Button" /> */}
                </div>

                <div className={styles.rentItemSmallImageContainer}>
                  {/* <ul className={styles.rentItemSmallList}> */}
                  {/*  <li> */}
                  {/*    /!* eslint-disable-next-line jsx-a11y/img-redundant-alt *!/ */}
                  {/*    <img */}
                  {/*      className={styles.rentItemSmallImage} */}
                  {/*      src="https://picsum.photos/200/200" */}
                  {/*      alt="Rental Item IMage" */}
                  {/*    /> */}
                  {/*  </li> */}
                  {/*  <li> */}
                  {/*    /!* eslint-disable-next-line jsx-a11y/img-redundant-alt *!/ */}
                  {/*    <img */}
                  {/*      className={styles.rentItemSmallImage} */}
                  {/*      src="https://picsum.photos/200/200" */}
                  {/*      alt="Rental Item IMage" */}
                  {/*    /> */}
                  {/*  </li> */}
                  {/*  <li> */}
                  {/*    /!* eslint-disable-next-line jsx-a11y/img-redundant-alt *!/ */}
                  {/*    <img */}
                  {/*      className={styles.rentItemSmallImage} */}
                  {/*      src="https://picsum.photos/200/200" */}
                  {/*      alt="Rental Item IMage" */}
                  {/*    /> */}
                  {/*  </li> */}
                  {/*  <li> */}
                  {/*    /!* eslint-disable-next-line jsx-a11y/img-redundant-alt *!/ */}
                  {/*    <img */}
                  {/*      className={styles.rentItemSmallImage} */}
                  {/*      src="https://picsum.photos/200/200" */}
                  {/*      alt="Rental Item IMage" */}
                  {/*    /> */}
                  {/*  </li> */}
                  {/* </ul> */}
                </div>
              </div>

              <div className={styles.rentItemInfoContainer}>
                <div className={styles.rentTitleContainer}>
                  <h1 className={styles.groupName}>REN2U</h1>
                  {/* 나중에 추가 될 카테고리 기능 */}
                  <h3 className={styles.rentItemClassification}>
                    {/* 디지털기기 */}
                    &gt;
                    {' '}
                    {rentalItemData.category}
                  </h3>
                </div>

                <h1 className={styles.rentItemName}>{rentalItemData.name}</h1>

                <div className={styles.rentItemPriceContainer}>
                  <h3>물품가치</h3>
                  <span className={styles.rentItemPrice}>
                    {Number(rentalItemData.price).toLocaleString('ko-KR')}
                    원
                  </span>
                </div>

                <div className={styles.rentItemListOuterContainer}>
                  <h3>물품목록</h3>
                  <div className={styles.rentItemListContainer}>
                    {
                      rentalItemData.items.map((item) => (
                        <RentItemCurrentInfo rentItem={item} itemName={rentalItemData.name} />
                      ))
                    }
                  </div>
                </div>

                <div className={styles.rentTypeSelectContainer}>
                  <div className={styles.dateSelectTitleContainer}>
                    {/* 기간제 추가됐때때 */}
                    {/* <span className={styles.rentDateTitle}>기간선택</span> */}
                    {alertShow ? <span className={styles.alertText}>기간을 선택해주세요.</span> : null}
                  </div>
                  {
                      // TODO:: 대여중인경우 버튼 다르게 보이게하기
                        meRentalState === 'NONE'
                          ? (
                            <div className={styles.buttonContainer}>

                              <div className={styles.selectButtonContainer}>
                                {/* eslint-disable-next-line react/button-has-type */}
                                <button
                                  name="first-come"
                                  onClick={onClickSelectRentType}
                                  className={rentType === 'first-come' ? styles.selectedButton : styles.selectButton}
                                >
                                  <h5>선착순</h5>
                                  <span>바로 대여가 가능합니다.</span>
                                </button>

                                {/* eslint-disable-next-line react/button-has-type */}
                                <button
                                  name="fixed-term"
                                  onClick={onClickSelectRentType}
                                  className={rentType === 'fixed-term' ? styles.selectedButton : styles.selectButton}
                                >
                                  <h5>기간제</h5>
                                  <span>일정기간 대여가 가능합니다.</span>
                                </button>
                              </div>

                              <button onClick={rentalState ? onClickRentButton : null} className={styles.rentSubmitButton} type="submit">
                                {
                                  rentalState ? '대여하기' : '대여불가'
                              }
                              </button>
                            </div>
                          ) : null
                    }

                  { meRentalState === 'WAIT'
                    ? (
                      <div className={styles.buttonContainer}>
                        <div className={styles.pickUpTitleContainer}>
                          <span className={styles.rentDateTitle}>픽업 일정</span>
                        </div>
                        <div className={styles.pickLeftTimeContainer}>
                          <div className={styles.pickLeftTimeInnerContainer}>
                            <span>
                              확정까지
                              {' '}
                              {min}
                              분
                              {' '}
                              {sec}
                              초
                              {' '}

                              /
                              {' '}

                              {
                                      !Array.isArray(myRentals)
                                        ? myRentals.location.name
                                        : null
                                    }
                            </span>
                          </div>

                        </div>
                        <div className={styles.rentCancelNConfirmContainer}>
                          <button onClick={onClickRentalCancel} className={styles.rentalCancelButton} type="submit">예약취소</button>
                          <button onClick={onClickRentApply} className={styles.rentalConfirmButton} type="submit">대여확정</button>
                        </div>
                      </div>
                    ) : null}

                  {meRentalState === 'RENT'
                    ? (
                      <div className={styles.buttonContainer}>
                        <div className={styles.pickUpTitleContainer}>
                          <span className={styles.rentDateTitle}>반납 일정</span>
                        </div>
                        <div className={styles.pickLeftTimeContainer}>
                          <div className={styles.pickLeftTimeInnerContainer}>
                            <span>
                              {
                                !Array.isArray(myRentals) && expDate !== ''
                                  ? (
                                    expDate
                                  )
                                  : null
                              }
                              {
                              !Array.isArray(myRentals) && myRentals.location !== undefined
                                ? myRentals.location.name
                                : null
                            }
                            </span>
                          </div>
                        </div>

                        <div className={styles.rentCancelNConfirmContainer}>
                          <button onClick={EventReturnButton} type="submit" className={styles.returnButton}>반납하기</button>
                        </div>
                      </div>
                    )
                    : null}

                </div>

              </div>
            </section>

            {/* <section className={styles.rentPrecautionsContainer}> */}
            {/*  <div className={styles.noticeContainer}> */}
            {/*    <h3>사용시 주의사항</h3> */}
            {/*    <div> */}
            {/*      <p> */}
            {/*        {rentalItemData.caution} */}
            {/*      </p> */}
            {/*    </div> */}
            {/*  </div> */}
            {/* </section> */}
          </div>
        )
        : (
          <div className={styles.firstComeRentContainer}>
            <h1 className={styles.successText}>예약이 완료되었습니다!</h1>

            <div className={styles.rentInfoContainer}>
              {/*  지도  */}
              <div className={styles.mapOuterContainer}>
                {/* eslint-disable-next-line max-len */}
                <MapComponent latitude={rentalItemData.location.latitude} longitude={rentalItemData.location.longitude} />
              </div>

              <div className={styles.rentInfoTextContainer}>

                <div className={styles.rentalInfo}>
                  <span>
                    물품이름 :
                    {' '}
                    {rentalItemData.name}
                  </span>
                  <span>
                    대여기간 :
                    {' '}
                    {/* FIXME:: */}
                    2022.08.02 ~ 2022.08.09
                  </span>
                </div>

                <div className={styles.pickUpInfoContainer}>
                  <span className={styles.boldBlueText}>10분 내</span>
                  에
                  <br />
                  <span className={styles.boldBlueText}>{rentalItemData.location.name}</span>
                  에서 물품을 픽업해주세요!
                </div>
              </div>
            </div>

            {/* eslint-disable-next-line no-console */}
            <CommonButton
              text="확인"
              onClickEvent={() => {
                setSelectedRentType({
                  'fixed-term': false,
                  'first-come': false,
                });
                alert('대여신청 성공');
                router.push('/rent');
              }}
            />
          </div>
        ) }
    </div>
  );
}

export default RentalProductsPage;
