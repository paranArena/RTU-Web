import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import styles from 'styles/group/AddGroupModal.module.css';
import axios from 'axios';
import { IAddGroup } from '../../globalInterface';
import { SERVER_API } from '../../config';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface addGroupModal {
  groupForm : IAddGroup;
  setGroupForm : Dispatch<SetStateAction<IAddGroup>>;
  isButtonActive : boolean;
  setIsButtonActive : Dispatch<SetStateAction<boolean>>;
}

function ParseTag(hashtags : string) : string[] {
  let string = hashtags;
  const result = [];
  const rexStart = /[#]/gm;
  const rexEnd = ' ';

  let flag = true;
  while (flag) {
    const startIdx = string.search(rexStart);
    const endIdx = string.search(rexEnd);

    if (startIdx !== -1 && endIdx !== -1) {
      if (string.slice(startIdx + 1, endIdx) !== '') {
        result.push(string.slice(startIdx + 1, endIdx));
      }
      string = string.slice(endIdx + 1);
    } else if (startIdx !== -1 && endIdx === -1) {
      if (string.slice(startIdx + 1, endIdx) !== '') {
        result.push(string.slice(startIdx + 1));
      }
      string = '';
    } else {
      flag = false;
    }
  }
  return result;
}

function AddGroupModal({
  groupForm, setGroupForm, isButtonActive, setIsButtonActive,
} : addGroupModal) {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [imgData, setImgData] = useState<any>(null);

  useEffect(() => {

  }, [groupForm.thumbnail]);

  useEffect(() => {
    if (groupForm.name !== '' && groupForm.introduction !== '') {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [groupForm, isButtonActive]);

  useEffect(() => {
    console.log('groupForm : ', groupForm);
  }, [groupForm]);

  const onChangeGroupName = (e) => {
    e.preventDefault();
    setGroupForm({
      ...groupForm,
      name: e.currentTarget.value,
    });
  };

  const onChangeGroupIntroduce = (e) => {
    e.preventDefault();
    setGroupForm({
      ...groupForm,
      introduction: e.currentTarget.value,
    });
  };

  const onChangeGroupTag = (e) => {
    e.preventDefault();
    setGroupForm({
      ...groupForm,
      hashtags: e.currentTarget.value,
    });
  };

  // 클럽 생성 버튼 클릭 이벤트
  const onClickAddClubButton = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (typeof groupForm.hashtags === 'string') {
      setGroupForm({ ...groupForm, hashtags: ParseTag(groupForm.hashtags) });
    }

    const data = new FormData();
    data.append('name', groupForm.name);
    data.append('introduction', groupForm.introduction);
    data.append('thumbnail', imgData);

    if (typeof groupForm.hashtags === 'object') {
      groupForm.hashtags.forEach((tag) => {
        data.append('hashtags', tag);
      });
    }

    axios.post(`${SERVER_API}/clubs`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        const clubID = res.data.data.id;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeImg = (e) => {
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setImgSrc(objectUrl);
    setImgData(e.target.files[0]);
    return () => URL.revokeObjectURL(objectUrl);
  };

  return (
    <div className={styles.modalContainer}>
      <span className={styles.modalTitle}>그룹 등록</span>
      <div className={styles.modalContentContainer}>
        <div className={styles.modalContentOne}>

          <div>
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img className={styles.groupImage} src={imgSrc === '' ? '/images/defaultImg.png' : imgSrc} alt="group presentative image" />
            <label htmlFor="file-upload">
              사진 추가
            </label>
            <input id="file-upload" style={{ display: 'none' }} type="file" onChange={onChangeImg} />
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
      <button onClick={onClickAddClubButton} type="submit" className={isButtonActive !== false ? styles.active : styles.unActive}>등록하기</button>
    </div>
  );
}

export default AddGroupModal;
