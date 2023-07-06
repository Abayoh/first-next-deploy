import React from 'react';
import styles from './page.module.css';
import { Product } from './products/productsContext';
import AddToCartButton from './components/addToCartButton/addToCartButton';
import CartIcon from './components/cart/cartIcon';
import Head from 'next/head';
import Pagination from './components/pagination/pagination';
import { APIResponse } from './types';

interface GetProductsParams {
  page: number;
  limit: number;
}

const getProducts = async ({
  page = 0,
  limit,
}: GetProductsParams): Promise<APIResponse> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/products?${
      page > 0 && limit > 0 ? 'page=' + page + '&limit=' + limit : ''
    }`,
    {
      cache: 'no-cache',
    }
  );
  const res = await response.json();

  return res as APIResponse;
};

interface LandingPageProps {
  searchParams: { page: number; limit: number };
}

async function LandingPage({
  searchParams: { page, limit },
}: LandingPageProps) {
  const { error, messages, result, success } =
    (await getProducts({ page, limit })) || [];
  return (
    <div className={styles.container}>
      <Head>
        <title>My page title</title>
      </Head>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 className={styles.title}>Product List</h1>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
        />
        <CartIcon />
      </div>
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
      <div>
        <Pagination
          currentPage={result.next ? result.next.page - 1 : 1}
          limit={2}
          totalPages={result.pages}
        />
      </div>
    </div>
  );
}

export default LandingPage;
