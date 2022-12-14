import styles from '../../../styles/pages/ClubList.module.css';
import { MY_CLUB } from '../../../interface/API';
import ClubCard from './ClubCard';

interface ClubListProps {
  clubList: MY_CLUB[];
}

function ClubList(props: ClubListProps) {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}><h2>관리자 그룹 목록</h2></div>
      <div className={styles.addClubContainer}>
        <a href="/addGroup">
          <img src="/icons/추가하기.png" alt="add club button" />
          <span>등록하기</span>
        </a>
      </div>
      <section className={styles.clubListContainer}>
        {
            // eslint-disable-next-line max-len
            // eslint-disable-next-line max-len,react/destructuring-assignment,react/no-array-index-key
            props.clubList.map((club, index) => <ClubCard cardId={club.id} key={index} name={club.name} tag={club.hashtags} imgPath={club.thumbnailPath} />)
        }
      </section>
      {/* <div className={styles.pageNationContainer}>page natqion</div> */}
    </div>
  );
}

export default ClubList;
