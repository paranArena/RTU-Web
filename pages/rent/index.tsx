import React, { useEffect, useState } from 'react';
import styles from 'styles/pages/RentPage.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { IClubProduct } from '../../globalInterface';
import { SERVER_API } from '../../config';

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
  const router = useRouter();

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

function RentPage() {
  const [allClubId, setAllClubID] = useState<number[] | null>(null);
  const [allClubProduct, setAllClubProduct] = useState<IClubProduct[]>([]);

  useEffect(() => {
    if (allClubId === null) {
      axios.get(`${SERVER_API}/clubs/search/all`, {
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
  }, []);

  useEffect(() => {
    if (allClubId !== null) {
      allClubId.forEach((id) => {
        axios.get(`${SERVER_API}/clubs/${id}/products/search/all`, {
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
          }
        }).catch((err) => {
          console.log(err);
        });
      });
    }
  }, [allClubId]);

  return (
    <div className={styles.rentPageContainer}>
      <div className={styles.rentPageInnerContainer}>
        {/*  아직 API 구현 안됨. 다음에 구현할 예정 */}
        {/* <section className={styles.rentaledListSection}> */}
        {/*  /!*  대여 목록  *!/ */}
        {/*  <div> */}
        {/*    <h3>대여목록</h3> */}
        {/*  </div> */}

        {/*  <div /> */}
        {/* </section> */}

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
              <img src="/icons/중앙정렬.png" alt="filter" />
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
