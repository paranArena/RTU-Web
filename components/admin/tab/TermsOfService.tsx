import React from 'react';
import styles from 'styles/mypage/TermsOfService.module.css';

function TermsOfService() {
  return (
    <div className={styles.termsOfServiceOuterContainer}>
      <div className={styles.termsOfServiceInnerContainer}>
        <img className={styles.termsOfServicePDFContainer} src="/images/TermsOfService/001.png" alt="terms of secvie 1" />
        <img className={styles.termsOfServicePDFContainer} src="/images/TermsOfService/002.png" alt="terms of secvie 2" />
        <img className={styles.termsOfServicePDFContainer} src="/images/TermsOfService/003.png" alt="terms of secvie 3" />

      </div>
    </div>
  );
}

export default TermsOfService;
