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

  // 그룹 프로필 이미지 처리용 데이터
  const [imgSrc, setImgSrc] = useState<string>('');
  const [imgData, setImgData] = useState<any>(null);

  // 서버에서 받아온 클럽 이름/소개/태그 설정하기 위한 useRef
  const groupNameRef = useRef();
  const groupIntroRef = useRef();
  const groupTagRef = useRef();
  const imgRef = useRef();

  // 처음 마운트될 때
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
    // 입력한 해시태그 길이가 36 이하면 setHashtag
    // 입력한 해시태그 길이가 36을 넘으면 e.currentTarget.value = hashtag;
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
          alert('클럽 프로필 수정 완료');
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
      <span className={styles.modalTitle}>프로필 수정</span>
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
              사진 추가
            </label>
            <input
              id="file-upload"
              style={{ display: 'none' }}
              type="file"
              onChange={onChangeImg}
            />
          </div>

          <div className={styles.tagInputContainer}>
            <span className={styles.modalText}>태그</span>
            <input ref={groupTagRef} id="groupTags" onChange={onChangeGroupTag} className={stylesModal.inputLineTag} type="text" />
            <span
              className={stylesModal.explainText}
            >
              #과 띄어쓰기를 포함해 최대 36글자까지 가능합니다.
            </span>
          </div>

        </div>

        <div className={stylesModal.modalContentTwo}>

          <div className={stylesModal.groupNameContainer}>
            <span className={styles.modalText}>그룹 이름</span>
            <input ref={groupNameRef} id="groupName" onChange={(e) => { setSettingClubData({ ...settingClubData, name: e.currentTarget.value }); }} className={stylesModal.inputLineGroupName} type="text" />
          </div>

          <div className={stylesModal.introduceContainer}>
            <span className={styles.modalText}>소개글</span>
            <textarea
              ref={groupIntroRef}
              id="groupIntroduce"
              onChange={(e) => {
                if (e.currentTarget.value.length <= 130) {
                  setSettingClubData({ ...settingClubData, introduction: e.currentTarget.value });
                } else {
                  e.currentTarget.value = settingClubData.introduction;
                }
              }}
              className={stylesModal.inputBoxIntro}
            />
            <span className={stylesModal.explainText}>띄어쓰기 포함 130글자까지 가능합니다.</span>
          </div>

        </div>

      </div>
      <button type="submit" onClick={onClickSettingButton} className={active ? styles.active : styles.unActive}>완료</button>
    </div>
  );
}

// DashBoard
function DashBoard() {
  useEffect(() => {

  }, []);

  return (
    <div className={styles.tabViewOuterContainer}>
      <div className={styles.dashBoardContainer}>
        <div className={styles.sectionContainer}>
          {/* 실시간 대여 */}
          <section className={styles.section}>
            <div className={styles.titleContainer}>
              <h1 className={styles.sectionTitle}>
                실시간 대여
              </h1>
            </div>

            <div>
              {/* 실시간 대여 현황 리스트 */}
            </div>

          </section>
        </div>

        <div className={styles.sectionContainer}>
          {/* 오늘의 일정 & 공지사항 */}
          <section className={styles.section_h_50}>
            {/*  오늘의 일정 */}
            <div className={styles.titleContainer}>
              <h1 className={styles.sectionTitle}>
                오늘의 일정
              </h1>

              <div>
                {/* 오늘 일정 리스트 */}
              </div>

            </div>

          </section>

          <section className={styles.section_h_50}>
            {/* 공지사항 */}
            <div className={styles.titleContainer}>
              <h1 className={styles.sectionTitle}>
                공지사항
              </h1>

              <div>
                {/* 공지사항 리스트 */}
              </div>
            </div>
          </section>
        </div>

        <div className={styles.sectionContainer}>
          {/* 대여 현황 & 멤버관리 */}
          <section className={styles.section_h_50}>
            {/* 대여 현황 */}
            <div className={styles.titleContainer}>
              <h1 className={styles.sectionTitle}>
                대여 현황
              </h1>
            </div>

            <div>
              {/* 대여 현황 리스트 */}
            </div>
          </section>
          <section className={styles.section_h_50}>
            {/* 멤버관리 */}
            <div className={styles.titleContainer}>
              <h1 className={styles.sectionTitle}>
                멤버 관리
              </h1>
            </div>

            <div>
              {/* 멤버 리스트 */}
            </div>
          </section>
        </div>

        <div className={styles.sectionContainer}>
          <section className={styles.section}>
            {/* 알림 */}
            <div className={styles.titleContainer}>
              <h1 className={styles.sectionTitle}>
                알림
              </h1>
            </div>

            <div>
              {/* 알림 리스트 */}
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

  // 마운트될 때 클럽 데이터 받아오기
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

  // 클럽 데이터 받아오면 받아온 정보 기반으로 프로필 수정 modal 띄우기 위한 준비
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
};

function AdminPage() {
  const [menu, setMenu] = useState<IMenuTabState>({ ...menuDefault, rentalItemManage: true });
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [clubId, setClubId] = useState('');
  // OWNER인지 ADMIN인지 판단하기 위한
  const [myRole, setMyrole] = useState('');

  // 관리자가 미가입자 렌탈 기록용
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
    }
  };

  useEffect(() => {
    const url = window.location.search;
    setClubId(url.slice(url.search('=') + 1));
  }, []);

  useEffect(() => {
    axios.get(
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
        alert('클럽이 성공적으로 삭제되었습니다.');
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
          <h3>관리자 모드</h3>
        </div>

        <div className={styles.menuTabContainer}>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          {/* <h4 */}
          {/*  id="dashBoard" */}
          {/*  onClick={onClickMenu} */}
          {/*  className={menu.dashBoard ? styles.current : styles.disabled} */}
          {/* > */}
          {/*  대시보드 */}
          {/* </h4> */}
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="profileSetting"
            onClick={onClickMenu}
            className={menu.profileSetting ? styles.current : styles.disabled}
          >
            프로필 수정
          </h4>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="rentalItemManage"
            onClick={onClickMenu}
            className={menu.rentalItemManage ? styles.current : styles.disabled}
          >
            대여/물품 관리
          </h4>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="notice"
            onClick={onClickMenu}
            className={menu.notice ? styles.current : styles.disabled}
          >
            공지사항
          </h4>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="HR"
            onClick={onClickMenu}
            className={menu.HR ? styles.current : styles.disabled}
          >
            멤버 관리
          </h4>

          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <h4
            id="admin"
            onClick={onClickMenu}
            className={menu.admin ? styles.current : styles.disabled}
          >
            클럽 관리자 관리
          </h4>
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          {/* <h4 */}
          {/*  id="event" */}
          {/*  onClick={onClickMenu} */}
          {/*  className={menu.event ? styles.current : styles.disabled} */}
          {/* > */}
          {/*  이벤트 관리 */}
          {/* </h4> */}
          <div>
            {/* eslint-disable-next-line max-len */}
            {/* <h4 className={menu.rentalActive ? styles.current : styles.disabled}>대여목록 활성화</h4> */}
            {/*
                // TODO Toggle Button 구현 참고
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
            클럽 삭제
          </h4>

          { showDeleteAlert ? <AlertModal type="alert" top={30} titleText="클럽을 삭제하시겠습니까?" contentText="한 번 삭제하면 복구가 불가능합니다. 정말 삭제하시겠습니까?" onClickEvent={() => { setShowDeleteAlert(false); }} button onClickButtonEvent={onClickDeleteClub} /> : null}

          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div
            onClick={() => {
              window.history.back();
            }}
            className={styles.closeButtonContainer}
          >
            <img src="/icons/나가기 버튼.png" alt="관리자 페이지 나가기 버튼" />
            <h4 className={styles.closeButton}>나가기</h4>
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
                <div className={styles.dashboardImgContainer}>
                  <img src="/images/dashboardImg.png" alt="임시 이미지" />
                </div>
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
              ? <div>준비중</div>
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
        </div>
      </div>
    </div>
  );
}
export default AdminPage;
