// components/Search/Search.tsx

'use client';
import { useState } from 'react';
import styles from './search.module.css';

interface SearchProps {
  onSearchSubmit: (title: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchSubmit }) => {
  const [searchTitle, setSearchTitle] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchSubmit(searchTitle);
  };

  return (
    <form onSubmit={handleSearchSubmit} className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTitle}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>Search</button>
    </form>
  );
};

export default Search;
