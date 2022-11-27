import React, { useEffect } from 'react';
import styles from 'styles/pages/RentalProducts.module.css';
import { KAKAO_API_KEY } from '../config';
import { Location } from '../globalInterface';

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
