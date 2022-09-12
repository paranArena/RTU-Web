import React, { useEffect, useState } from 'react';
import styles from 'styles/admin/member.module.css';
import axios from 'axios';
import { SERVER_API } from '../../../config';
import AlertModal from '../../common/AlertModal';
import { IClubMember } from '../../../globalInterface';

interface IMemberListCard {
  name:string;
  id : number;
  major: string;
  studentId : string;
  // eslint-disable-next-line react/require-default-props
  profileImage? :string;
  // eslint-disable-next-line react/require-default-props
  rental? : boolean;
  type : 'application' | 'member';
}

function MemberListCard(
  {
    name,
    major,
    studentId,
    id,
    profileImage,
    rental,
    type,
  } :IMemberListCard,
) {
  const [requestState, setRequestState] = useState({
    resultView: false,
    resultValue: null,
  });

  const onClickMemberDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const clubId = window.location.search.slice(window.location.search.search('=') + 1);

    axios({
      method: 'delete',
      url: `${SERVER_API}/clubs/${clubId}/members/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      // eslint-disable-next-line consistent-return
    }).then((res) => {
      if (res.status === 200) {
        console.log(res);
        return <AlertModal type="info" top={30} titleText="성공" onClickEvent={() => { alert('성공'); }} />;
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  const onClickButton = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const clubId = window.location.search.slice(window.location.search.search('=') + 1);
    if (e.currentTarget.id === 'accept') {
      // 가입신청 수락
      axios({
        method: 'post',
        url: `${SERVER_API}/clubs/${clubId}/requests/join/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            setRequestState({ resultView: true, resultValue: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // 가입 신청 거절
      axios({
        method: 'delete',
        url: `${SERVER_API}/clubs/${clubId}/requests/join/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            setRequestState({ resultView: true, resultValue: false });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.memberListCardContainer}>

      <div className={styles.memberListCardLeftSection}>
        {/* 멤버 프로필 이미지 */}
        <div className={styles.profileImageContainer}>
          <img className={styles.profileImage} alt="profile" src={profileImage} />
        </div>
        {/*  멤버 정보 // 이름 // 학과 // 학번 */}
        <div className={styles.memberInfoContainer}>
          <span className={styles.memberName}>{name}</span>
          <span className={styles.memberMajor}>
            {major}
            {' '}
            {studentId}
          </span>
        </div>
      </div>

      {
        // eslint-disable-next-line no-nested-ternary
            type === 'application'
              ? (
                requestState.resultView === false
                  ? (
                    <div className={styles.application3Section}>
                      <div className={styles.buttonContainer}>
                        <button id="accept" onClick={onClickButton} className={styles.button} type="submit">수락</button>
                      </div>
                      <div className={styles.buttonContainer}>
                        <button id="reject" onClick={onClickButton} className={styles.button} type="submit">거절</button>
                      </div>
                    </div>
                  )
                  : (
                    <div className={styles.requestResultContainer}>
                      {
                            requestState.resultValue
                              ? <span>수락</span>
                              : <span>거절</span>
                          }
                    </div>
                  )
              )
              : (
                <div className={styles.memberRentalContainer}>
                  {
                        rental
                          // ? <span>대여 중</span>
                          ? <button className={styles.deleteButton} type="submit" onClick={onClickMemberDelete}>삭제</button>
                          : null
                    }
                </div>
              )
        }
    </div>
  );
}

interface IMemberManageTab {
  clubId : string;
}

function MemberManageTab({ clubId } : IMemberManageTab) {
  const [memberList, setMemberList] = useState<IClubMember[]>([]);
  const [appliedList, setAppliedList] = useState<IClubMember[]>([]);

  useEffect(() => {
    axios.get(`${SERVER_API}/clubs/${clubId}/members/search/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          const list = res.data.data.filter((member) => member.clubRole !== 'OWNER');
          setMemberList(list);
          console.log(list);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get(`${SERVER_API}/clubs/${clubId}/requests/join/search/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setAppliedList(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    // 가입 신천
    <div className={styles.memberManageTabContainer}>
      <section className={styles.ManageTabSection}>
        <div className={styles.titleContainer}>
          {/*  title  */}
          가입신청
        </div>
        <div className={styles.selectButtonContainer}>
          {/* 버튼 */}
          {/* <div className={styles.selectDivContainer}> */}
          {/*  <span>전체수락</span> */}
          {/* </div> */}
          {/* <div className={styles.selectDivContainer}> */}
          {/*  <img className={styles.iconWithPadding} src="/icons/선택.png" alt="선택하기" /> */}
          {/*  <span>선택</span> */}
          {/* </div> */}
        </div>

        <div className={styles.memberListContainer}>
          {/*  List  */}
          {
            appliedList.map((apply) => (
              <MemberListCard
                id={apply.id}
                profileImage="/images/defaultUser.png"
                type="application"
                major={apply.major}
                name={apply.name}
                studentId={(apply.studentId.slice(2, 4))}
              />
            ))
          }

        </div>
      </section>

      {/* 멤버관리 */}
      <section className={styles.ManageTabSection}>
        <div className={styles.titleContainer}>
          {/*  title  */}
          멤버 관리
        </div>

        {/* FIXME:: 다음에 추가될 기능 */}
        <div className={styles.selectButtonContainer}>
          {/* /!* 버튼 *!/ */}
          {/* <div className={styles.selectDivContainer}> */}
          {/*  <img className={styles.icon} src="/icons/추가하기.png" alt="등록하기" /> */}
          {/*  <span>등록하기</span> */}
          {/* </div> */}
          {/* <div className={styles.selectDivContainer}> */}
          {/*  <img className={styles.iconWithPadding} src="/icons/선택.png" alt="선택" /> */}
          {/*  <span>선택</span> */}
          {/* </div> */}
        </div>

        <div className={styles.memberListContainer}>
          {/*  List  */}
          {
            memberList.map((member) => (
              <MemberListCard
                profileImage="/images/defaultUser.png"
                name={member.name}
                id={member.id}
                major={member.major}
                studentId={member.studentId}
                type="member"
                //  !! 원래는 렌탈중인지 표시하기 위한 props 이지만 프로토 타입에서는 회원 삭제 버튼을 넣기 위한 용도로 사용
                rental
              />
            ))
          }

        </div>
      </section>
    </div>
  );
}

export default MemberManageTab;
