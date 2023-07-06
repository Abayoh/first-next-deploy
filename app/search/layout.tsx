import React from 'react';
import { APIResponse } from '../types';
import FacetMenu from '../components/facet';
import Head from 'next/head';
import styles from './page.module.css';
import Pagination from '../components/pagination/pagination';
import CartIcon from '../components/cart/cartIcon';

interface SearchPageLayoutProps {
  children: React.ReactNode;
}



function SearchPageLayout({ children }: SearchPageLayoutProps) {
  //@ts-ignore
  const childParams = children.props.childProp.segment.split('?')[1];
  const { t } = JSON.parse(childParams);
  if (!t) return <div>loading...</div>;
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
      <div style={{ display: 'flex', width: '100%' }}>
        <aside style={{ width: '400px' }}>
          <FacetMenu params={{t}} />
        </aside>
        {children}
      </div>
      <div>
       
      </div>
    </div>
  );
}

export default SearchPageLayout;
