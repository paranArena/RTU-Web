import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import axios from 'axios';
import { MapComponent } from '../../../Map';
import styles from '../../../../styles/admin/coupon/CouponDetail.module.css';
import { SERVER_API } from '../../../../config';

interface IMemberItem {
  name : string;
  major : string;
  studentId : number;
  imagePath : string;
  // eslint-disable-next-line react/require-default-props
  setAddIssuedMember?: Dispatch<SetStateAction<any>>;
  type : 'add' | 'manage';
  // eslint-disable-next-line react/require-default-props
  state? : boolean;
  // eslint-disable-next-line react/require-default-props
  addIssuedMember?:number[];
  id : number;
  // eslint-disable-next-line react/require-default-props
  status? : 'unUse' | 'used';
}

function MemberItem({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  status, id, name, major, studentId, imagePath, type, setAddIssuedMember, addIssuedMember, state,
}: IMemberItem) {
  const [select, setSelect] = useState(state);

  useEffect(() => {
    if (state && addIssuedMember !== undefined) {
      if (addIssuedMember.indexOf(id) === -1) {
        setAddIssuedMember((prev) => [...prev, id]);
        setSelect(true);
      }
    }

    if (!state && addIssuedMember !== undefined) {
      if (addIssuedMember.indexOf(id) !== -1) {
        let tmp = [...addIssuedMember];
        tmp = tmp.filter((element) => element !== id);
        setAddIssuedMember(tmp);
        setSelect(false);
      }
    }
  }, [state]);

  useEffect(() => {
  }, [select]);

  return (
    <div className={styles.memberItemContainer}>
      {
        type === 'add'
          ? (
            <div className={styles.selectButtonContainer}>
              {/* eslint-disable-next-line max-len */}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <img
                onClick={() => {
                  if (addIssuedMember.indexOf(id) !== -1) {
                    // ???????????? ?????? ??????
                    let tmp = [...addIssuedMember];
                    tmp = tmp.filter((element) => element !== id);
                    setAddIssuedMember(tmp);
                    setSelect(false);
                  } else {
                    // ???????????? ?????? ?????? ??????
                    setAddIssuedMember((prev) => [...prev, id]);
                    setSelect(true);
                  }
                }}
                className={styles.selectIcon}
                src={addIssuedMember.indexOf(id) !== -1 ? '/icons/?????? ??????.png' : '/icons/?????? ?????????.png'}
                alt="select icon"
              />
            </div>
          )
          : null
      }

      <div className={styles.userProfileImgContainer}>
        <img className={styles.useProfileImg} src="/images/defaultUser.png" alt="user img" />
      </div>
      <div className={styles.memberNameNMajorContainer}>
        <h3>{name}</h3>
        <h5>
          {major}
          {studentId}
        </h5>
      </div>

      {
        type === 'manage'
          ? (
            <div className={styles.statusContainer}>
              {
                status === 'unUse' ? <span className={styles.statusUnUsedText}>?????????</span> : null
              }

              {
                status === 'used' ? <span className={styles.statusUsedText}>????????????</span> : null
              }
            </div>
          )
          : null
      }
    </div>
  );
}

interface CouponDetailProps {
  couponId : number;
  setCoupon: Dispatch<SetStateAction<any>>;
}

function CouponDetail({ couponId, setCoupon }:CouponDetailProps) {
  const [mount, setMount] = useState(0);
  const [couponDetail, setCouponDetail] = useState({
    actDate: '',
    allCouponCount: 0,
    expDate: '',
    id: 0,
    imagePath: '',
    information: '',
    leftCouponCount: 0,
    location: {
      name: '',
      latitude: 0,
      longitude: 0,
    },
    name: '',
  });

  const [selectAll, setSelectAll] = useState(false);

  const [date, setDate] = useState({
    act: new Date(),
    exp: new Date(),
  });

  const [couponMember, setCouponMember] = useState({
    manage: true,
    add: false,
  });

  const [addIssuedMember, setAddIssuedMember] = useState([]);

  // ?????? ?????? ??????
  const [memberAllList, setMemberAllList] = useState([]);

  // ?????? ????????? ??????
  const [unUseMemberList, setUnUseMemberList] = useState([]);

  // ?????? ?????? ??????
  const [useMemberList, setUseMemberList] = useState([]);

  const [showMap, setShowMap] = useState(false);

  useEffect(() => {

  }, [useMemberList, unUseMemberList, memberAllList]);

  useEffect(() => {
  }, [couponId]);

  useEffect(() => {
  }, [addIssuedMember]);

  useEffect(() => {
    if (couponId !== 0 || couponDetail.id !== 0) {
      const clubId = window.location.href.slice(window.location.href.search('=') + 1);
      const couponID = couponId !== 0 ? couponId : couponDetail.id;

      axios.get(`${SERVER_API}/clubs/${clubId}/coupons/${couponID}/couponMembers/admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            setUnUseMemberList(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      axios.get(`${SERVER_API}/clubs/${clubId}/coupons/${couponID}/histories/admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            setUseMemberList(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      if (couponMember.add) {
        axios.get(`${SERVER_API}/clubs/${clubId}/members/search/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
          .then((res) => {
            if (res.status === 200) {
              setMemberAllList(res.data.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [couponMember, couponId]);

  useEffect(() => {
  }, [selectAll]);

  useEffect(() => {
    if (mount === 0) {
      setMount(1);
    } else {
      const clubId = window.location.href.slice(window.location.href.search('=') + 1);
      axios.get(`${SERVER_API}/clubs/${clubId}/coupons/${couponId}/admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            setCouponDetail(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [mount]);

  useEffect(() => {
    setDate({
      act: new Date((couponDetail.actDate).toString().concat('Z')),
      exp: new Date((couponDetail.expDate).toString().concat('Z')),
    });
  }, [couponDetail]);

  useEffect(() => {
  }, [unUseMemberList, addIssuedMember]);

  return (
    <div className={styles.couponDetailContainer}>

      {
        showMap
        // eslint-disable-next-line max-len
          ? (
            <div className={styles.mapModalOuterContainer}>
              <div className={styles.mapModalInnerContainer}>
                <div className={styles.mapModalTopContainer}>
                  <div className={styles.titleContainer}>
                    <h1>?????? ??????</h1>
                  </div>
                  <div>
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    <img onClick={() => { setShowMap(false); }} className={styles.closeIcon} src="/icons/????????? ??????.png" alt="close" />
                  </div>
                </div>

                <div className={styles.mapContainer}>
                  <div className={styles.mapNSelectLocationNameContainer}>
                    <div className={styles.MapComponentContainer}>
                      <MapComponent
                        latitude={couponDetail.location.latitude}
                        longitude={couponDetail.location.longitude}
                      />
                    </div>
                    <div className={styles.locationNameContainer}>
                      {
                          couponDetail.location.name
                        }
                    </div>
                  </div>

                  <div className={styles.MapButtonContainer}>
                    <button onClick={() => { setShowMap(false); }} type="button" className={styles.mapSubmitButton}>??????</button>
                  </div>
                </div>
              </div>
            </div>
          )
          : null
      }
      <div className={styles.couponDetailInnerContainer}>
        <div className={styles.couponDetailInnerTitleContainer}>
          <h1>{couponDetail.name}</h1>
        </div>
        <div className={styles.couponDetailInfoContainer}>
          <div className={styles.couponDetailInfo1Container}>
            <div className={styles.couponImgContainer}>
              <img src={couponDetail.imagePath === null ? '/images/defaultImg.png' : couponDetail.imagePath} className={styles.couponImg} alt="coupon img" />
            </div>

            <div className={styles.couponInfoContainer}>
              <div className={styles.couponInfoTextContainer}>
                <h3>?????????</h3>
                <span>
                  {couponDetail.allCouponCount}
                  ???
                </span>
              </div>
              <div className={styles.couponInfoTextContainer}>
                <h3>????????? ??????</h3>
                <span>
                  {couponDetail.leftCouponCount}
                  ???
                </span>
              </div>
              <div className={styles.couponInfoTextContainer}>
                <h3>???????????? ??????</h3>
                <span>
                  {date.act.getFullYear()}
                  .
                  {date.act.getMonth() + 1}
                  .
                  {date.act.getDate()}
                  ~
                  {date.exp.getFullYear()}
                  .
                  {date.exp.getMonth() + 1}
                  .
                  {date.exp.getDate()}
                </span>
              </div>
              <div className={styles.couponInfoTextContainer}>
                <h3>???????????? ??????</h3>
                {/* eslint-disable-next-line max-len */}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <span
                  onClick={() => {
                    setShowMap(true);
                  }}
                  className={styles.cursorPointer}
                >
                  {couponDetail.location.name}
                  <img className={styles.icon} src="/icons/????????????.png" alt="location icon" />
                </span>
              </div>
            </div>
          </div>

          <div className={styles.couponDetailInfo2Container}>
            <div className={styles.couponDetailTextContainer}>
              <h1>????????????</h1>
              <span>
                {couponDetail.information}
              </span>
            </div>

            <div className={styles.couponDetailModifyButtonContainer}>
              <button
                onClick={() => {
                  setCoupon({
                    coupon: false,
                    addCoupon: false,
                    modifyCoupon: true,
                  });
                }}
                type="button"
              >
                ????????????
              </button>
            </div>
          </div>

        </div>
      </div>

      {
        couponMember.manage
          ? (
            <div className={styles.couponDetailInnerContainer}>
              <div className={styles.couponDetailInnerTitleContainer}>
                <h1>?????? ?????? ??????</h1>
                {/* eslint-disable-next-line max-len */}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <span onClick={() => {
                  setCouponMember({
                    manage: false,
                    add: true,
                  });
                }}
                >
                  <img src="/icons/????????????.png" alt="add icon" />
                  ????????????
                </span>
              </div>

              <div className={styles.memberListContainer}>
                {
                  unUseMemberList.map((member) => (
                    <MemberItem
                      name={member.memberPreviewDto.name}
                      major={member.memberPreviewDto.major}
                      studentId={member.memberPreviewDto.studentId}
                      imagePath={null}
                      type="manage"
                      id={member.memberPreviewDto.id}
                      status="unUse"
                    />
                  ))
                }

                {
                  useMemberList.map((member) => (
                    <MemberItem
                      name={member.memberPreviewDto.name}
                      major={member.memberPreviewDto.major}
                      studentId={member.memberPreviewDto.studentId}
                      imagePath={null}
                      type="manage"
                      id={member.memberPreviewDto.id}
                      status="used"
                    />
                  ))
                }
              </div>
            </div>
          )
          : null
      }

      {
        couponMember.add
          ? (
            <div className={styles.couponDetailInnerContainer}>
              <div className={styles.couponDetailInnerTitleContainer}>

                <h1>?????? ?????? ??????</h1>
                {/* eslint-disable-next-line max-len */}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <div className={styles.memberButtonTextContainer}>
                  <div className={styles.viewSelectCntContainer}>
                    <p>
                      {' '}
                      {addIssuedMember.length}
                      ??? ??????
                    </p>
                  </div>
                  <div className={styles.clickTextContainer}>
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    <p
                      onClick={() => {
                        if (addIssuedMember.length > 0) {
                          setSelectAll(false);
                          setAddIssuedMember([]);
                        } else {
                          setSelectAll(true);
                        }
                      }}
                      className={styles.memberButtonText}
                    >
                      {addIssuedMember.length > 0 ? '????????????' : '????????????'}
                    </p>
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    <p
                      onClick={() => {
                        if (addIssuedMember.length !== 0) {
                          const clubId = window.location.href.slice(window.location.href.search('=') + 1);
                          const couponID = couponDetail.id;
                          axios.post(`${SERVER_API}/clubs/${clubId}/coupons/${couponID}/admin`, {
                            memberIds: addIssuedMember,
                          }, {
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                          })
                            .then((res) => {
                              if (res.status === 200) {
                                alert('?????? ?????? ??????');
                              }
                            })
                            .catch((err) => {
                              alert(err.response.data.message);
                            });
                        }
                      }}
                      className={styles.memberButtonText}
                    >
                      ????????????
                    </p>
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    <p
                      onClick={() => {
                        setCouponMember({
                          manage: true,
                          add: false,
                        });
                      }}
                      className={styles.memberButtonText}
                    >
                      ????????????
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.memberListContainer}>
                {
                  memberAllList.map((member) => (
                    <MemberItem
                      id={member.id}
                      name={member.name}
                      major={member.major}
                      studentId={member.studentId}
                      imagePath={null}
                      type="add"
                      state={selectAll}
                      setAddIssuedMember={setAddIssuedMember}
                      addIssuedMember={addIssuedMember}
                    />
                  ))
                }
              </div>
            </div>
          )
          : null
      }

    </div>
  );
}

export default CouponDetail;
