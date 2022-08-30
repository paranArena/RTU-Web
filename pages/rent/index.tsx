import React, {useState} from 'react';
import Header from 'components/common/Header';
import TopNavigation from 'components/common/TopNavigation';
import styles from 'styles/rent/RentPage.module.css';
import RentItemCurrentInfo from '../../components/rent/RentItemCurrentInfo';

function RentPage() {
  const [show, setShow] = useState<boolean>(true);


  return (
    <div className={styles.container}>
      <Header />
      <TopNavigation />
      <section className={styles.rentItemOuterContainer}>
        <div className={styles.rentItemImageListContainer}>
          <div className={styles.rentImageRepresentativeOuterContainer}>
            <img className={styles.buttonIcon} src="/icons/leftButton.png" alt="left Button" />
            <img className={styles.rentItemRepresentativeImage} src="https://picsum.photos/200" alt="Rental Item Image" />
            <img className={styles.buttonIcon} src="/icons/rightButton.png" alt="right Button" />
          </div>

          <div className={styles.rentItemSmallImageContainer}>
            <ul className={styles.rentItemSmallList}>
              <li>
                <img className={styles.rentItemSmallImage} src="https://picsum.photos/200/200" alt="Rental Item IMage" />
              </li>
              <li>
                <img className={styles.rentItemSmallImage} src="https://picsum.photos/200/200" alt="Rental Item IMage" />
              </li>
              <li>
                <img className={styles.rentItemSmallImage} src="https://picsum.photos/200/200" alt="Rental Item IMage" />
              </li>
              <li>
                <img className={styles.rentItemSmallImage} src="https://picsum.photos/200/200" alt="Rental Item IMage" />
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
              { show ? <span className={styles.alertText}>기간을 선택해주세요.</span> : null}
            </div>
            <div className={styles.buttonContainer}>
              <div className={styles.selectButtonContainer}>
                <div className={styles.selectButton}>
                  <h5>선착순</h5>
                  <span>바로 대여가 가능합니다.</span>
                </div>
                <div className={styles.selectButton}>
                  <h5>기간제</h5>
                  <span>일정기간 대여가 가능합니다.</span>
                </div>
              </div>
              <button className={styles.rentSubmitButton} type="submit">대여하기</button>
            </div>

          </div>

        </div>
      </section>

      <section className={styles.rentPrecautionsContainer}>
        <div className={styles.noticeContainer}>
          <h3>사용시 주의사항</h3>
          <div>
            <p>
              1. 천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을 천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을 천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을 천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을
              <br/><br/>
              2. 천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을 천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을 천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을 천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을
              <br/><br/>
              3. 천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을 천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을 천자만홍이 안고, 청춘의 것이다.보라, 천하를 기관과 길지 모래뿐일 피다. 구하기 착목한는 실로 주는 것이다. 동력은 소금이라 실현에 같이, 청춘 아름답고 심장의 되려니와, 때문이다. 어디 만물은 부패를 이 착목한는 아니한 두손을
            </p>

          </div>
        </div>
      </section>
    </div>
  );
}

export default RentPage;
