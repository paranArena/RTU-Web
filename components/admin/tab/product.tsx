import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import styles from 'styles/admin/product.module.css';
import axios from 'axios';
import { SERVER_API } from '../../../config';
import { MapComponent } from '../../../pages/rent/products';

interface ITab {
  reserve: boolean;
  rental: boolean;
  return: boolean;
}

const TabDefault:ITab = {
  reserve: true,
  rental: false,
  return: false,
};

interface ProductManageModalProps {
  clubId : string;
}

interface IProduct {
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
  // eslint-disable-next-line react/no-unused-prop-types
  rentalPolicy : 'FIFO' | 'RESERVE';
  // eslint-disable-next-line react/no-unused-prop-types
  memberName : string;
  // eslint-disable-next-line react/no-unused-prop-types
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
}

function ClubProductItem({
  imagePath, name, max, setShowAddProduct, setClickItemId, itemId,
}:ClubProductItemProps) {
  // const [onOff, setOnOff] = useState(true);

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
            <span className={styles.quantityRound2}>0</span>
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
          <span>렌탈</span>
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
  const resultM = ((pickup.getTime() - current.getTime()) / (1000 * 60));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const resultS = ((pickup.getTime() - current.getTime()) / (1000));

  let M = Number(resultM.toString().slice(0, resultM.toString().search('.') + 1));
  let S = Number(resultM.toString().slice(resultM.toString().search('.') + 2).slice(0, 2));
  console.log('M : ', M);
  console.log('S : ', S);
  if (S / 60 >= 1) {
    M += 1;
    S -= 60;
  }

  console.log('M : ', M);
  console.log('S : ', S);

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
            {
              M.toString().concat(' : ').concat(S.toString())
            }
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
  price : number;
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
  price: 0,
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

  const rentalLocation = [
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
      key: 7, text: '중앙도서관', latitude: 127.0441154519935, longitude: 37.28182601788163,
    },
    {
      key: 8, text: '다산관', latitude: 127.0477894351656, longitude: 37.28301171091047,
    },
    {
      key: 9, text: '율곡관', latitude: 127.04632865694208, longitude: 37.282223882292996,
    },
    {
      key: 10, text: '일신관', latitude: 127.04699244720311, longitude: 37.284327547055774,
    },
    {
      key: 11, text: '광교관', latitude: 127.04652517394291, longitude: 37.285474303640235,
    },
    {
      key: 12, text: '남제관', latitude: 127.04583925992465, longitude: 37.284073455720765,
    },
    {
      key: 13, text: '연암관', latitude: 127.04762543753087, longitude: 37.28223463065516,
    },
    {
      key: 14, text: '홍재관', latitude: 127.04779700355395, longitude: 37.281606086555804,
    },
    {
      key: 15, text: '송재관', latitude: 127.04713969712915, longitude: 37.2808562347841,
    },
    {
      key: 16, text: '텔레토비동산', latitude: 127.04563998294971, longitude: 37.28086583289586,
    },
    {
      key: 17, text: '체육관', latitude: 127.04538573803057, longitude: 37.27997840665075,
    },
    {
      key: 18, text: '서관', latitude: 127.04254630177627, longitude: 37.283718774671826,
    },
    {
      key: 19, text: '동관', latitude: 127.04367402616057, longitude: 37.28384450943755,
    },
    {
      key: 20, text: '원천정보관', latitude: 127.0437414663352, longitude: 37.28346604811299,
    },
    {
      key: 21, text: '원천관', latitude: 127.04332677170262, longitude: 37.28297062908177,
    },
    {
      key: 22, text: '국제학사', latitude: 127.04725490433565, longitude: 37.28476895165975,
    },
    {
      key: 23, text: '제1학생회관', latitude: 127.04542176834845, longitude: 37.28364337050268,
    },
    {
      key: 24, text: '제2학생회관', latitude: 127.04597130194553, longitude: 37.283321036875265,
    },
    {
      key: 25, text: '성호관', latitude: 127.0451816942208, longitude: 37.28289334728198,
    },
    {
      key: 26, text: '팔달관', latitude: 127.04435375458354, longitude: 37.28438488011573,
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

  useEffect(() => {
    console.log('MODIFY');
    console.log(ModalType === 'modify');

    if (ModalType === 'modify') {
      const clubId = window.location.search.slice(window.location.search.search('=') + 1);
      axios.get(`${SERVER_API}/clubs/${clubId}/products/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(async (res) => {
          console.log('res.data.data : ', res.data.data);
          setModiProduct(res.data.data);
          console.log('product ', modiProduct);
        }).catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    console.log('uE modi : ', modiProduct);
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

      console.log('uE modi Product : ', product);
    }
  }, [modiProduct]);

  const [mapIndex, setMapIndex] = useState(0);
  const [submitActive, setSubmitActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [url, setUrl] = useState('');

  const onChangeLocation = (e) => {
    console.log('dsd', e.currentTarget.value);
    setProduct({ ...product, locationName: e.currentTarget.value });
    if (product.locationName !== '') {
      // eslint-disable-next-line no-plusplus
      const locationNameTmp = e.currentTarget.value;
      console.log(locationNameTmp);
      for (let i = 0; i < rentalLocation.length; i += 1) {
        if (locationNameTmp.search(rentalLocation[i].text) === 0) {
          setProduct({
            // eslint-disable-next-line max-len
            ...product, locationName: e.currentTarget.value, longitude: rentalLocation[i].longitude, latitude: rentalLocation[i].latitude,
          });
          setMapIndex(i);
          console.log('for : ', product.locationName);
        }
      }
    }
  };

  // imageURL to Blob
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
    console.log(product);
    console.log(files);

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
    console.log('files', files);
    files.forEach((file) => {
      console.log('file :', file);
      data.append('image', file.uploadedFile);
    });

    // data.append('image', []);

    // data.append('image', null);

    if (modiProduct === undefined) {
      axios.post(`${SERVER_API}/clubs/${clubId}/products`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        console.log(res);
        window.location.reload();
      }).catch((err) => {
        console.log(err);
      });
    } else {
      console.log('물품 수');
      // TODO :: 물품 수정 axios

      // @ts-ignore
      const imgFile = await convertURLtoFile(modiProduct.imagePath);
      data.append('image', imgFile);
      axios.put(`${SERVER_API}/clubs/${clubId}/products/${itemId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        console.log(res);
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

    console.log(Url);

    console.log('file', files);
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
    console.log('uE : ', product);
  }, [product]);

  useEffect(() => { console.log('showMap : ', showMap); }, [showMap]);

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
                        <input value={product.price} onChange={(e) => { setProduct({ ...product, price: Number(e.currentTarget.value) }); }} className={styles.inputStyle} type="number" />
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
                  <li
                    onClick={(e) => { setProduct({ ...product, category: e.currentTarget.innerHTML }); }}
                    className={product.category === '가전제품' ? styles.categoryFirstSelect : styles.categoryFirst}
                  >
                    가전제품
                  </li>
                  {
                    category.map((item) => (

                      // eslint-disable-next-line max-len
                      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                      <li
                        onClick={(e) => { setProduct({ ...product, category: e.currentTarget.innerHTML }); }}
                        className={product.category === item ? styles.categorySelect : styles.category}
                      >
                        {item}
                      </li>
                    ))
                  }
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                  <li
                    onClick={(e) => { setProduct({ ...product, category: e.currentTarget.innerHTML }); }}
                    className={product.category === '기타' ? styles.categoryLastSelect : styles.categoryLast}
                  >
                    기타
                  </li>
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
          <button onClick={onClickProductSubmit} className={submitActive ? styles.submitButtonActive : styles.submitButtonUnActive} type="submit">등록</button>
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

function ProductManageModal({ clubId }:ProductManageModalProps) {
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
  const [returnList, setReturnList] = useState<IReserveList[]>([]);

  // 클럽에 등록된 모든 물품

  useEffect(() => {
    axios.get(`${SERVER_API}/clubs/${clubId}/products/search/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        console.log('All : ', res.data.data);
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
          console.log('All : ', res.data.data);
          setReserveList(res.data.data);
          console.log('reserve : ', reserveList);
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
          console.log('All : ', res.data.data);
          setReturnList(res.data.data);
          console.log('return : ', returnList);
        }
      }).catch((err) => {
        console.log(err);
      });
    } else {
    //  rental server 요청
    }

    console.log('rental : ', rentalList);
  }, [tab]);

  useEffect(() => {

  }, [showAddProduct]);

  useEffect(() => {

  }, [clickedItem]);

  console.log(reserveList);

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
                productList.map((item) => {
                  console.log('item : ', item);
                  return (
                  // eslint-disable-next-line max-len
                    <ClubProductItem setClickItemId={setClickedItem} itemId={item.id} setShowAddProduct={setShowAddProduct} max={item.max} name={item.name} imagePath={item.imagePath} />
                  );
                })
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductManageModal;
