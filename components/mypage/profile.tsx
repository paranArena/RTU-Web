import React, { useEffect, useState } from 'react';
import styles from 'styles/mypage/profile.module.css';
import axios from 'axios';
import router from 'next/router';
import { SERVER_API } from '../../config';
// eslint-disable-next-line import/no-cycle
import { defaultUserInfo, IUserInfo } from '../../pages/mypage';

interface RentalStateInProfileModalProps {
  name : string;
  rentalInfo :{
    expDate : string;
    meRental : boolean;
    rentDate : string;
    rentalStatus : 'RENT' | 'RETURN' | 'WAIT';
  };
}

interface IRentalInfo {
  clubId : number;
  clubName : string;
  id : number;
  imagePath : string;
  location : {
    latitude : number;
    longitude : number;
    name : string;
  };
  numbering : number;
  name : string;
  rentalInfo :{
    expDate : string;
    meRental : boolean;
    rentDate : string;
    rentalStatus : 'RENT' | 'RETURN' | 'WAIT';
  };
  rentalPolicy : 'FIFO' | 'RESERVE';
}

function RentalStateInProfileModal(
  {
    name,
    rentalInfo,
  } : RentalStateInProfileModalProps,
) {
  let ExpDate = '';
  const rentDate = new Date(rentalInfo.rentDate.concat('z'));
  if (rentalInfo.expDate !== null) {
    const expDate = new Date(rentalInfo.expDate.concat('z'));
    ExpDate = expDate.getFullYear().toString().concat('.').concat((expDate.getMonth() + 1).toString().concat('.').concat(expDate.getDate().toString()));
  }
  const RentDate = rentDate.getFullYear().toString().concat('.').concat((rentDate.getMonth() + 1).toString().concat('.').concat(rentDate.getDate().toString()));

  return (
    <div className={styles.RentalStateInProfileModalContainer}>
      <div className={styles.RentalInProfileModalInnerContainer}>
        <div className={styles.RentalStateNameNDateContainer}>
          <span className={styles.profileUserBlackText}>
            {name}
          </span>
          <span className={styles.profileModalGrayText}>
            {RentDate.concat(' ~ ').concat(ExpDate)}
          </span>
        </div>
      </div>
      <div className={styles.RentalStateContainer}>
        <span className={styles.profileUserBlackText}>
          {
              // eslint-disable-next-line no-nested-ternary
                rentalInfo.rentalStatus === 'WAIT'
                  ? '?????? ???'
                  : rentalInfo.rentalStatus === 'RENT'
                    ? '?????? ???'
                    : '????????????'
            }
        </span>
      </div>
    </div>
  );
}

function ProfileModal() {
  const [userInfo, setUserInfo] = useState<IUserInfo>(defaultUserInfo);
  const [userRentalInfo, setUserRentalInfo] = useState<IRentalInfo[]>([]);
  const [showQuitAlert, setShowQuitAlert] = useState(false);

  // const [totalRent, setTotalRent] = useState(0);

  const EventQuitService = (e :React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setShowQuitAlert(true);
    // localStorage.removeItem('token');
    // router.push('/');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const EventQuitOKButton = (e:React.MouseEvent<HTMLButtonElement>) => {
    axios.get(`${SERVER_API}/members/my/quit`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          alert('?????? ??????');
          localStorage.removeItem('token');
          router.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.code === 'CLUB_OWNER_CANT_QUIT') {
          alert(err.response.data.message);
        }
      });
  };

  useEffect(() => {
    axios.get(`${SERVER_API}/members/my/info`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setUserInfo(res.data.data);
        }
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get(`${SERVER_API}/members/my/rentals`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        setUserRentalInfo(res.data.data);
        // setTotalRent(res.data.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userInfo]);

  return (
    <div className={styles.profileModalTabContainer}>

      {
            showQuitAlert
              ? (
                <div className={styles.QuitAlertContainer}>
                  <div className={styles.closeButtonContainer}>
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */}
                    <img onClick={() => { setShowQuitAlert(false); }} className={styles.closeIcon} src="/icons/????????? ??????.png" alt="close" />
                  </div>

                  <div className={styles.AlertTextNButtonContainer}>
                    <div className={styles.AlertTextContainer}>
                      <span className={styles.AlertText}>??????????????????????</span>
                    </div>
                    <div className={styles.AlertButtonContainer}>
                      <button onClick={EventQuitOKButton} className={styles.buttonBgBStyle} type="submit">???</button>
                      <button onClick={() => { setShowQuitAlert(false); }} className={styles.buttonBgWStyle} type="button">?????????</button>
                    </div>
                  </div>
                </div>
              )
              : null
        }
      <div className={styles.profileModalOuterContainer}>
        <div className={styles.profileModalInnerContainer}>
          <div className={styles.profileModalTitleContainer}>
            <h1>????????? ??????</h1>
          </div>

          <div className={styles.profileModalSectionContainer}>
            <section className={styles.profileModalLeftSection}>
              {/*    ??????      */}
              <div className={styles.userProfileImgContainer}>
                <img className={styles.profileImgStyles} src="/images/defaultUser.png" alt="profile" />
              </div>

              <div className={styles.profileModalUserTextInfoOuterContainer}>
                <div className={styles.profileModalUserStudentIntoContainer}>
                  <span className={styles.profileModalUserMajorText}>{userInfo.major}</span>
                  <span className={styles.profileModalUserNameText}>{userInfo.name}</span>
                </div>

                <div className={styles.profileUserRentalHistoryContainer}>

                  {/* <div className={styles.profileUserRentalHistoryCountContainer}> */}
                  {/*  <span className={styles.profileModalCountText}>{totlaRent}</span> */}
                  {/*  <span className={styles.profileModalGrayText}>??? ????????????</span> */}
                  {/* </div> */}

                  {/* <div className={styles.profileUserRentalHistoryReturnCountContainer}> */}
                  {/*  <span className={styles.profileModalCountText}>50</span> */}
                  {/*  <span className={styles.profileModalGrayText}>???????????????</span> */}
                  {/* </div> */}

                </div>

                <div className={styles.profileModalUserIdNPhoneNumberContainer}>

                  <div className={styles.profileUserModalIDContainer}>
                    <span className={styles.profileModalGrayText}>ID</span>
                    <span className={styles.profileUserBlackText}>{userInfo.email}</span>
                  </div>

                  <div className={styles.profileUserModalPhoneNumberContainer}>
                    <span className={styles.profileModalGrayText}>????????? ??????</span>
                    <span className={styles.profileUserBlackText}>{userInfo.phoneNumber}</span>
                  </div>

                </div>
              </div>

            </section>

            <section className={styles.profileModalRightSection}>
              {/*    ?????????      */}
              <div className={styles.profileModalRightSectionInnerContainer}>
                <div className={styles.profileModalRentalStateContainer}>
                  <div className={styles.profileModalRentalTitleContainer}>
                    <span className={styles.profileModalGrayText}>????????????</span>
                  </div>
                  <div className={styles.profileModalRentalStateInnerContainer}>
                    {
                          userRentalInfo.map((item) => (
                            // eslint-disable-next-line max-len
                            <RentalStateInProfileModal name={item.name} rentalInfo={item.rentalInfo} />
                          ))
                      }
                  </div>
                </div>
                <div className={styles.profileModalSecessionContainer}>
                  {/* eslint-disable-next-line max-len */}
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,max-len */}
                  <span onClick={EventQuitService} className={styles.quitText}>????????????</span>
                </div>

              </div>

            </section>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
