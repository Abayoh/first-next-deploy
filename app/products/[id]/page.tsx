'use client'
import React, { useState } from 'react';
import styles from './productForm.module.css';
import FormInput from '../../components/input/input';
import { Product } from '../productsContext';
import { useRouter } from 'next/navigation';


const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const router = useRouter();

  const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleSubmit = async (event:React.FormEvent) => {
    
    
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Add Product</h2>
      <FormInput
        label="Name"
        value={name}
        onChange={handleNameChange}
      />

      <FormInput
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <FormInput
        label="Price"
        value={price}
        onChange={handlePriceChange}
      />

      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};



export default ProductForm;
