/* AddProductForm.tsx */
'use client';
import React, { useRef, useState } from 'react';
import styles from './productForm.module.css';
import { createProduct } from '@/app/actions/productActions';
import CategorySelector from '@/app/components/category/productCategoryInputForm';
import { Category } from '@/app/types';

interface Specification {
  name: string;
  value: string;
}

function AddProductForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [specs, setSpecs] = useState<Specification[]>([]);
  const [category, setCategory] = useState<Category | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const stringifySpecs = JSON.stringify(specs);
    formData.set('specs', stringifySpecs);
    formData.set('category', JSON.stringify({categoryId: category?._id, name: category?.name}));
    specs.forEach((_, i) => {
      formData.delete(`${i}.name`);
      formData.delete(`${i}.value`);
    });
    const res = await createProduct(formData);
    if (res.success) {
      formRef.current?.reset();
      setSpecs([]);
      console.log('hey');
    }
  };

  const addSpecs = () => {
    const newSpecs = [...specs, { name: '', value: '' }];
    setSpecs(newSpecs);
  };

  const handleSpecChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    debugger;
    const [index, field] = event.target.name.split('.');
    const newSpecs = specs.map((spec, i) => {
      if (parseInt(index) === i) {
        const newSpec = { ...spec };
        newSpec[field as 'name' | 'value'] = value;
        return newSpec;
      }
      return spec;
    });

    setSpecs(newSpecs);
  };

  return (
    <form ref={formRef} className={styles.formContainer} action={handleSubmit}>
      <input
        className={styles.inputField}
        type='text'
        placeholder='Product Name'
        name='name'
      />
      <input
        type='text'
        placeholder='Product Price'
        className={styles.inputField}
        name='price'
      />
      <input
        type='number'
        placeholder='Quantity'
        className={styles.inputField}
        name='quantity'
      />
      <input
        type='text'
        placeholder='Brand'
        className={styles.inputField}
        name='brand'
      />
      <input
        type='text'
        placeholder='Rating'
        className={styles.inputField}
        name='rating'
      />
      <input
        type='text'
        placeholder='Condition'
        className={styles.inputField}
        name='condition'
      />
      <CategorySelector onCategorySelected={(c) => {setCategory({...c})}} />
      <textarea
        name='description'
        placeholder='Product Description'
        className={styles.inputField}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {!!specs.length && (
          <fieldset
            style={{
              padding: '10px',
              border: '2px solid lightgray',
              margin: '10px',
            }}
          >
            <legend>Specifications</legend>
            {specs.map((spec, i) => {
              return (
                <div key={i} style={{ display: 'flex' }}>
                  <span>
                    <input
                      className={styles.inputField}
                      type='text'
                      name={`${i}.name`}
                      onChange={handleSpecChange}
                      value={spec.name}
                      placeholder='Specification Name'
                    />
                  </span>{' '}
                  <span>
                    <input
                      className={styles.inputField}
                      type='text'
                      name={`${i}.value`}
                      onChange={handleSpecChange}
                      value={spec.value}
                      placeholder='specification Value'
                    />
                  </span>
                </div>
              );
            })}
          </fieldset>
        )}
        <div>
          <button className={styles.addButton} type='button' onClick={addSpecs}>
            Add Specs
          </button>
        </div>
      </div>
      <button className={styles.submitButton}>Submit Product</button>
    </form>
  );
}

export default AddProductForm;
