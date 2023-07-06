import React from 'react';
import FacetMenuClient from './facetMenu';
import { Suspense } from 'react';
import { APIResponse } from '../../types';

interface FacetMenuProps {
  params: {t:string,};
}

const getFacets = async (searchTerm: string): Promise<APIResponse> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/products/facets?${searchTerm}`,
    {
      cache: 'no-cache',
    }
  );
  const res = await response.json();

  return res as APIResponse;
};

async function FacetMenu({ params }: FacetMenuProps) {
    const encodedSearchTerm = encodeURIComponent(params.t);
    //induce a delay to simulate a slow network
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { error, messages, result, success } =
        (await getFacets(`t=${encodedSearchTerm}`)) || [];
    const facets = result.facetResults[0];
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FacetMenuClient facets={facets} />
    </Suspense>
  );
}

export default FacetMenu;
