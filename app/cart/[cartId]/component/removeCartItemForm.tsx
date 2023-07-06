'use client';
import React from 'react';
import styles from './cartQuantityForm.module.css';
import { deleteItem } from '@/app/actions/cartActions';
import { useRoot } from '@/app/rootContext';

interface RemoveCartItemFormProps {
  cartId: string;
  itemId: string;
}

function RemoveCartItemForm({ cartId, itemId }: RemoveCartItemFormProps) {
  const { removeCartItem } = useRoot();
  const handleRemoveItem = async (formData: FormData) => {
    console.log('handleRemoveItem');
    const res = await deleteItem(formData);
    if (res.success) {
        console.log('item removed:', itemId)
      removeCartItem(itemId);
    }
  };
  return (
    <form action={handleRemoveItem}>
      <input type='hidden' name='cartId' value={cartId} />
      <input type='hidden' name='itemId' value={itemId} />
      <button className={styles.removeButton}>Remove</button>
    </form>
  );
}

export default RemoveCartItemForm;
