'use client';
import React, { useState } from 'react';
import styles from './searchBox.module.css';
import { useRoot } from '@/app/rootContext';
import { useRouter } from 'next/navigation';

interface AutocompleteProps {
  suggestions: string[];
}

const Autocomplete = () => {
  const [results, setResults] = useState<string[]>([]);
  const { searchTerm, setSearchTerm } = useRoot();
  const router = useRouter();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    // if (event.target.value.length > 0) {
    //   const value = event.target.value;
    //   const res: any = await fetch(
    //     `http://localhost:8081/products/autocomplete/${value}`
    //   );
    //   const {
    //     result: { products },
    //   } = await res.json();

    //   setResults([...products.map((p: { name: string }) => p.name)]);
    // } else {
    //   setResults([]);
    // }
  };

  const handleClick = (result: string) => {
    setSearchTerm(result);
    setResults([]);
  };

  const handleOnKeyPressSearch = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      await search();
    }
  };

  const handleOnClickSearch = async () => {
    await search();
  };

  const search = async () => {
    let encodedSearchTerm = encodeURIComponent(searchTerm);
    let url = `/search?t=${encodedSearchTerm}`;
    router.push(url);
  };

  return (
    <div className={styles.autocomplete}>
      <div
        style={{
          display: 'flex',
        }}
      >
        <input
          type='text'
          value={searchTerm}
          onChange={handleChange}
          className={styles.autocompleteInput}
          onKeyDown={handleOnKeyPressSearch}
        />
        <button onClick={handleOnClickSearch}>Search</button>
      </div>
      {results.length > 0 && (
        <ul className={styles.autocompleteResults}>
          {results.map((result, index) => (
            <li
              key={index}
              onClick={() => handleClick(result)}
              className={styles.autocompleteItem}
            >
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
