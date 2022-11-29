import React, { useEffect } from 'react';
import styles from 'styles/pages/RentalProducts.module.css';
import { KAKAO_API_KEY } from '../config';

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
          center: new window.kakao.maps.LatLng(longitude, latitude),
        };

        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(longitude, latitude);
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
