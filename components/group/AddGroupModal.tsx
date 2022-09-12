import React, {
  Dispatch, SetStateAction, useEffect, useRef, useState,
} from 'react';
import styles from 'styles/group/AddGroupModal.module.css';
import axios from 'axios';
import AlertModal from 'components/common/AlertModal';
import { IAddGroup } from '../../globalInterface';
import { SERVER_API } from '../../config';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface addGroupModal {
  groupForm : IAddGroup;
  setGroupForm : Dispatch<SetStateAction<IAddGroup>>;
  isButtonActive : boolean;
  setIsButtonActive : Dispatch<SetStateAction<boolean>>;
}

export function ParseTag(hashtags : string) : string[] {
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
  const [isAlertModal, setIsAlertModal] = useState<number | null>(null);

  const fileRef = useRef();

  useEffect(() => {
    console.log('uE');
  }, [groupForm.thumbnail, groupForm.name, groupForm.hashtags, groupForm.introduction]);

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

    console.log(groupForm);

    if (groupForm.name !== '' && groupForm.introduction !== '') {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }

    if (typeof groupForm.hashtags === 'string') {
      setGroupForm({ ...groupForm, hashtags: ParseTag(groupForm.hashtags) });
    }

    console.log('parse tag : ', groupForm.hashtags);

    const data = new FormData();
    data.append('name', groupForm.name);
    data.append('introduction', groupForm.introduction);

    // FIXME:: 이미지 업로드 안하면 에러남
    if (Array.isArray(groupForm.hashtags)) {
      groupForm.hashtags.forEach((tag) => {
        console.log('form data add tag  : ', tag);
        data.append('hashtags', tag);
      });
    } else {
      data.append('hashtags', '');
    }

    if (imgData !== null) {
      data.append('thumbnail', imgData);
    }

    axios.post(`${SERVER_API}/clubs`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const clubID = res.data.data.id;
        console.log(res);
        if (res.status === 200) {
          setIsAlertModal(res.status);
          window.history.back();
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setIsAlertModal(409);
        } else if (err.response.status === 400) {
          setIsAlertModal(400);
        } else {
          setIsAlertModal(null);
        }

        console.log(err);
      });
  };

  useEffect(() => {
    console.log('imgUrl === imgSrc  : ', imgSrc);
    console.log('imgData : ', imgData);
  }, [imgSrc, imgData]);

  // eslint-disable-next-line consistent-return
  const onChangeImg = (e) => {
    if (e.target.files.length > 0) {
      const objectUrl = URL.createObjectURL(e.target.files[0]);
      setImgSrc(objectUrl);
      setImgData(e.target.files[0]);
      console.log('e.target.files[0] : ', e.target.files[0]);

      return () => URL.revokeObjectURL(objectUrl);
    }
    setImgSrc('/images/defaultImg.png');

    // setImgData(null);
    setImgData(e.target.files[0]);
    console.log('e.target.files[0] : ', e.target.files[0]);
    console.log('imgUrl === imgSrc  : ', imgSrc);
    console.log('imgData : ', imgData);
  };

  return (
    <div className={styles.modalContainer}>
      <span className={styles.modalTitle}>그룹 등록</span>
      <div className={styles.modalContentContainer}>
        <div className={styles.modalContentOne}>

          <div>
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img className={styles.groupImage} src={imgSrc === '' ? '/images/defaultImg.png' : imgSrc} alt="group presentative image" />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              htmlFor="file-upload"
            >
              사진 추가
            </label>
            <input ref={fileRef} id="file-upload" style={{ display: 'none' }} type="file" onChange={onChangeImg} />
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

      {(isAlertModal !== null && isAlertModal !== 400)
        ? (
          <AlertModal
            top={10}
            titleText={isAlertModal === 200 ? '등록 성공' : '등록 실패'}
            type={isAlertModal === 200 ? 'info' : 'alert'}
            onClickEvent={() => {
              setIsAlertModal(null);
            }}
            contentText={isAlertModal === 200 ? '클럽이 성공적으로 등록되었습니다.' : '이미 존재하는 클럽이름입니다.'}
          />
        ) : null}
      {isAlertModal === 400 ? (
        <AlertModal
          top={10}
          titleText="등록 실패"
          type="alert"
          onClickEvent={() => {
            setIsAlertModal(null);
          }}
          contentText="클럽 등록에 실패하였습니다. 다시 한 번 더 확인해주세요."
        />
      ) : null}

    </div>
  );
}

export default AddGroupModal;
