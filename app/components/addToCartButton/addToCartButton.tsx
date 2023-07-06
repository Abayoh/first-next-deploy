'use client';
import React from 'react';
import styles from './addToCartButton.module.css';
import { useRoot } from '@/app/rootContext';
import { saveItemToCart } from '@/app/actions/cartActions';

interface AddToCartButtonProps {
  productId: string;
}

const AddToCartButton = ({ productId }: AddToCartButtonProps) => {
  const {
    addItemToCart,
    user,
    cart: { _id: cartId },
  } = useRoot();

  const handleAddToCart = async (formData: FormData) => {
    const req = await saveItemToCart(formData);

    const { result } = req;
    if (req.success) {
      addItemToCart(result.item);
    }
  };

  return (
    <form action={handleAddToCart}>
      <input type='hidden' name='cartId' value={cartId} />
      <input type='hidden' value={productId} name='productId' />
      <button className={styles.addButton} type='submit' disabled={!user}>
        Add to Cart
      </button>
    </form>
  );
};

export default AddToCartButton;
