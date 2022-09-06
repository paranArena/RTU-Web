import React, { useEffect, useState } from 'react';
import styles from 'styles/pages/AdminPage.module.css';
import stylesModal from 'styles/group/AddGroupModal.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SERVER_API } from '../../config';
import { ClubDataModal } from '../../globalInterface';

interface IClubProfileSettingModal {
  clubData : ClubDataModal;
}

function ClubProfileSettingModal({ clubData }:IClubProfileSettingModal) {
  const [active, setActive] = useState<boolean>(true);
  const [settingClubData, setSettingClubData] = useState<ClubDataModal>(clubData);

  useEffect(() => {
    console.log('uE');
    console.log('clubData : ', clubData);
    console.log('settingClubData : ', settingClubData);
  }, []);

  return (
    <div className={styles.modalContainer}>
      <span className={styles.modalTitle}>프로필 수정</span>
      <div className={styles.modalContentContainer}>
        <div className={styles.modalLeftOuterContainer}>

          <div className={styles.imageUploaderContainer}>
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img
              className={stylesModal.groupImage}
              src={clubData.thumbnailPath === '' || clubData.thumbnailPath === null
                ? '/images/defaultImg.png'
                : clubData.thumbnailPath}
              alt="group presentative image"
            />

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
              onChange={() => {}}
            />
          </div>

          <div className={styles.tagInputContainer}>
            <span className={styles.modalText}>태그</span>
            <input onChange={() => {}} className={stylesModal.inputLineTag} type="text" />
            <span className={stylesModal.explainText}>#과 띄어쓰기를 포함해 영어는 최대 36글자, 한글은 24글자까지 가능합니다.</span>
          </div>

        </div>

        <div className={stylesModal.modalContentTwo}>

          <div className={stylesModal.groupNameContainer}>
            <span className={styles.modalText}>그룹 이름</span>
            <input onChange={() => {}} className={stylesModal.inputLineGroupName} type="text" />
          </div>

          <div className={stylesModal.introduceContainer}>
            <span className={styles.modalText}>소개글</span>
            <textarea onChange={() => {}} className={stylesModal.inputBoxIntro} />
            <span className={stylesModal.explainText}>띄어쓰기 포함 한글 130글자, 영어 150글자까지 가능합니다.</span>
          </div>

        </div>

      </div>
      {/* <button onClick={() => {}} type="submit" className={stylesModal.unActive}>완료</button> */}
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

  // 마운트될 때 클럽 데이터 받아오기
  useEffect(() => {
    const clubId = router.query.id;
    if (clubId !== undefined) {
      axios.get(`${SERVER_API}/clubs/${clubId}/info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          console.log(res.data.data);
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
            ? <ClubProfileSettingModal clubData={clubData} />
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
}

const menuDefault:IMenuTabState = {
  dashBoard: false,
  profileSetting: false,
  rentalItemManage: false,
  notice: false,
  HR: false,
  event: false,
  rentalActive: false,
};

function AdminPage() {
  const [menu, setMenu] = useState<IMenuTabState>({ ...menuDefault, dashBoard: true });
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
    }
  };

  useEffect(() => {
    // console.log(menu);
    // typeof humbnail === string | null | ''
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
          <h4
            id="dashBoard"
            onClick={onClickMenu}
            className={menu.dashBoard ? styles.current : styles.disabled}
          >
            대시보드
          </h4>
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
            id="event"
            onClick={onClickMenu}
            className={menu.event ? styles.current : styles.disabled}
          >
            이벤트 관리
          </h4>
          <div>
            <h4 className={menu.rentalActive ? styles.current : styles.disabled}>대여목록 활성화</h4>
            {/*
                // TODO Toggle Button 구현 참고
               https://velog.io/@whljm1003/React-toggle-switch-%EA%B8%B0%EB%8A%A5 */}
          </div>
        </div>
        {/* TODO 나가기 버튼 */}
      </div>

      <div className={styles.rightOuterContainer}>
        <div className={styles.rightInnerContainer}>
          {/* TODO:: DashBoard */}
          {
            menu.dashBoard ? <DashBoard /> : <ProfileSetting />
          }
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
