import styles from '../../../styles/common/Card/ClubCard.module.css';

interface ClubCardProps {
  name: string;
  tag: string[];
  imgPath: string;
  cardId: number;
}

function ClubCard(props: ClubCardProps) {
  let tags = '';
  props.tag.forEach((t) => {
    tags += `#${t} `;
  });

  return (
    <div onClick={() => { window.location.assign(`/admin?id=${props.cardId}`); }} className={styles.container}>
      <img className={styles.clubImg} src={props.imgPath ? props.imgPath : '/temp.png'} alt="club image" />
      <div>
        <h2 className={styles.clubName}>{props.name}</h2>
        <span className={styles.clubTag}>{tags}</span>
      </div>
    </div>
  );
}

export default ClubCard;
