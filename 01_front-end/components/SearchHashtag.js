import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import useInput from '../customHooks/useInput';
import { SearchIcon } from '../styles/SearchHashtagStyle';

const SearchHashtag = () => {
  const [searchInput, onChangeSearchInput] = useInput('');
  const router = useRouter();

  const onSearchHashtag = useCallback(e => {
    e.preventDefault();
    router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);
  return (
    <>
      <div>
        <input
          value={searchInput}
          onChange={onChangeSearchInput}
        />
        <div onClick={onSearchHashtag}><SearchIcon /></div>
      </div>
    </>
  );
};

export default SearchHashtag;