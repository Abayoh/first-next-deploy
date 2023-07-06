'use client';
import React from 'react';
import styles from './actionButton.module.css';
import { useProducts } from '../productsContext';

interface ActionButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  id: string;
}

const DeleteButton = ({
  children,
  id,
  disabled = false,
}: ActionButtonProps) => {
  const { deleteProduct } = useProducts();
  const handleDelete = async () => {
    deleteProduct(id);
    await fetch(`http://196.49.16.7:3003/api/products/${id}`, {
      method: 'DELETE',
    });
  };
  return (
    <button
      className={styles.button}
      onClick={handleDelete}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default DeleteButton;
