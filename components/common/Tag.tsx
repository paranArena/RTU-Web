import React from 'react';
import styles from 'styles/common/Tag.module.css';

interface TagProps {
  tag : string;
}

function Tag({ tag } :TagProps) {
  return (
    <span className={styles.tag}>
      #&nbsp;
      {tag}
    </span>
  );
}

export default Tag;
