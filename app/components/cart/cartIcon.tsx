'use client';
import React from 'react';
import styles from './cartIcon.module.css';
import Link from 'next/link';
import { useRoot } from '@/app/rootContext';

const CartIcon = () => {
  const {
    cart: { itemsCount, _id },
  } = useRoot();
  return (
    <Link href={`/cart/${_id}`}>
      <div className={styles.cartIcon}>
        <i className='fa fa-shopping-cart' aria-hidden='true'></i>
        {itemsCount > 0 && <div className={styles.cartCount}>{itemsCount}</div>}
      </div>
    </Link>
  );
};

export default CartIcon;
