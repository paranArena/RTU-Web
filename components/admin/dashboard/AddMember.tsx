import React from 'react';
import styles from 'styles/admin/dashboard/AddMember.module.css';

// eslint-disable-next-line react/function-component-definition,react/prop-types
function AddMember({ setViewAddMember }) {
  return (
    <div className={styles.container}>
      <div className={styles.modalTopContainer}>
        {/* 멤버 등록 top */}
        <span className={styles.modalTitle}>멤버 등록</span>
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <img onClick={() => { setViewAddMember(false); }} className={styles.closeIcon} src="/icons/창닫기 버튼.png" alt="close button" />
      </div>
      <div className={styles.linkIdOuterContainer}>
        <div className={styles.linkContainer}>
          {/*  링크로 추가 */}
          <div className={styles.addTitle}>
            <img className={styles.icon} src="/icons/링크추가.png" alt="add member as link" />
            <span>링크로 추가</span>
          </div>
          <div className={styles.linkInputWrap}>
            <input className={styles.roundInput} />
            <img className={styles.copyIcon} src="/icons/복사아이콘.png" alt="copy to clipboard button" />
          </div>
        </div>
        <div className={styles.line} />
        <div className={styles.idContainer}>
          {/* id로 추가 */}
          <div className={styles.addTitle}>
            <img className={styles.icon} src="/icons/ID로추가.png" alt="add member as ID" />
            <span>ID로 추가</span>
          </div>
          <div className={styles.idAddOuterContainer}>
            <div className={styles.idInputWrap}>
              <input className={styles.roundInput} />
            </div>
            <button className={styles.searchButton}>검색</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AddMember;
