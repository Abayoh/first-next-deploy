'use client';
'use client';
import React, { useState, useEffect } from 'react';
import styles from './ratingFacet.module.css';

interface RatingFacetProps {
  ratings: number[];
  queryParamName: string;
  handleRatingSelect: (queryParam: string, queryParamName: string) => void;
}

const RatingFacet: React.FC<RatingFacetProps> = ({
  ratings,
  queryParamName,
  handleRatingSelect,
}) => {
  const [selectedRatingIndex, setSelectedRatingIndex] = useState<number>(-1);

  const handleRatingClick = (rating: number, index: number) => {
    setSelectedRatingIndex(index);
    handleRatingSelect(`rating:${rating}`, queryParamName);
  };

  const handleClear = () => {
    setSelectedRatingIndex(-1);
    handleRatingSelect('', queryParamName);
  };

  const handleLoad = () => {
    //get query param from url
    const urlParams = new URLSearchParams(window.location.search);
    const rating = urlParams
      .get('fs')
      ?.split(';')
      ?.find((item) => item.startsWith(queryParamName));
    if (rating) {
      const ratingValue = rating.split(':')[1];
      const index = ratings.findIndex((item) => item === parseInt(ratingValue));
      setSelectedRatingIndex(index);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className={styles.ratingFacet}>
      <h4>Ratings</h4>
      {selectedRatingIndex >= 0 && (
        <button
          onClick={() => {
            handleClear();
          }}
        >
          clear
        </button>
      )}
      <ul
        style={{
          listStyleType: 'none',
          padding: 0,
        }}
      >
        {ratings.map((rating, index) => (
          <li
            key={index}
            className={styles.ratingItem}
            style={
              selectedRatingIndex === index
                ? {
                    fontWeight: 'bold',
                    color: 'green',
                    backgroundColor: 'yellow',
                  }
                : {}
            }
            onClick={() => handleRatingClick(rating, index)}
          >
            <a href='#'>{Array(rating).fill('*').join('')}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RatingFacet;
