import React, { useEffect, useState } from 'react';
import styles from 'styles/pages/RentPage.module.css';
import axios from 'axios';
import router from 'next/router';
import { IClubProduct } from '../../globalInterface';
// import { SERVER_API } from '../../config';
import { getLocation, measure } from '../../components/common/getCurrentPosition';

interface ProductCardProps {
  name : string;
  thumbNail : string;
  left : number;
  max : number;
  clubId : number;
  productId : number;
}

function ProductCard({
  name,
  thumbNail,
  left,
  max,
  clubId,
  productId,
}: ProductCardProps) {
  const onClickProductCard = (e : React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    router.push({
      pathname: '/rent/products',
      query: { clubId, productId },
    });
  };

  return (
  // eslint-disable-next-line max-len
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div onClick={onClickProductCard} className={styles.productCardOuterContainer}>
      <div className={styles.productCardInnerContainer}>
        <div className={styles.productImgContainer}>
          {/* 물품 이미지 컨테이너 */}
          <img className={styles.thumbNail} src={(thumbNail === '' || thumbNail === null) ? '/images/productDefaultImg.png' : thumbNail} alt="thumbnail" />
        </div>

        <div className={styles.productNameContainer}>
          {/*  물품 이름 컨테이너  */}
          <h1>{name}</h1>
        </div>

        <div className={styles.productQuantityContainer}>
          {/*  물품 남은 수량 컨테이너  */}
          <h3>
            남은 수량
            {left}
            /
            {max}
          </h3>
        </div>
      </div>
    </div>
  );
}

interface IMyRentals {
  id : number;
  numbering : number;
  productId : number;
  name : string;
  clubId : number;
  clubName : string;
  imagePath : string;
  rentalPolicy : 'RESERVE' | 'FIFO';
  rentalInfo : {
    rentalStatus : 'RENT' | 'WAIT' | 'DONE' ;
    rentDate : string;
    expDate : string;
    meRental : boolean;
  };
  location : {
    name : string;
    latitude : number;
    longitude : number;
  };
}

interface Iitem {
  productId : number;
  name : string;
  clubId : number;
  id : number;
  imagePath : string;
  rentalInfo : {
    rentalStatus : 'RENT' | 'WAIT' | 'DONE' ;
    rentDate : string;
    expDate : string;
    meRental : boolean;
  }
}

interface MyRentalProps {
  item : Iitem;
}

function MyRentalCard({ item }:MyRentalProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const EventReturnButton = async (e : React.MouseEvent<HTMLButtonElement>) => {
    const currentLocation:any = await getLocation();
    const crrLocation: any = currentLocation;
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
      axios(
        {
          method: 'put',
          url: `http://15.165.38.225:8080/clubs/${item.clubId}/rentals/${item.id}/return`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },

        },
      ).then((res) => {
        console.log(res);
        alert('렌탈 반납 성공');
        window.location.reload();
      })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('반납 위치에 도달하지 못하였습니다.');
    }
  };

  const EventRentalButton = async () => {
    const currentLocation:any = await getLocation();
    console.log('getLocation');
    const crrLocation: any = currentLocation;
    let crrlatitude = 0;
    if (crrLocation.latitude !== undefined) {
      crrlatitude = crrLocation.latitude;
    }
    let crrlongitude = 0;
    if (crrLocation.longtitude !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      crrlongitude = crrLocation.longitude;
    }

    console.log('crrlongitude : ', crrlongitude);
    console.log('crrlatitude : ', crrlatitude);
    if (measure(crrlatitude, crrlongitude, 37.27206960304626, 127.04518368153681) <= 30) {
      axios(
        {
          method: 'put',
          url: `http://15.165.38.225:8080/clubs/${item.clubId}/rentals/${item.id}/apply`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      ).then((res) => {
        console.log(res);
        alert('대여 확정 성공');
        // window.location.reload();
      })
        .catch((err) => {
          console.log(err);
          alert('대여 확정 실패');
        });
    } else {
      alert('픽업 위치에 도달하지 못하였습니다.');
    }
  };

  return (
  // eslint-disable-next-line max-len
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      onClick={
          () => {
            const { clubId } = item;
            const { productId } = item;
            router.push({
              pathname: '/rent/products',
              query: { clubId, productId },
            });
          }
        }
      className={styles.myRentalOuterContainer}
    >
      <div className={styles.myRentalInnerContainer}>
        <div className={styles.productImgContainer}>
          <img className={styles.myRentalImg} src={item.imagePath === null ? '/images/defaultImg.png' : item.imagePath} alt="my rental img" />
        </div>
        <div className={styles.myRentalTextContainer}>
          <div className={styles.productNameContainer}>
            <h1>
              {item.name}
            </h1>
          </div>
          <div className={styles.myRentalReserveCancelButtonContainer}>
            <span>
              반납일 :
              {
                item.rentalInfo.expDate !== null
                  ? (new Date(item.rentalInfo.expDate.concat('z')).getFullYear().toString().concat('.')
                    .concat(new Date(item.rentalInfo.expDate.concat('z')).getMonth().toString().concat('.')
                      .concat(new Date(item.rentalInfo.expDate.concat('z')).getDate().toString())))
                  : null
                          }
            </span>

            {
              item.rentalInfo.rentalStatus === 'WAIT'
                ? (
                  <button type="submit" onClick={EventRentalButton} className={styles.myRentalReturnButton}>
                    대여확정
                  </button>
                )
                : (
                  <button type="submit" onClick={EventReturnButton} className={styles.myRentalReturnButton}>
                    반납하기
                  </button>
                )
            }

          </div>
        </div>
      </div>
    </div>
  );
}

function RentPage() {
  const [allClubId, setAllClubID] = useState<number[] | null>(null);
  const [allClubProduct, setAllClubProduct] = useState<IClubProduct[]>([]);

  const [myRentals, setMyRentals] = useState<IMyRentals[]>([]);

  const [mount, setMount] = useState(0);

  useEffect(() => {
    axios.get(
      'http://15.165.38.225:8080/members/my/rentals',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    ).then((res) => {
      setMyRentals(res.data.data);

      console.log('/members/my/rentals : ', res.data.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    if (mount === 0) {
      setMount(1);
    } else if (allClubId === null) {
      axios.get('http://15.165.38.225:8080/members/my/clubs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          const arr = [];
          res.data.data.forEach((club) => {
            arr.push(club.id);
          });

          setAllClubID(arr);
        }
      })
        .catch((err) => {
          console.log(err);
        });

      console.log(allClubProduct);
    }
  }, [mount]);

  useEffect(() => {
    if (allClubId !== null) {
      allClubId.forEach((id) => {
        axios.get(`http://15.165.38.225:8080/clubs/${id}/products/search/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }).then((res) => {
          if (res.status === 200 && res.data.data.length > 0) {
            const arr = allClubProduct;
            res.data.data.forEach((product) => {
              arr.push(product);
            });

            const set = new Set(arr);
            setAllClubProduct(Array.from(set));

            console.log('clubs/clubId/products/search/all', res.data.data);
          }
        }).catch((err) => {
          console.log(err);
        });
      });
    }
  }, [allClubId]);

  // @ts-ignore
  return (
    <div className={styles.rentPageContainer}>
      <div className={styles.rentPageInnerContainer}>
        {/*  아직 API 구현 안됨. 다음에 구현할 예정 */}
        <section className={styles.rentaledListSection}>
          {/*  대여 목록  */}
          <div className={styles.titleTopContainer}>
            <div className={styles.titleContainer}>
              <h3 className={styles.title}>대여목록</h3>
            </div>
          </div>

          <div className={styles.productListContainer}>
            {
              myRentals.map((item) => (
                <MyRentalCard item={item} />
              ))
            }
          </div>

        </section>

        <section className={styles.rentProductlListSection}>
          {/*  물품 목록  */}
          <div className={styles.titleTopContainer}>
            <div className={styles.titleContainer}>
              <h3 className={styles.title}>물품목록</h3>
            </div>

            <div className={styles.productTotalContainer}>
              <h3>
                총
                {allClubProduct !== null ? allClubProduct.length : 0}
                개
              </h3>
              {/* <img src="/icons/중앙정렬.png" alt="filter" /> */}
            </div>
          </div>

          <div className={styles.productListContainer}>
            {
                allClubProduct.map((product) => (
                  <ProductCard
                    productId={product.id}
                    clubId={product.clubId}
                    name={product.name}
                    left={product.left}
                    thumbNail={product.imagePath}
                    max={product.max}
                  />
                ))
            }
          </div>
        </section>
      </div>
    </div>
  );
}

export default RentPage;
