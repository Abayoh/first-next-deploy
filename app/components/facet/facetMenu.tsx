'use client';
import React, { useState, useEffect } from 'react';
import styles from './facet.module.css';
import RatingFacet from './ratingFacet';
import PriceRangeFacet from './priceRangeFacet';
import { useRouter, usePathname } from 'next/navigation';

interface FacetGroup {
  _id: string;
  values: string[];
}

interface ReturnFacet {
  _id: string;
  count: number;
}

interface Facets {
  caterories: ReturnFacet[];
  brands: ReturnFacet[];
  priceRanges: ReturnFacet[];
  ratings: ReturnFacet[];
  specs: FacetGroup[];
  condition: ReturnFacet[];
}

interface FacetMenuProps {
  facets: Facets;
}

function FacetMenu({ facets }: FacetMenuProps) {
  const [seletedItems, setSelectedItems] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  const handleFacetsChange = (queryParams: string, queryParamName: string) => {
    //unset an existing query param
    let newFilters: string[] = [];
    if (queryParams === '') {
      newFilters = seletedItems.filter(
        (item) => !item.startsWith(queryParamName)
      );

      handleFilterSearch(newFilters);
      setSelectedItems(newFilters);
    }
    //update query param if it starts with queryParamName
    else if (seletedItems.some((item) => item.startsWith(queryParamName))) {
      newFilters = seletedItems.map((item) =>
        item.startsWith(queryParamName) ? queryParams : item
      );

      handleFilterSearch(newFilters);
      setSelectedItems(newFilters);
    } else {
      //add query param
      newFilters = [...seletedItems, queryParams];

      handleFilterSearch(newFilters);
      setSelectedItems(newFilters);
    }
  };
  //compose facets menu with width equal to 400px

  const handleLoad = () => {
    //get query params from url
    const urlParams = new URLSearchParams(window.location.search);
    const filters = urlParams.get('fs')?.split(';');
    if (filters) {
      setSelectedItems(filters);
    }
  };

  const convertFacetToUsableFormat = (
    name: string,
    facet: { _id: string; count: number }[]
  ) => {
    return facet.reduce(
      (acc, curr) => {
        acc.values.push(curr._id);
        return acc;
      },
      { _id: name, values: [] } as { _id: string; values: string[] }
    );
  };

  const handleFilterSearch = (newItems: string[]) => {
    const urlParams = new URLSearchParams(window.location.search);
    if (newItems.length === 0) {
      urlParams.delete('fs');
    } else {
      urlParams.set('fs', newItems.join(';'));
    }
    router.push(`${pathname}?${urlParams.toString()}`);
  };

  useEffect(() => {
    handleLoad();
  }, []);
  
  console.log(facets);
  return (
    <div className={styles.facetMenu}>
      <RatingFacet
        queryParamName='rating'
        ratings={[5, 4, 3, 2, 1]}
        handleRatingSelect={handleFacetsChange}
      />
      <PriceRangeFacet
        queryParamName='price'
        facets={facets.priceRanges}
        title='Price Ranges'
        handlePriceSelected={handleFacetsChange}
      />
      <Facet
        title='Brands'
        facets={convertFacetToUsableFormat('brand', facets.brands)}
        queryParamName='brand'
        onSelectedFacets={handleFacetsChange}
      />

      <SpecsFacets
        queryParamName='specs'
        onSpecsFacetsChanged={handleFacetsChange}
        specs={facets.specs}
      />
      <Facet
        title='Conditions'
        facets={convertFacetToUsableFormat('condition', facets.condition)}
        queryParamName='condition'
        onSelectedFacets={handleFacetsChange}
      />
    </div>
  );
}

export default FacetMenu;

interface FacetProps {
  title: string;
  facets: FacetGroup;
  queryParamName: string;
  onSelectedFacets: (queryParams: string, queryParamName: string) => void;
}

// export function CategoryFacet({ title, facets }: FacetProps) {
//   return (
//     <div className={styles.facets}>
//       <h2>Categories</h2>
//       <ul>
//         {facets.map((item, index) => (
//           <li key={index}>
//             <input type='checkbox' id={`facet_${index}`} value={item._id} />
//             <label htmlFor={`facet_${index}`}>{item._id}</label>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export function Facet({
  title,
  facets,
  queryParamName,
  onSelectedFacets,
}: FacetProps) {
  const [seletedItems, setSelectedItems] = useState<string[]>([]);
  const handleFacetChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (seletedItems.includes(value)) {
      //remove from selected items
      const newSelectedItems = seletedItems.filter((item) => item !== value);

      if (newSelectedItems.length === 0) {
        onSelectedFacets('', queryParamName);
        setSelectedItems(newSelectedItems);
      } else {
        //create new query param
        const processedQueryParams =
          queryParamName + ':' + newSelectedItems.join('|');

        //call parent function
        onSelectedFacets(processedQueryParams, queryParamName);

        //update state
        setSelectedItems(newSelectedItems);
      }
    } else {
      //add to selected items
      const newSelectedItems = [...seletedItems, value];

      //create new query param
      const processedQueryParams =
        queryParamName + ':' + newSelectedItems.join('|');

      //call parent function
      onSelectedFacets(processedQueryParams, queryParamName);

      //update state
      setSelectedItems(newSelectedItems);
    }
  };

  const handleClearFacet = () => {
    setSelectedItems([]);
    onSelectedFacets('', queryParamName);
  };

  const handleOnLoad = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const selectedFacets = (queryParams.get('fs')?.split(';') ?? []).find(
      (item) => item.startsWith(queryParamName)
    );
    if (selectedFacets) {
      setSelectedItems(selectedFacets.split(':')[1].split('|'));
    }
  };

  const isCheckboxChecked = (value: string) => {
    return seletedItems.includes(value);
  };

  useEffect(() => {
    handleOnLoad();
  }, []);

  return (
    <div className={styles.facets}>
      <h2>{title}</h2>
      {seletedItems.length > 0 && (
        <button onClick={handleClearFacet}>Clear</button>
      )}
      <ul>
        {facets.values.map((item, index) => (
          <li key={item}>
            <input
              type='checkbox'
              checked={isCheckboxChecked(item)}
              id={`facet_${item}`}
              onChange={handleFacetChanged}
              value={item}
            />
            <label htmlFor={`facet_${item}`}>{item}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SpecsFacets({
  specs,
  onSpecsFacetsChanged,
  queryParamName,
}: {
  specs: FacetGroup[];
  onSpecsFacetsChanged: (queryParam: string, queryParamName: string) => void;
  queryParamName: string;
}) {
  const [selectedSpecsQueryParams, setSelectedSpecsQueryParams] = useState<
    string[]
  >([]);
  const handleSpecsSelectionChange = (specs: string, queryParam: string) => {
    //find and replace the specs that changed
    if (specs === '') {
      //find it and remove it
      const newSelectedSpecsQueryParams = selectedSpecsQueryParams.filter(
        (item) => !item.startsWith(queryParam)
      );

      onSpecsFacetsChanged(newSelectedSpecsQueryParams.join(';'), queryParam);

      setSelectedSpecsQueryParams(newSelectedSpecsQueryParams);
    } else if (
      selectedSpecsQueryParams.find((item) => item.startsWith(queryParam))
    ) {
      //find it and replace it
      const newSelectedSpecsQueryParams = selectedSpecsQueryParams.map(
        (item) => {
          if (item.startsWith(queryParam)) {
            return specs;
          }
          return item;
        }
      );

      onSpecsFacetsChanged(newSelectedSpecsQueryParams.join(';'), queryParam);

      setSelectedSpecsQueryParams(newSelectedSpecsQueryParams);
    } else {
      //add it
      const newSelectedSpecsQueryParams = [...selectedSpecsQueryParams, specs];

      onSpecsFacetsChanged(newSelectedSpecsQueryParams.join(';'), queryParam);

      setSelectedSpecsQueryParams(newSelectedSpecsQueryParams);
    }
  };

  const handleOnLoad = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const selectedFacets = (queryParams.get('fs')?.split(';') ?? []).filter(
      (item) => item.startsWith(queryParamName)
    );
    if (selectedFacets) {
      setSelectedSpecsQueryParams(selectedFacets);
    }
  };

  useEffect(() => {
    handleOnLoad();
  }, []);

  const renderedSpecs = specs.map((spec, index) => {
    return (
      <Facet
        key={spec._id}
        title={spec._id}
        facets={spec?? []}
        queryParamName={`${queryParamName}.${spec._id}`}
        onSelectedFacets={handleSpecsSelectionChange}
      />
    );
  });

  return <>{renderedSpecs}</>;
}
