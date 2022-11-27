import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapComponent } from '../../../Map';
import styles from '../../../../styles/admin/coupon/AddCouponTab.module.css';
import { rexDate } from '../../../../RegExp';
import { rentalLocation } from '../product';
import { SERVER_API } from '../../../../config';

interface AddCouponTabProps {
  type : 'add' | 'modify';
  // eslint-disable-next-line react/require-default-props
  couponId? : number;
}

function AddCouponTab({ type, couponId }:AddCouponTabProps) {
  const [files, setFiles] = useState([]);
  const [imgURL, setImgURL] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [mapCheck, setMapCheck] = useState(false); // map check
  const [mapIndex, setMapIndex] = useState(0);

  const [couponInfo, setCouponInfo] = useState({
    name: '',
    startDate: '',
    endDate: '',
    location: {
      locationName: '',
      latitude: 0,
      longitude: 0,
    },
    detail: '',
  });

  const [responseCouponInfo, setResponseCouponInfo] = useState({
    id: 0,
    name: '',
    information: '',
    allCouponCount: 0,
    leftCouponCount: 0,
    imagePath: '',
    location: {
      name: '',
      latitude: 0,
      longitude: 0,
    },
    actDate: '',
    expDate: '',
  });

  useEffect(() => {
  }, [responseCouponInfo]);

  useEffect(() => {
    if (type === 'modify') {
      const clubId = window.location.href.slice(window.location.href.search('=') + 1);
      axios.get(`${SERVER_API}/clubs/${clubId}/coupons/${couponId}/admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            const actDate = new Date((res.data.data.actDate).concat('Z'));
            const expDate = new Date((res.data.data.expDate).concat('Z'));
            const aDate = ((actDate.getFullYear().toString()).concat('.').concat(((actDate.getMonth() + 1).toString()).concat('.')))
              .concat((actDate.getDate()).toString());

            const eDate = ((expDate.getFullYear().toString()).concat('.').concat(((expDate.getMonth() + 1).toString()).concat('.')))
              .concat((expDate.getDate()).toString());
            setResponseCouponInfo({
              id: res.data.data.id,
              name: res.data.data.name,
              information: res.data.data.information,
              allCouponCount: res.data.data.allCouponCount,
              leftCouponCount: res.data.data.leftCouponCount,
              imagePath: res.data.data.imagePath,
              location: {
                name: res.data.data.location.name,
                latitude: res.data.data.location.latitude,
                longitude: res.data.data.location.longitude,
              },
              actDate: aDate,
              expDate: eDate,
            });

            setImgURL([res.data.data.imagePath]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const onUpdateCoupon = () => {
    const clubId = window.location.href.slice(window.location.href.search('=') + 1);
    if (files.length === 0) {
      axios({
        method: 'put',
        url: `${SERVER_API}/clubs/${clubId}/coupons/${couponId}/admin`,
        data: {
          name: responseCouponInfo.name,
          locationName: responseCouponInfo.location.name,
          latitude: responseCouponInfo.location.latitude,
          longitude: responseCouponInfo.location.longitude,
          information: responseCouponInfo.information,
          imagePath: responseCouponInfo.imagePath,
          actDate: new Date(responseCouponInfo.actDate),
          expDate: new Date(responseCouponInfo.expDate),
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            alert(res.data.responseMessage);
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const formData = new FormData();
      formData.set('image', files[0].uploadedFile);

      axios.post(`${SERVER_API}/image/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            axios({
              method: 'put',
              url: `${SERVER_API}/clubs/${clubId}/coupons/${couponId}/admin`,
              data: {
                name: responseCouponInfo.name,
                locationName: responseCouponInfo.location.name,
                latitude: responseCouponInfo.location.latitude,
                longitude: responseCouponInfo.location.longitude,
                information: responseCouponInfo.information,
                imagePath: responseCouponInfo.imagePath,
                actDate: new Date(responseCouponInfo.actDate),
                expDate: new Date(responseCouponInfo.expDate),
              },
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
              .then((response) => {
                if (response.status === 200) {
                  alert(response.data.responseMessage);
                  window.location.reload();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onCreateCouponAdmin = () => {
    const clubId = window.location.href.slice(window.location.href.search('=') + 1);

    const formData = new FormData();
    formData.set('image', files[0].uploadedFile);

    axios.post(`${SERVER_API}/image/upload`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          axios.post(`${SERVER_API}/clubs/${clubId}/coupons/admin`, {
            name: couponInfo.name,
            locationName: couponInfo.location.locationName,
            latitude: couponInfo.location.latitude,
            longitude: couponInfo.location.longitude,
            information: couponInfo.detail,
            imagePath: res.data.data,
            actDate: new Date(couponInfo.startDate),
            expDate: new Date(couponInfo.endDate),
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
            .then((response) => {
              if (response.status === 200) {
                alert('쿠폰 발행 성공');
                window.location.reload();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeLocation = (e) => {
    const locationNameTmp = e.currentTarget.value;
    for (let i = 0; i < rentalLocation.length; i += 1) {
      if (locationNameTmp.search(rentalLocation[i].text) === 0) {
        if (type === 'add') {
          setCouponInfo({
            ...couponInfo,
            location: {
              locationName: e.currentTarget.value,
              longitude: rentalLocation[i].longitude,
              latitude: rentalLocation[i].latitude,
            },
          });
          setMapIndex(i);
        } else {
          setResponseCouponInfo({
            ...responseCouponInfo,
            location: {
              name: e.currentTarget.value,
              longitude: rentalLocation[i].longitude,
              latitude: rentalLocation[i].latitude,
            },
          });
          setMapIndex(i);
        }
      }
    }
    setMapCheck(false);
  };

  const handleCouponImg = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    if (url !== undefined) {
      const arr = [];
      arr.push(url);
      setImgURL(arr);
      setFiles([...files, { uploadedFile: file }]);
    }
  };

  return (
    <div className={styles.addCouponTabContainer}>
      {
        showMap ? (
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
                    couponInfo.location.locationName
                  }
                  </div>
                </div>

                <div className={styles.MapButtonContainer}>
                  <button onClick={() => { setShowMap(false); }} type="button" className={styles.mapSubmitButton}>확인</button>
                </div>
              </div>
            </div>
          </div>
        ) : null
      }
      <div className={styles.addCouponInfoContainer}>
        <div className={styles.addCouponLeftTabContainer}>
          <div className={styles.couponTitleContainer}>
            <h1>
              {
              type === 'add'
                ? '쿠폰 등록'
                : '쿠폰 수정'
            }
            </h1>
          </div>
          <div className={styles.couponSectionContainer}>
            <div className={styles.couponSectionTitleContainer}>
              <span>쿠폰의 사진을 선택해주세요.</span>
            </div>
            <div className={styles.couponAddPictureButtonContainer}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="file-upload" className={styles.couponAddPictureButton}>
                사진 추가
                <input
                  onChange={handleCouponImg}
                  type="file"
                  id="file-upload"
                  style={{ display: 'none' }}
                />
              </label>

            </div>
            <div className={styles.couponImgContainer}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="file-upload">
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                { type === 'add' ? <img className={styles.couponImg} src={imgURL.length === 0 ? '/images/defaultImg.png' : imgURL[0]} alt="add coupon image" />
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  : <img className={styles.couponImg} src={imgURL[0] === null ? '/images/defaultImg.png' : imgURL[0]} alt="add coupon image" />}
              </label>
            </div>
          </div>

          <div className={styles.couponSectionContainer}>
            <div className={styles.couponSectionTitleContainer}><span>다음 사항을 입력해주세요.</span></div>
            <div>
              <div className={styles.addCouponInputNameLabelContainer}>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="couponName" className={styles.labelStyle}>
                  쿠폰 이름
                </label>
                { type === 'add' ? (
                  <>
                    <input
                      onChange={(event) => {
                        event.preventDefault();
                        setCouponInfo({
                          ...couponInfo,
                          name: event.currentTarget.value,
                        });
                      }}
                      id="couponName"
                      className={styles.addCouponInput}
                    />
                    <span style={couponInfo.name !== '' ? { display: 'none' } : null} className={styles.inputPlzText}>입력이 필요합니다.</span>

                  </>
                ) : (
                  <>
                    <input
                      onChange={(event) => {
                        event.preventDefault();
                        setResponseCouponInfo({
                          ...responseCouponInfo,
                          name: event.currentTarget.value,
                        });
                      }}
                      value={responseCouponInfo.name}
                      id="couponName"
                      className={styles.addCouponInput}
                    />
                    <span style={responseCouponInfo.name !== '' ? { display: 'none' } : null} className={styles.inputPlzText}>입력이 필요합니다.</span>
                  </>
                ) }

              </div>
              <div className={styles.dateOfUseInputContainer}>
                <div>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="startDateOfUse" className={styles.labelStyle}>
                    사용가능 기한
                  </label>
                  { type === 'add' ? (
                    <input
                      maxLength={10}
                      onChange={(event) => {
                        event.preventDefault();
                        if (rexDate.test(event.currentTarget.value)) {
                          setCouponInfo({
                            ...couponInfo,
                            startDate: event.currentTarget.value,
                          });
                        }
                      }}
                      id="startDateOfUse"
                      className={styles.startDateOfUseInput}
                    />
                  )
                    : (
                      <input
                        maxLength={10}
                        onChange={(event) => {
                          event.preventDefault();
                          setResponseCouponInfo({
                            ...responseCouponInfo,
                            actDate: event.currentTarget.value,
                          });
                        }}
                        value={responseCouponInfo.actDate}
                        id="startDateOfUse"
                        className={styles.startDateOfUseInput}
                      />
                    )}
                </div>
                <span>~</span>
                <div>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="endDateOfUse" className={styles.dateOfUseLabel}>
                    년, 월, 일 모두 적어주세요. ex) 2022.09.29
                  </label>
                  { type === 'add' ? (
                    <input
                      maxLength={10}
                      onChange={(event) => {
                        event.preventDefault();
                        if (rexDate.test(event.currentTarget.value)) {
                          setCouponInfo({
                            ...couponInfo,
                            endDate: event.currentTarget.value,
                          });
                        }
                      }}
                      id="endDateOfUse"
                      className={styles.endDateOfUseInput}
                    />
                  ) : (
                    <input
                      maxLength={10}
                      onChange={(event) => {
                        event.preventDefault();
                        setResponseCouponInfo({
                          ...responseCouponInfo,
                          expDate: event.currentTarget.value,
                        });
                      }}
                      id="endDateOfUse"
                      value={responseCouponInfo.expDate}
                      className={styles.endDateOfUseInput}
                    />
                  )}
                </div>
              </div>
              {
                type === 'add'
                  ? <span style={(couponInfo.startDate !== '' || couponInfo.endDate !== '') ? { display: 'none' } : null} className={styles.inputPlzText}>입력이 필요합니다.</span>
                  : <span style={(responseCouponInfo.actDate !== '' || responseCouponInfo.expDate !== '') ? { display: 'none' } : null} className={styles.inputPlzText}>입력이 필요합니다.</span>

              }
            </div>
          </div>
        </div>

        <div className={styles.sectionDevinder} />

        <div className={styles.addCouponRightTabContainer}>
          <div className={styles.couponRightInnerContainer}>
            <div className={styles.rightSectionTopContainer}>
              <div className={styles.rightSectionTopInnerContainer}>
                <span className={styles.labelStyle}>지도에서 픽업장소를 표시해주세요.</span>
                <button
                  onClick={() => {
                    if (couponInfo.location.locationName !== '' && couponInfo.location.latitude !== 0 && couponInfo.location.longitude !== 0) {
                      setShowMap(true);
                      setMapCheck(true);
                    }
                  }}
                  type="button"
                  className={mapCheck ? styles.mapCheckButton : styles.couponAddPictureButton}
                >
                  {mapCheck ? '표시 완료' : '지도에서 장소 표시'}
                </button>
              </div>
              <div className={styles.rightSectionTopInnerContainer}>
                <span
                  className={styles.labelStyle}
                >
                  상세주소를 입력해주세요.
                </span>
                {type === 'add' ? (
                  <>
                    <input
                      onChange={onChangeLocation}
                      type="text"
                      className={styles.addCouponInput}
                    />
                    <span style={couponInfo.location.locationName !== '' ? { display: 'none' } : null} className={styles.inputPlzText}>입력이 필요합니다.</span>

                  </>
                ) : (
                  <>
                    <input
                      onChange={onChangeLocation}
                      type="text"
                      value={responseCouponInfo.location.name}
                      className={styles.addCouponInput}
                    />
                    <span style={responseCouponInfo.location.name !== '' ? { display: 'none' } : null} className={styles.inputPlzText}>입력이 필요합니다.</span>

                  </>
                )}
              </div>
            </div>

            <div className={styles.rightSectionBottomContainer}>
              <h3 className={styles.blackTitle}>세부정보를 입력해주세요.</h3>
              {type === 'add' ? (
                <>
                  <textarea
                    onChange={(e) => {
                      e.preventDefault();
                      setCouponInfo({
                        ...couponInfo,
                        detail: e.currentTarget.value,
                      });
                    }}
                    className={styles.textArea}
                  />
                  <span className={styles.inputPlzText}>{couponInfo.detail !== '' ? null : '입력이 필요합니다.' }</span>
                </>
              ) : (
                <>
                  <textarea
                    onChange={(e) => {
                      e.preventDefault();
                      setResponseCouponInfo({
                        ...responseCouponInfo,
                        information: e.currentTarget.value,
                      });
                    }}
                    value={responseCouponInfo.information}
                    className={styles.textArea}
                  />
                  <span className={styles.inputPlzText}>{responseCouponInfo.information !== '' ? null : '입력이 필요합니다.' }</span>
                </>
              )}

            </div>
          </div>
        </div>
      </div>
      <div className={styles.couponAddSubmitButtonContainer}>
        { type === 'add' ? (
          <button
            type="button"
            onClick={couponInfo.startDate !== '' && couponInfo.endDate !== '' && couponInfo.name !== '' && couponInfo.detail !== '' && couponInfo.location.locationName !== '' && couponInfo.location.longitude !== 0 && couponInfo.location.latitude !== 0
              ? onCreateCouponAdmin : () => {}}
            className={
            couponInfo.startDate !== '' && couponInfo.endDate !== '' && couponInfo.name !== '' && couponInfo.detail !== '' && couponInfo.location.locationName !== '' && couponInfo.location.longitude !== 0 && couponInfo.location.latitude !== 0
              ? styles.couponAddSubmitButtonActive : styles.couponAddSubmitButton
}
          >
            등록
          </button>
        ) : (
          <button
            type="button"
            onClick={responseCouponInfo.actDate !== '' && responseCouponInfo.expDate !== '' && responseCouponInfo.name !== '' && responseCouponInfo.information !== '' && responseCouponInfo.location.name !== '' && responseCouponInfo.location.longitude !== 0 && responseCouponInfo.location.latitude !== 0
              ? onUpdateCoupon : () => {}}
            className={
              responseCouponInfo.actDate !== '' && responseCouponInfo.expDate !== '' && responseCouponInfo.name !== '' && responseCouponInfo.information !== '' && responseCouponInfo.location.name !== '' && responseCouponInfo.location.longitude !== 0 && responseCouponInfo.location.latitude !== 0
                ? styles.couponAddSubmitButtonActive : styles.couponAddSubmitButton
            }
          >
            수정
          </button>
        )}
      </div>
    </div>
  );
}

export default AddCouponTab;
