'use client';
import React, { useState, useEffect } from 'react';
import styles from './priceRangeFacet.module.css';
import { isRegularExpressionLiteral } from 'typescript';
import { debug } from 'console';

interface FacetProps {
  title: string;
  queryParamName: string;
  facets: FacetGroup[];
}

interface FacetGroup {
  _id: string;
  count?: number;
  values?: string[];
}

function roundUpToNearestTen(n: number) {
  return Math.ceil(n / 10) * 10;
}

const processPriceRanges = (facets: FacetGroup[]) => {
  let previous: number | '' = '';
  const ranges = facets.map((facet) => {
    const value = roundUpToNearestTen(parseInt(facet._id));
    const rangeValues: { min: number | ''; max: number | '' } = {
      min: previous,
      max: value,
    };
    previous = value;
    return rangeValues;
  });

  ranges.push({ min: previous, max: '' });
  return ranges;
};

export function PriceRangeFacet({
  title,
  facets,
  queryParamName,
  handlePriceSelected,
}: FacetProps & {
  handlePriceSelected: (queryParam: string, queryParamName: string) => void;
}) {
  const [selectedPriceRangeIndex, setSelectedPriceRangeIndex] =
    useState<number>(-1);
  const [priceRanges, setPriceRanges] = useState<any[]>(
    processPriceRanges(facets)
  );

  const handlePriceRangeClick = (
    rangeValues: { min: number; max: number },
    index: number
  ) => {
    setSelectedPriceRangeIndex(index);
    handlePriceSelected(
      `${queryParamName}:${rangeValues.min}-${rangeValues.max}`,
      queryParamName
    );
  };

  const handleClear = () => {
    setSelectedPriceRangeIndex(-1);
    handlePriceSelected('', queryParamName);
  };

  const handleOnLoad = () => {
    //get the price range from the url search params if available
    const urlSearchParams = new URLSearchParams(window.location.search);
    const priceRange = urlSearchParams
      .get('fs')
      ?.split(';')
      ?.find((item) => item.startsWith(queryParamName));
    if (priceRange) {
      const [min, max] = priceRange.split(':')[1].split('-');
      const index = priceRanges.findIndex(
        (item) => item.min === parseInt(min) && item.max === parseInt(max)
      );
      setSelectedPriceRangeIndex(index);
    }
  };

  useEffect(() => {
    handleOnLoad();
  }, []);
  return (
    <div className={styles.facets}>
      <h2>{title}</h2>
      {selectedPriceRangeIndex >= 0 && (
        <button
          onClick={() => {
            handleClear();
          }}
        >
          clear
        </button>
      )}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {priceRanges.map((item, index) => (
          <li
            key={index}
            style={
              selectedPriceRangeIndex === index
                ? {
                    fontWeight: 'bold',
                    color: 'green',
                    backgroundColor: 'yellow',
                  }
                : {}
            }
          >
            <a href='#' onClick={() => handlePriceRangeClick(item, index)}>
              {`$${item.min === '' ? '$'+0 : item.min}-$${
                item.max === '' ? item.max + '+' : item.max
              }`}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PriceRangeFacet;
