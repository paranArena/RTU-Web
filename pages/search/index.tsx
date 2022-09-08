import React, {
  useEffect, useState,
} from 'react';
import styles from 'styles/pages/SearchResult.module.css';
import SearchResultGroupCard from 'components/group/SearchResultGroupCard';
import axios from 'axios';
import { useRouter } from 'next/router';
import SearchCardContainer from 'components/group/SearchCardContainer';
import { SERVER_API } from '../../config';
import { ClubDataModal } from '../../globalInterface';

interface ClubSearchProps {
  isSearched: boolean;
}

async function SearchRequest(query : string) {
  const result = [];
  let flag = true;

  // 전체 클럽 검색
  if (query === '') {
    await axios.get(`${SERVER_API}/clubs/search/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          // console.log('전체 클럽 검색 : ', res.data.data);
          res.data.data.forEach((item) => {
            result.push(item);
          });
        } else {
          flag = false;
        }
      })
      .catch((err) => { console.log(err); });
  } else {
    console.log('not all');
    // 쿼리가 있는 경우 | 검색하는 인풋이 있는 경우
    // 이름 검색 무조건 한개만 결과 나옴.
    await axios.get(`${SERVER_API}/clubs/search?name=${query}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      if (res.status === 200 && res.data.data !== undefined) {
        // console.log('이름으로 검색 : ', res.data.data);
        result.push(res.data.data);
      } else {
        flag = false;
      }
    })
      .catch((err) => {
        console.log(err);
        flag = false;
      });

    // 태그 검색 결과 여러개 나올 수 있음.
    await axios.get(`${SERVER_API}/clubs/search?hashtag=${query}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        // console.log('태그로 검색 : ', res.data.data);
        if (res.data.data !== undefined) {
          res.data.data.forEach((item) => {
            result.push(item);
          });
        } else {
          // console.log('res.data.data === undefined : ', res.data);
        }
        if (res.data.data !== undefined && res.data.data.length >= 1) {
          res.data.data.forEach((item) => {
            result.push(item);
          });
        } else {
          const tmp = result;
          // result = res.data.data;
          result.push(tmp[0]);
        }
      } else {
        flag = false;
      }
    })
      .catch((error) => {
        console.log(error);
      });
  }

  if (result[0] !== undefined) {
    const newArray = result.filter((item, i) => (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      result.findIndex((item2, j) => item.id === item2.id) === i
    ));
    return flag ? newArray : null;
  }

  return null;
}

interface ISearchResult {
  isSearched :ClubSearchProps
}

function SearchResult({ isSearched } : ISearchResult) {
  const [clubs, setClubs] = useState<ClubDataModal[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [clubData, setClubData] = useState<any>(null);
  const [query, setQuery] = useState<string | string[]>('');
  const router = useRouter();
  // const [isClick, setIsClick] = useState<boolean>(false);

  useEffect(() => {
    console.log('localStorage : ', localStorage);

    setQuery(router.query.input);
    console.log(isSearched);
  }, [router.query.input]);

  useEffect(() => {
    console.log('QUERY : ', query);
    async function fetchRequestSearch() {
      const searchResult = await SearchRequest(query as string);
      if (searchResult === null) {
        setClubs(null);
      } else {
        setClubs(searchResult);
      }
    }

    if (query !== undefined) {
      fetchRequestSearch();
    }
  }, [query]);

  useEffect(() => {
    if (clubs !== null) {
      clubs.forEach((item) => (
        <SearchResultGroupCard
          name={item.name}
          hashtags={item.hashtags}
          clubRole={item.clubRole}
          id={item.id}
          introduction={item.introduction}
          thumbnailPath={item.thumbnailPath}
          // isClicked={isClick}
          // setIsClicked={setIsClick}
        />
      ));

      console.log('clubData : ', clubData);
    }
  }, [query, clubData, clubs]);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.searchResultContainer}>
        <h3>검색된 결과</h3>
        {
          clubs !== null
            ? (
              <SearchCardContainer render={clubs} />
            )
            : null

        }

      </div>
    </div>
  );
}

export default SearchResult;
