import React, {
  Dispatch, SetStateAction, useEffect, useRef, useState,
} from 'react';
import styles from 'styles/pages/AdminPage.module.css';
import stylesModal from 'styles/group/AddGroupModal.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SERVER_API } from '../../config';
import { ClubDataModal } from '../../globalInterface';
import { ParseTag } from '../../components/group/AddGroupModal';
import Notice from '../../components/admin/tab/notice';
import MemberManageTab from '../../components/admin/tab/member';
import AlertModal from '../../components/common/AlertModal';
import ProductManageModal from '../../components/admin/tab/product';
import AdminRentalModal from '../../components/admin/tab/AdminRentalModal';
import AdminManageTab from '../../components/admin/tab/AdminManageTab';
import ClubMemberItem from '../../components/admin/dashboard/ClubMemberItem';
import NotificationItem from '../../components/admin/dashboard/NotificationItem';
import RentalStatusChart from '../../components/admin/dashboard/RentalStatusChart';
import CouponTab from '../../components/admin/tab/coupon/CouponTab';
import AddMember from '../../components/admin/dashboard/AddMember';

interface IClubProfileSettingModal {
  id : string;
  clubData : ClubDataModal;
  setClubData : Dispatch<SetStateAction<ClubDataModal>>
}

function stringToTag(tagList : string[]) {
  let result = '';
  const shap = '#';
  tagList.forEach((item) => {
    result = result.concat(shap);
    result = result.concat(item);
    result = result.concat(' ');
  });

  return result;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ClubProfileSettingModal({ clubData, setClubData, id }:IClubProfileSettingModal) {
  const [active, setActive] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [settingClubData, setSettingClubData] = useState<ClubDataModal>(clubData);
  const [hashTag, setHashTag] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [name, setName] = useState('');

  // ?????? ????????? ????????? ????????? ?????????
  const [imgSrc, setImgSrc] = useState<string>('');
  const [imgData, setImgData] = useState<any>(null);

  // ???????????? ????????? ?????? ??????/??????/?????? ???????????? ?????? useRef
  const groupNameRef = useRef();
  const groupIntroRef = useRef();
  const groupTagRef = useRef();
  const imgRef = useRef();

  // ?????? ???????????? ???
  useEffect(() => {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line max-len
    if (groupNameRef.current !== undefined && groupIntroRef.current !== undefined && groupTagRef.current !== undefined) {
      // @ts-ignore
      groupNameRef.current.value = settingClubData.name;
      setName(settingClubData.name);

      // @ts-ignore
      groupIntroRef.current.value = settingClubData.introduction;
      setIntroduction(settingClubData.introduction);

      // @ts-ignore
      imgRef.current.src = settingClubData.thumbnailPath;

      if (Array.isArray(settingClubData.hashtags) && settingClubData.hashtags.length > 0) {
        // @ts-ignore
        groupTagRef.current.value = stringToTag(settingClubData.hashtags);
      }
    }
  }, []);

  useEffect(() => {
    if (settingClubData.name !== '' && settingClubData.introduction !== '') {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [settingClubData, active]);

  const onChangeGroupTag = (e) => {
    e.preventDefault();
    // ????????? ???????????? ????????? 36 ????????? setHashtag
    // ????????? ???????????? ????????? 36??? ????????? e.currentTarget.value = hashtag;
    if (e.currentTarget.value.length <= 36) {
      setHashTag(e.currentTarget.value);
    } else {
      e.currentTarget.value = hashTag;
    }
  };

  const onClickSettingButton = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data = new FormData();
    if (name !== clubData.name) {
      data.append('name', name);
    } else {
      data.append('name', clubData.name);
    }

    data.append('introduction', introduction);

    if (hashTag !== '') {
      const hashTagArr = ParseTag(hashTag);
      hashTagArr.forEach((tag) => {
        data.append('hashtags', tag);
      });
    } else {
      clubData.hashtags.forEach((tag) => {
        data.append('hashtags', tag);
      });
    }

    // if (imgData === null) {
    //   data.append('thumbnail', null);
    // } else {
    if (imgData !== null) {
      data.append('thumbnail', imgData);
    } else {
      data.append('thumbnail', null);
    }
    // }

    axios.put(`${SERVER_API}/clubs/${id}/info`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        if (res.status === 200) {
          alert('?????? ????????? ?????? ??????');
          // window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // eslint-disable-next-line consistent-return
  const onChangeImg = (e) => {
    if (e.target.files.length > 0) {
      const objectUrl = URL.createObjectURL(e.target.files[0]);
      setImgSrc(objectUrl);
      setImgData(e.target.files[0]);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setImgSrc('/images/defaultImg.png');
    setImgData(null);
  };

  return (
    <div className={styles.modalContainer}>
      <span className={styles.modalTitle}>????????? ??????</span>
      <div className={styles.modalContentContainer}>
        <div className={styles.modalLeftOuterContainer}>

          <div className={styles.imageUploaderContainer}>
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img
              ref={imgRef}
              className={stylesModal.groupImage}
              src={imgSrc === ''
                ? '/images/defaultImg.png'
                : imgSrc}
              alt="group presentative image"
            />

            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              className={styles.uploadText}
              htmlFor="file-upload"
            >
              ?????? ??????
            </label>
            <input
              id="file-upload"
              style={{ display: 'none' }}
              type="file"
              onChange={onChangeImg}
            />
          </div>

          <div className={styles.tagInputContainer}>
            <span className={styles.modalText}>??????</span>
            <input ref={groupTagRef} id="groupTags" onChange={onChangeGroupTag} className={stylesModal.inputLineTag} type="text" />
            <span
              className={stylesModal.explainText}
            >
              #??? ??????????????? ????????? ?????? 36???????????? ???????????????.
            </span>
          </div>

        </div>

        <div className={stylesModal.modalContentTwo}>

          <div className={stylesModal.groupNameContainer}>
            <span className={styles.modalText}>?????? ??????</span>
            <input ref={groupNameRef} id="groupName" onChange={(e) => { setName(e.currentTarget.value); }} className={stylesModal.inputLineGroupName} type="text" />
          </div>

          <div className={stylesModal.introduceContainer}>
            <span className={styles.modalText}>?????????</span>
            <textarea
              ref={groupIntroRef}
              id="groupIntroduce"
              onChange={(e) => {
                if (e.currentTarget.value.length <= 130) {
                  setIntroduction(e.currentTarget.value);
                } else {
                  e.currentTarget.value = settingClubData.introduction;
                }
              }}
              className={stylesModal.inputBoxIntro}
            />
            <span className={stylesModal.explainText}>???????????? ?????? 130???????????? ???????????????.</span>
          </div>

        </div>

      </div>
      <button type="submit" onClick={onClickSettingButton} className={active ? styles.active : styles.unActive}>??????</button>
    </div>
  );
}

// DashBoard
function DashBoard() {
  const [mount, setMount] = useState(0);
  const [memberList, setMemberList] = useState([]);
  const [noticeList, setNoticeList] = useState([]);
  const [viewAddMember, setViewAddMember] = useState(false);

  useEffect(() => {
    if (mount === 0) {
      setMount(1);
    } else {
      const clubId = window.location.href.slice((window.location.href.search('=') + 1));
      axios.get(`${SERVER_API}/clubs/${clubId}/members/search/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          setMemberList(res.data.data);

          axios.get(`${SERVER_API}/clubs/${clubId}/notifications/search/all`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
            .then((response) => {
              let tmpArr = response.data.data;
              tmpArr = tmpArr.sort((a, b) => {
                const A = new Date(a.updatedAt);
                const B = new Date(b.updatedAt);
                // @ts-ignore
                return B - A;
              });
              setNoticeList(tmpArr);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [mount]);

  const onClickAddMember: () => void = () => {
    setViewAddMember(true);
  };

  return (
    <div className={styles.tabViewOuterContainer}>
      {
        viewAddMember ? <AddMember setViewAddMember={setViewAddMember} /> : null
      }
      <div className={styles.dashBoardContainer}>
        <div className={styles.sectionContainer}>
          {/* ????????? ?????? */}
          <section className={styles.section}>
            <div className={styles.titleContainer}>
              <h1 className={styles.sectionTitle}>
                ????????? ??????
              </h1>
            </div>

            <div>
              {/* ????????? ?????? ?????? ????????? */}
            </div>

          </section>
        </div>

        <div className={styles.sectionContainer}>
          {/* ????????? ?????? & ???????????? */}
          <section className={styles.section_h_50}>
            {/*  ????????? ?????? */}
            <div className={styles.titleContainer}>
              <h1 className={styles.sectionTitle}>
                ????????? ??????
              </h1>

              <div>
                {/* ?????? ?????? ????????? */}
              </div>

            </div>

          </section>

          <section className={styles.section_h_50}>
            {/* ???????????? */}
            <div className={styles.titleContainer}>
              <h1 className={styles.sectionTitle}>
                ????????????
              </h1>
              <img className={styles.memberAddIcon} alt="member add" src="/icons/????????????.png" />
            </div>
            <div className={styles.noticeTabListContainer}>
              {/* ???????????? ????????? */}
              {
                noticeList.map((notice) => <NotificationItem notification={notice} />)
              }
            </div>
          </section>
        </div>

        <div className={styles.sectionContainer}>
          {/* ?????? ?????? & ???????????? */}
          <section className={styles.section_h_50}>
            {/* ?????? ?????? */}
            <div className={styles.titleContainer}>
              <h1 className={styles.sectionTitle}>
                ????????????
              </h1>
            </div>

            <div>
              {/* ?????? ?????? ????????? */}
              <RentalStatusChart />
            </div>
          </section>
          <section className={styles.section_h_50}>
            {/* ???????????? */}
            <div className={styles.titleContainer}>
              <h1 className={styles.sectionTitle}>
                ?????? ??????
              </h1>
              {/* eslint-disable-next-line max-len */}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <img onClick={onClickAddMember} className={styles.memberAddIcon} alt="member add" src="/icons/????????????.png" />
            </div>

            <div className={styles.memberListCardContainer}>
              {/* ?????? ????????? */}
              {
                memberList.map((member) => <ClubMemberItem member={member} />)
              }
            </div>
          </section>
        </div>

        <div className={styles.sectionContainer}>
          <section className={styles.section}>
            {/* ?????? */}
            <div className={styles.titleContainer}>
              <h1 className={styles.sectionTitle}>
                ??????
              </h1>
            </div>

            <div>
              {/* ?????? ????????? */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// ProfileSetting
function ProfileSetting() {
  const router = useRouter();
  const [clubData, setClubData] = useState<ClubDataModal | null>(null);
  const clubId = router.query.id;

  // ???????????? ??? ?????? ????????? ????????????
  useEffect(() => {
    if (clubId !== undefined) {
      axios.get(`${SERVER_API}/clubs/${clubId}/info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          if (res.status === 200 && res.data.data !== undefined) {
            setClubData(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // ?????? ????????? ???????????? ????????? ?????? ???????????? ????????? ?????? modal ????????? ?????? ??????
  useEffect(() => {

  }, [clubData]);

  return (
    <div className={styles.tabViewOuterContainer}>
      <div className={styles.profileSettingContainer}>
        {
          clubData !== null
          // eslint-disable-next-line max-len
            ? <ClubProfileSettingModal id={clubId as string} clubData={clubData} setClubData={setClubData} />
            : null
        }
      </div>
    </div>

  );
}

interface IMenuTabState {
  dashBoard: boolean;
  profileSetting: boolean;
  rentalItemManage: boolean;
  notice: boolean;
  HR: boolean;
  event: boolean;
  rentalActive: boolean;
  admin : boolean;
  coupon : boolean;
}

const menuDefault:IMenuTabState = {
  dashBoard: false,
  profileSetting: false,
  rentalItemManage: false,
  notice: false,
  HR: false,
  event: false,
  rentalActive: false,
  admin: false,
  coupon: false,
};

function AdminPage() {
  const [menu, setMenu] = useState<IMenuTabState>({ ...menuDefault, rentalItemManage: true });
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [clubId, setClubId] = useState('');
  // OWNER?????? ADMIN?????? ???????????? ??????
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [myRole, setMyrole] = useState('');

  // ???????????? ???????????? ?????? ?????????
  const [viewAdminRental, setViewAdminRental] = useState({
    view: false,
    productId: 0,
  });

  const onClickMenu = (e : React.MouseEvent<HTMLHeadingElement>) => {
    e.preventDefault();
    if (e.currentTarget.id === 'dashBoard') {
      setMenu({ ...menuDefault, dashBoard: true });
    } else if (e.currentTarget.id === 'profileSetting') {
      setMenu({ ...menuDefault, profileSetting: true });
    } else if (e.currentTarget.id === 'rentalItemManage') {
      setMenu({ ...menuDefault, rentalItemManage: true });
    } else if (e.currentTarget.id === 'notice') {
      setMenu({ ...menuDefault, notice: true });
    } else if (e.currentTarget.id === 'HR') {
      setMenu({ ...menuDefault, HR: true });
    } else if (e.currentTarget.id === 'event') {
      setMenu({ ...menuDefault, event: true });
    } else if (e.currentTarget.id === 'rentalActive') {
      setMenu({ ...menuDefault, rentalActive: true });
    } else if (e.currentTarget.id === 'admin') {
      setMenu({ ...menuDefault, admin: true });
    } else if (e.currentTarget.id === 'coupon') {
      setMenu({ ...menuDefault, coupon: true });
    }
  };

  useEffect(() => {
    const url = window.location.search;
    setClubId(url.slice(url.search('=') + 1));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    clubId && axios.get(
      `${SERVER_API}/members/my/clubs/${clubId}/role`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    ).then((res) => {
      setMyrole(res.data.clubRole);
    }).catch((err) => {
      console.log(err);
    });
  }, [clubId]);

  const onClickDeleteClub = (e : React.MouseEvent) => {
    e.preventDefault();

    axios(
      {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        url: `${SERVER_API}/clubs/${clubId}`,
      },
    ).then((res) => {
      if (res.status === 200) {
        setShowDeleteAlert(false);
        alert('????????? ??????????????? ?????????????????????.');
        window.location.assign('/main');
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {

  }, [menu]);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.topTitleContainer}>
          <h1>Ren2U</h1>
          <h3>????????? ??????</h3>
        </div>

        <div className={styles.menuTabContainer}>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="dashBoard"
            onClick={onClickMenu}
            className={menu.dashBoard ? styles.current : styles.disabled}
          >
            ????????????
          </h4>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="profileSetting"
            onClick={onClickMenu}
            className={menu.profileSetting ? styles.current : styles.disabled}
          >
            ????????? ??????
          </h4>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="rentalItemManage"
            onClick={onClickMenu}
            className={menu.rentalItemManage ? styles.current : styles.disabled}
          >
            ??????/?????? ??????
          </h4>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="notice"
            onClick={onClickMenu}
            className={menu.notice ? styles.current : styles.disabled}
          >
            ????????????
          </h4>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="HR"
            onClick={onClickMenu}
            className={menu.HR ? styles.current : styles.disabled}
          >
            ?????? ??????
          </h4>

          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="admin"
            onClick={onClickMenu}
            className={menu.admin ? styles.current : styles.disabled}
          >
            ?????? ????????? ??????
          </h4>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="coupon"
            onClick={onClickMenu}
            className={menu.coupon ? styles.current : styles.disabled}
          >
            ?????? ??????
          </h4>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          {/* <h4 */}
          {/*  id="event" */}
          {/*  onClick={onClickMenu} */}
          {/*  className={menu.event ? styles.current : styles.disabled} */}
          {/* > */}
          {/*  ????????? ?????? */}
          {/* </h4> */}
          <div>
            {/* eslint-disable-next-line max-len */}
            {/* <h4 className={menu.rentalActive ? styles.current : styles.disabled}>???????????? ?????????</h4> */}
            {/*
                // TODO Toggle Button ?????? ??????
               https://velog.io/@whljm1003/React-toggle-switch-%EA%B8%B0%EB%8A%A5 */}
          </div>

          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            onClick={() => {
              setShowDeleteAlert(true);
            }}
            className={styles.clubDeleteButton}
          >
            {' '}
            ?????? ??????
          </h4>

          { showDeleteAlert ? <AlertModal type="alert" top={30} titleText="????????? ?????????????????????????" contentText="??? ??? ???????????? ????????? ??????????????????. ?????? ?????????????????????????" onClickEvent={() => { setShowDeleteAlert(false); }} button onClickButtonEvent={onClickDeleteClub} /> : null}

          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div
            onClick={() => {
              window.history.back();
            }}
            className={styles.closeButtonContainer}
          >
            <img src="/icons/????????? ??????.png" alt="????????? ????????? ????????? ??????" />
            <h4 className={styles.closeButton}>?????????</h4>
          </div>
        </div>
      </div>

      <div className={styles.rightOuterContainer}>
        <div className={styles.rightInnerContainer}>
          {
            viewAdminRental.view
            // eslint-disable-next-line max-len
              ? <AdminRentalModal viewAdminRental={viewAdminRental} setViewAdminRental={setViewAdminRental} />
              : null
          }
          {/* TODO:: DashBoard */}
          {
            menu.dashBoard
              ? (
                <DashBoard />
              )
            // <DashBoard />
              : null
          }
          {
            menu.profileSetting
              ? <ProfileSetting />
              : null
          }
          {
            menu.notice
              ? <Notice />
              : null
          }
          {
            menu.HR
              ? <MemberManageTab clubId={clubId} />
              : null
          }
          {
            menu.event
              ? <div>?????????</div>
              : null
          }

          {
            menu.rentalItemManage
            // eslint-disable-next-line max-len
              ? <ProductManageModal viewAdminRental={viewAdminRental} setViewAdminRental={setViewAdminRental} clubId={clubId} />
              : null
          }
          {
            menu.admin
              ? <AdminManageTab />
              : null
          }

          {
            menu.coupon
              ? <CouponTab />
              : null
          }

        </div>
      </div>
    </div>
  );
}
export default AdminPage;
