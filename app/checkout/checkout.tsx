'use client';
import React from 'react';
import styles from './checkout.module.css';
import { CartItem } from '../rootContext';
import { it } from 'node:test';

type CheckoutItem = CartItem & { productId: string };
interface Summary {
  subTotal: number;
  shipping: number;
  tax: number;
}

interface CheckoutProps {
  checkoutData: {
    items: CheckoutItem[];
    shippingAddress: {
      addr1: string;
      city: string;
    };
    summary: Summary;
  };
}

function Checkout({ checkoutData }: CheckoutProps) {
  const { items, shippingAddress, summary } = checkoutData;
  console.log(items);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Checkout</h2>

      <div className={styles.section}>
        <h3 className={styles.subtitle}>Items:</h3>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.productId} className={styles.listItem}>
              <span>{item.name}</span>
              <span>{item.quantity}</span>
              <span>{item.price}</span>
              <span>{item.total}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h3 className={styles.subtitle}>Shipping Address:</h3>
        <p className={styles.address}>
          <span>Address1</span>
          <span>{shippingAddress.addr1}</span>
          <span>{shippingAddress.city}</span>
        </p>
        <p className={styles.address}>
          <span>City</span>
          <span>{shippingAddress.city}</span>
        </p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.subtitle}>Summary:</h3>
        <p>Subtotal: ${summary.subTotal.toFixed(2)}</p>
        <p>Shipping: ${summary.shipping.toFixed(2)}</p>
        <p>Tax: ${summary.tax.toFixed(2)}</p>
        <p>
          Total: $
          {(summary.subTotal + summary.shipping + summary.tax).toFixed(2)}
        </p>
      </div>

      <button className={styles.checkoutButton}>Confirm and Pay</button>
    </div>
  );
}

export default Checkout;
