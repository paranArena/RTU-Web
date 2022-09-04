import React, {
  useEffect, useState,
} from 'react';
import styles from 'styles/pages/SearchResult.module.css';
import SearchResultGroupCard from 'components/group/SearchResultGroupCard';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SERVER_API } from '../../config';

interface ClubSearchProps {
  isSearched : boolean;
}

interface ClubDataModal {
  id : number;
  clubRole : string;
  hashtags : string[];
  introduction : string;
  name : string;
  thumbnailPath : string;
}

function SearchResult({ isSearched } : ClubSearchProps) {
  const [clubs, setClubs] = useState<ClubDataModal[]>([]);
  const [clubData, setClubData] = useState<null | ClubDataModal>(null);
  const [query, setQuery] = useState<string | string[]>('');
  const router = useRouter();

  useEffect(() => {
    setQuery(router.query.name);
  }, [router.query.name]);

  useEffect(() => {
    if (query !== '') {
      axios.get(`${SERVER_API}/clubs/search?name=${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        setClubData(res.data.data);
        console.log(res.data.data);
      })
        .catch((err) => {
          console.log(err);
          setClubData(null);
        });
    }
    // FIXME:: Below deps should be fixed
  }, [isSearched, query]);

  useEffect(() => {
    console.log('useEffect Query : ', query);
    console.log('clubData : ', clubData);
  }, [query, clubData]);

  useEffect(() => {
    axios.get(
      `${SERVER_API}/clubs/search/all`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.data);
          setClubs(res.data.data);
          console.log(clubs);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.outerContainer}>

      <div className={styles.searchResultContainer}>
        <h3>검색된 결과</h3>
        {
              query === undefined ? (
                <div className={styles.innerContainer}>

                  {

                  clubs.map(
                    (club) => (
                      <SearchResultGroupCard
                        name={club.name}
                        hashtags={club.hashtags}
                        clubRole={club.clubRole}
                        id={club.id}
                        introduction={club.introduction}
                        thumbnailPath={club.thumbnailPath}
                      />
                    ),
                  )

          }
                </div>
              )

                : (
                  <div className={styles.innerContainer}>

                    {
              clubData
              && (
              <SearchResultGroupCard
                name={clubData.name}
                hashtags={clubData.hashtags}
                clubRole={clubData.clubRole}
                id={clubData.id}
                introduction={clubData.introduction}
                thumbnailPath={clubData.thumbnailPath}
              />
              )
}
                  </div>
                )

          }
      </div>
    </div>
  );
}

export default SearchResult;
