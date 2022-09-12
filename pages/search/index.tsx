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

  console.log(query);
  console.log(query);
  console.log(query);
  console.log(query);
  console.log(query);
  console.log(query);
  console.log(query);
  console.log(query);

  // 전체 클럽 검색
  if (query === '') {
    await axios.get(`${SERVER_API}/clubs/search/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log('전체 클럽 검색 : ', res.data.data);
          res.data.data.forEach((item) => {
            result.push(item);
          });
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
        console.log('이름검색', res.data.data);
        res.data.data.forEach((item) => {
          result.push(item);
        });
      }
    })
      .catch((err) => {
        console.log(err);
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

          console.log('result ', result);
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
      }
    })
      .catch((error) => {
        console.log(error);
      });
  }
  console.log(result);
  if (result[0] !== undefined) {
    console.log('result[0]!==undefined');
    console.log('new Array');
    console.log('new Array');
    console.log('new Array');
    console.log('new Array');
    console.log('new Array');
    console.log('new Array');
    console.log('new Array');
    console.log('new Array');
    console.log('new Array');
    console.log('new Array');
    console.log('new Array');
    console.log('new Array');
    console.log('new Array');
    console.log('new Array');
    console.log('new Array');
    console.log('new Array');

    const newArray = result.filter((item, i) => (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      result.findIndex((item2, j) => item.id === item2.id) === i
    ));
    console.log(newArray);
    return newArray;
  }
  console.log(result);

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

  // Mount
  const [mount, setMount] = useState(false);
  const router = useRouter();
  // const [isClick, setIsClick] = useState<boolean>(false);

  useEffect(() => {
    setQuery(router.query.input);
  }, [router.query.input]);

  useEffect(() => {
    if (mount === false) {
      setMount(true);
    } else {
      // eslint-disable-next-line no-inner-declarations
      async function fetchRequestSearch() {
        const searchResult = await SearchRequest(query as string);

        console.log('searchResult', searchResult);
        if (searchResult === null) {
          setClubs(null);
        } else {
          setClubs(searchResult);
        }
      }

      if (query !== undefined) {
        fetchRequestSearch();
      }
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
          memberNumber={item.clubMemberSize}
          introduction={item.introduction}
          thumbnailPath={item.thumbnailPath}
          // isClicked={isClick}
          // setIsClicked={setIsClick}
        />
      ));
    }
  }, [query, clubData, clubs]);

  useEffect(() => {
  }, [clubs]);

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
