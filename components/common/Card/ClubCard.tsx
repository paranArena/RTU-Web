import styles from '../../../styles/common/Card/ClubCard.module.css';

interface ClubCardProps {
  name: string;
  tag: string[];
  imgPath: string;
  cardId: number;
}

function ClubCard(props: ClubCardProps) {
  let tags = '';
  // eslint-disable-next-line react/destructuring-assignment
  props.tag.forEach((t) => {
    tags += `#${t} `;
  });

  return (

  // eslint-disable-next-line max-len
  // eslint-disable-next-line react/destructuring-assignment,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div onClick={() => { window.location.assign(`/admin?id=${props.cardId}`); }} className={styles.container}>
      {/* eslint-disable-next-line react/destructuring-assignment,jsx-a11y/img-redundant-alt */}
      <img className={styles.clubImg} src={props.imgPath ? props.imgPath : '/temp.png'} alt="club image" />
      <div>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        <h2 className={styles.clubName}>{props.name}</h2>
        <span className={styles.clubTag}>{tags}</span>
      </div>
    </div>
  );
}

export default ClubCard;
