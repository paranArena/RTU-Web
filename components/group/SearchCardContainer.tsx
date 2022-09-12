import styles from 'styles/pages/SearchResult.module.css';
import React from 'react';
import SearchResultGroupCard from './SearchResultGroupCard';
import { ClubDataModal } from '../../globalInterface';

interface SearchCardContainerProps {
  // render : ClubData[];
  render : ClubDataModal[];
}

function SearchCardContainer({ render }:SearchCardContainerProps) {
  if (render !== undefined) {
    return (
      <div className={styles.innerContainer}>
        {
            render.map((item) => (
              <SearchResultGroupCard
                name={item.name}
                hashtags={item.hashtags}
                clubRole={item.clubRole}
                id={item.id}
                introduction={item.introduction}
                thumbnailPath={item.thumbnailPath}
                memberNumber={item.clubMemberSize}
              />
            ))
          }
      </div>
    );
  }

  return null;
}

export default SearchCardContainer;
