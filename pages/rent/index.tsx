import React, { useEffect, useState } from 'react';
import Header from 'components/common/Header';
import TopNavigation from 'components/common/TopNavigation';
import styles from 'styles/rent/RentPage.module.css';
import RentItemCurrentInfo from '../../components/rent/RentItemCurrentInfo';
import AlertModal from '../../components/common/AlertModal';
// import { KAKAO_API_KEY } from '../../config';
import { CommonButton } from '../../components/common/Button';

const KAKAO_API_KEY = 'KAKAO_API_KEY';

interface MapProps {
  latitude: number; // 위도22222
  longitude: number; // 경도
}

function MapComponent({ latitude, longitude }: MapProps) {
  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    // eslint-disable-next-line no-console
    console.log('kakao key : ', `${KAKAO_API_KEY}`);
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

function RentPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [rentType, setRentType] = useState<string>('');
  const [selectedRentType, setSelectedRentType] = useState({
    'fixed-term': false,
    'first-come': false,
  });

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

    if (selectedRentType['first-come']) {
      // eslint-disable-next-line no-console
      console.log('first-come');
    }
  }, [rentType, selectedRentType]);

  return (
    <div className={styles.container}>
      <Header />
      <TopNavigation />

      { selectedRentType['fixed-term'] ? (
        <AlertModal
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
          <>
            <section className={styles.rentItemOuterContainer}>
              <div className={styles.rentItemImageListContainer}>
                <div className={styles.rentImageRepresentativeOuterContainer}>
                  <img className={styles.buttonIcon} src="/icons/leftButton.png" alt="left Button" />
                  {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                  <img
                    className={styles.rentItemRepresentativeImage}
                    src="https://picsum.photos/200"
                    alt="Rental Item Image"
                  />
                  <img className={styles.buttonIcon} src="/icons/rightButton.png" alt="right Button" />
                </div>

                <div className={styles.rentItemSmallImageContainer}>
                  <ul className={styles.rentItemSmallList}>
                    <li>
                      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                      <img
                        className={styles.rentItemSmallImage}
                        src="https://picsum.photos/200/200"
                        alt="Rental Item IMage"
                      />
                    </li>
                    <li>
                      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                      <img
                        className={styles.rentItemSmallImage}
                        src="https://picsum.photos/200/200"
                        alt="Rental Item IMage"
                      />
                    </li>
                    <li>
                      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                      <img
                        className={styles.rentItemSmallImage}
                        src="https://picsum.photos/200/200"
                        alt="Rental Item IMage"
                      />
                    </li>
                    <li>
                      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                      <img
                        className={styles.rentItemSmallImage}
                        src="https://picsum.photos/200/200"
                        alt="Rental Item IMage"
                      />
                    </li>
                  </ul>
                </div>
              </div>

              <div className={styles.rentItemInfoContainer}>
                <div className={styles.rentTitleContainer}>
                  <h1 className={styles.groupName}>REN2U</h1>
                  <h3 className={styles.rentItemClassification}>디지털기기 &gt; 가상기기</h3>
                </div>

                <h1 className={styles.rentItemName}>VR기기</h1>

                <div className={styles.rentItemPriceContainer}>
                  <h3>물품가치</h3>
                  <span className={styles.rentItemPrice}>200,000원</span>
                </div>

                <div className={styles.rentItemListOuterContainer}>
                  <h3>물품목록</h3>
                  <div className={styles.rentItemListContainer}>
                    <RentItemCurrentInfo name="폴라 카메라 - 001" lender="김현지" rentDate="8/11" type="선착순" />
                    <RentItemCurrentInfo name="폴라 카메라 - 002" lender="김현지" rentDate="8/11" type="선착순" />
                    <RentItemCurrentInfo name="폴라 카메라 - 003" lender="김현지" rentDate="8/11" type="기간제" />
                    <RentItemCurrentInfo name="폴라 카메라 - 004" lender={null} rentDate={null} type="기간제" />
                  </div>
                </div>

                <div className={styles.rentTypeSelectContainer}>
                  <div className={styles.dateSelectTitleContainer}>
                    <span className={styles.rentDateTitle}>기간선택</span>
                    {alertShow ? <span className={styles.alertText}>기간을 선택해주세요.</span> : null}
                  </div>
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
                    <button onClick={onClickRentButton} className={styles.rentSubmitButton} type="submit">대여하기</button>
                  </div>

                </div>

              </div>
            </section>

            <section className={styles.rentPrecautionsContainer}>
              <div className={styles.noticeContainer}>
                <h3>사용시 주의사항</h3>
                <div>
                  <p>
                    {/* eslint-disable-next-line max-len */}
                    1. 천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와,
                    {/* eslint-disable-next-line max-len */}
                    때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라
                    {/* eslint-disable-next-line max-len */}
                    실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을 천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다.
                    {/* eslint-disable-next-line max-len */}
                    구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을 천자만홍이 안고, 청춘의
                    {/* eslint-disable-next-line max-len */}
                    것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이
                    {/* eslint-disable-next-line max-len */}
                    착목한는 아니한 두손을 천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고
                    {/* eslint-disable-next-line max-len */}
                    심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을
                    <br />
                    <br />
                    {/* eslint-disable-next-line max-len */}
                    2. 천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와,
                    {/* eslint-disable-next-line max-len */}
                    때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라
                    {/* eslint-disable-next-line max-len */}
                    실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을 천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다.
                    {/* eslint-disable-next-line max-len */}
                    구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을 천자만홍이 안고, 청춘의
                    {/* eslint-disable-next-line max-len */}
                    것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이
                    {/* eslint-disable-next-line max-len */}
                    착목한는 아니한 두손을 천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고
                    {/* eslint-disable-next-line max-len */}
                    심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을
                    <br />
                    <br />
                    {/* eslint-disable-next-line max-len */}
                    3. 천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와,
                    {/* eslint-disable-next-line max-len */}
                    때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라
                    {/* eslint-disable-next-line max-len */}
                    실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을 천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다.
                    {/* eslint-disable-next-line max-len */}
                    구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을 천자만홍이 안고, 청춘의
                    {/* eslint-disable-next-line max-len */}
                    것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이
                    {/* eslint-disable-next-line max-len */}
                    착목한는 아니한 두손을 천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고
                    {/* eslint-disable-next-line max-len */}
                    심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을
                  </p>

                </div>
              </div>
            </section>
          </>
        )
        : (
          <div className={styles.firstComeRentContainer}>
            <h1 className={styles.successText}>예약이 완료되었습니다!</h1>

            <div className={styles.rentInfoContainer}>
              {/*  지도  */}
              <div className={styles.mapContainer}>
                <MapComponent latitude={33.450701} longitude={126.570667} />
              </div>

              <div className={styles.rentInfoTextContainer}>

                <div className={styles.rentalInfo}>
                  <span>물품이름 : 폴라로이드 카메라-001</span>
                  <span>대여기간 : 2022.08.02 ~ 2022.08.09</span>
                </div>

                <div className={styles.pickUpInfoContainer}>
                  <span className={styles.boldBlueText}>10분 내</span>
                  에
                  <br />
                  <span className={styles.boldBlueText}>성호관 201호</span>
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
              }}
            />
          </div>
        ) }
    </div>
  );
}

export default RentPage;
