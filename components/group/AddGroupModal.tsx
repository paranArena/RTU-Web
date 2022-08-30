import { RegisteredButton } from 'components/common/Button';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import styles from 'styles/group/AddGroupModal.module.css';
import { IAddGroup } from '../../globalInterface';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface addGroupModal {
  groupForm : IAddGroup;
  setGroupForm : Dispatch<SetStateAction<IAddGroup>>;
  isButtonActive : boolean;
  setIsButtonActive : Dispatch<SetStateAction<boolean>>;
}

function AddGroupModal({
  groupForm, setGroupForm, isButtonActive, setIsButtonActive,
} : addGroupModal) {
  useEffect(() => {
    // TODO 왜 undefined로 넘어오는지 궁금
    if (groupForm !== undefined) {
      if (groupForm.groupName !== '' && groupForm.introduce !== '') {
        setIsButtonActive(true);
      } else {
        setIsButtonActive(false);
      }
    }
  }, [groupForm, isButtonActive]);

  const onChangeGroupName = (e) => {
    e.preventDefault();
    setGroupForm({
      ...groupForm,
      groupName: e.currentTarget.value,
    });
  };

  const onChangeGroupIntroduce = (e) => {
    e.preventDefault();
    setGroupForm({
      ...groupForm,
      introduce: e.currentTarget.value,
    });
  };

  const onChangeGroupTag = (e) => {
    e.preventDefault();
    setGroupForm({
      ...groupForm,
      tags: e.currentTarget.value,
    });
  };

  return (
    <div className={styles.modalContainer}>

      <span className={styles.modalTitle}>그룹 등록</span>

      <div className={styles.modalContentContainer}>

        <div className={styles.modalContentOne}>

          <div>
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img className={styles.groupImage} src="images/tennis.jpeg" alt="group presentative image" />
            <span>사진 추가</span>
          </div>

          <div>
            <span className={styles.contentTitle}>태그</span>
            <input onChange={onChangeGroupTag} className={styles.inputLineTag} type="text" />
            <span className={styles.explainText}>#과 띄어쓰기를 포함해 영어는 최대 36글자, 한글은 24글자까지 가능합니다.</span>
          </div>

        </div>

        <div className={styles.modalContentTwo}>

          <div className={styles.groupNameContainer}>
            <span className={styles.contentTitle}>그룹 이름</span>
            <input onChange={onChangeGroupName} className={styles.inputLineGroupName} type="text" />
          </div>

          <div className={styles.introduceContainer}>
            <span className={styles.contentTitle}>소개글</span>
            <textarea onChange={onChangeGroupIntroduce} className={styles.inputBoxIntro} />
            <span className={styles.explainText}>띄어쓰기 포함 한글 130글자, 영어 150글자까지 가능합니다.</span>
          </div>

        </div>

      </div>
      <RegisteredButton buttonCSS={isButtonActive} />
    </div>
  );
}

export default AddGroupModal;
