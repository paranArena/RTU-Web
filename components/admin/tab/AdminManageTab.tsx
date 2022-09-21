import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_API } from '../../../config';
import styles from '../../../styles/admin/admin.module.css';

interface ClubMember {
  clubRole : 'OWNER' | 'ADMIN' | 'USER';
  email : string;
  id : number;
  major : string;
  name : string;
  phoneNumber : string;
  studentId : string;
}

interface AdminMemberCardProps {
  member : ClubMember;
}

function AdminMemberCard({ member }:AdminMemberCardProps) {
  const onClickGrantUser = () => {
    const clubId = window.location.search.slice(window.location.search.search('=') + 1);
    const memberId = member.id;

    axios({
      method: 'put',
      url: `${SERVER_API}/clubs/${clubId}/members/${memberId}/role/user`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(() => {
      alert(`${member.name}의 관리자 권한 해제`);
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className={styles.adminMemberCardOuterContainer}>
      <div className={styles.adminMemberCardInnerContainer}>
        <div className={styles.userProfileImgContainer}>
          <img className={styles.userProfileImg} src="/images/defaultUser.png" alt="user img" />
        </div>
        <div className={styles.adminMemberInfoContainer}>
          <h3 className={member.clubRole === 'OWNER' ? styles.ownerText : styles.adminMemberInfoText}>{member.clubRole}</h3>
          <h3 className={styles.adminMemberInfoText}>{member.name}</h3>
          <h3 className={styles.adminMemberInfoText}>{member.major}</h3>
          <h3 className={styles.adminMemberInfoText}>{member.studentId}</h3>
        </div>
        <div className={styles.adminMemberContactInfoContainer}>

          {
            member.clubRole !== 'OWNER'
              ? (
                <div className={styles.adminMemberCancelButtonContainer}>
                  <button type="submit" onClick={onClickGrantUser} className={styles.adminMemberCancelButton}>권한변경</button>
                </div>
              )
              : null
          }

          <div className={styles.adminMemberContactInfoInnerContainer}>
            <span className={styles.adminMemberInfoText}>
              {member.email}
            </span>
            <span className={styles.adminMemberInfoText}>
              {member.phoneNumber}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminManageTab() {
  const [adminUserList, setAdminUserList] = useState<ClubMember[]>([]);
  const [mount, setMount] = useState(0);

  useEffect(() => {
    if (mount === 0) {
      setMount(1);
    } else {
      const clubId = window.location.search.slice(window.location.search.search('=') + 1);
      axios.get(`${SERVER_API}/clubs/${clubId}/members/search/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        setAdminUserList(res.data.data);
        console.log(res.data.data);
      })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [mount]);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        {
          adminUserList.map((member) => (member.clubRole !== 'USER' ? <AdminMemberCard member={member} /> : null))
        }
      </div>
    </div>
  );
}

export default AdminManageTab;
