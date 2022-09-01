import React from 'react';
import styles from 'styles/rent/FixedRentModal.module.css';

function FixedRentModal() {
  return (
    <div className={styles.fixedRentModalContainer}>
      <div>
        <h1>기간제 대여</h1>
        <img src="icons/Close.png" alt="닫기 버튼" />
      </div>
      <div>
        <img src="icons/leftButton.png" alt="left button" />
        <img src="icons/rightButton.png" alt="right button" />
      </div>

      <section>
        <div>
          {/* 달력 */}
        </div>
        <div>
          {/* 시간 */}
        </div>
      </section>
      <button>완료</button>
    </div>
  );
}

export default FixedRentModal;
