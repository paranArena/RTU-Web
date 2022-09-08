import React, { useEffect, useState } from 'react';
import styles from 'styles/admin/notice.module.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import FormData from 'form-data';
import axios from 'axios';
import { SERVER_API } from '../../../config';

function CreateNoticeModal() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  // const [imgSrc, setImgSrc] = useState<string >('');
  // TODO:: 사진여러개 업로드하는 방법
  useEffect(() => {
    console.log('title : ', title);
    console.log('content : ', content);
  }, [title, content]);

  const onClickSubmitButton = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (title !== '' && content !== '') {
      const data = new FormData();
      data.append('title', title);
      data.append('content', content);
      // data.append('image', imgSrc);

      const queryString = window.location.search;
      const clubId = queryString.slice(queryString.search('=') + 1);
      axios.post(`${SERVER_API}/clubs/${clubId}/notifications`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.createNoticeModalOuterContainer}>
      <div className={styles.createNoticeModalInnerContainer}>
        <div className={styles.noticeTitleAndSubmitButtonContainer}>
          {/*  제목 입력란  */}
          <input
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
            className={styles.noticeTitleInput}
            id="notice-title"
            placeholder="제목을 입력해주세요."
            type="text"
          />
          {/*  완료버튼  */}
          <button onClick={onClickSubmitButton} className={(title !== '' && content !== '') ? styles.submitButtonActive : styles.submitButtonUnActive} type="submit">완료</button>
        </div>

        <div className={styles.noticeStyleButtonContainer}>
          {/*  이미지 업로드, 단락, 가, 16, 비공개 ...  */}
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="file-upload">
              <img className={styles.buttonIcon} src="/icons/사진추가.png" alt="imiage upuload button" />
            </label>
            <input
              type="file"
              id="file-upload"
              style={{ display: 'none' }}
            />
          </div>
          <img className={styles.buttonIcon} src="/icons/비공개.png" alt="imiage upuload button" />
        </div>

        <div className={styles.noticeContentContainer}>
          {/* 공지사항 내용 입력  */}
          <textarea onChange={(e) => { setContent(e.currentTarget.value); }} className={styles.noticeContent} placeholder="내용을 입력해주세요." />
        </div>
      </div>

    </div>
  );
}

export default CreateNoticeModal;
