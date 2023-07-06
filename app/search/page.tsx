import React from 'react';
import styles from './page.module.css';
import { Product } from '../products/productsContext';
import AddToCartButton from '../components/addToCartButton/addToCartButton';
import { APIResponse } from '../types';

interface GetProductsParams {
  qp: string;
}

const getProducts = async ({ qp }: GetProductsParams): Promise<APIResponse> => {
  //induce slow network
  //await new Promise((resolve) => setTimeout(resolve, 15000));
  const response = await fetch(
    `${process.env.API_BASE_URL}/products/search?${qp}`,
    {
      cache: 'no-cache',
    }
  );
  const res = await response.json();

  return res as APIResponse;
};

interface LandingPageProps {
  searchParams: { t: string; fs: string };
}

async function SearchPage({ searchParams: { t, fs } }: LandingPageProps) {
  const encodedSearchTerm = encodeURIComponent(t);
  const encodedFacetSearch = fs ? encodeURIComponent(fs) : '';

  const qp = `t=${encodedSearchTerm}&fs=${encodedFacetSearch}`;

  const { error, messages, result, success } =
    (await getProducts({ qp })) || [];

  return (
    <div className={styles.productList}>
      {result.products.map((product: Product) => (
        <div key={product._id} className={styles.productCard}>
          <h2 className={styles.productName}>{product.name}</h2>
          <p className={styles.productDescription}>{product.description}</p>
          <p className={styles.productPrice}>Price: {product.price}</p>
          <AddToCartButton productId={product._id} />
        </div>
      ))}
    </div>
  );
}

export default SearchPage;
