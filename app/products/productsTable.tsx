'use client';
import React, { useState } from 'react';
import styles from './products.module.css';
import DeleteButton from './actionButton/deleteButton';
import { Product } from './productsContext';
import LinkButton from '../components/LinkButton';
import { useProducts } from './productsContext';

interface ProductsTableProps {
  products: Product[];
}
const ProductsTable = ({ products: initialProdut }: ProductsTableProps) => {
  const [products, setProducts] = useState(initialProdut);
  const handleDelete = async (id: string) => {
    setProducts(products.filter((product) => product._id !== id));
    await fetch(`http://196.49.16.7:3003/api/products/${id}`, {
      method: 'DELETE',
    });
  };
  console.log(products);
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHead}>
            <th className={styles.tableHeadCell}>Name</th>
            <th className={styles.tableHeadCell}>Description</th>
            <th className={styles.tableHeadCell}>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className={styles.tableBodyRow}>
              <td className={styles.tableBodyCell}>{product.name}</td>
              <td className={styles.tableBodyCell}>{product.description}</td>
              <td className={styles.tableBodyCell}>{product.price}</td>
              <td className={styles.tableBodyCell}>
                <LinkButton to={`/products/${product._id}`}>Edit</LinkButton>
                {/* <DeleteButton id={product._id}>Delete</DeleteButton> */}
                <button onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
