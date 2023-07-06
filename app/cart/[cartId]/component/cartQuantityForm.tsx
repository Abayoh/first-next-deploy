'use client';
import { useState, ChangeEvent, FormEvent, useRef } from 'react';
import styles from './cartQuantityForm.module.css';
import { changeQuantity } from '@/app/actions/cartActions';
import { useRoot } from '@/app/rootContext';

interface QuantityFormProps {
  cartId: string;
  quantity: number;
  itemId: string;
}

function QuantityForm({
  cartId,
  quantity: initialQuantity,
  itemId,
}: QuantityFormProps) {
  const [quantity, setQuantity] = useState<string | number>(initialQuantity);
  const [isCustomQuantity, setIsCustomQuantity] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { updatCartItemQuantity } = useRoot();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'custom') {
      setIsCustomQuantity(true);
    } else {
      setQuantity(event.target.value);
      setIsCustomQuantity(false);
      formRef.current?.requestSubmit(); // submit the form
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  };

  const handleSubmit = async (formData: FormData) => {
    console.log('handleSubmit');
    const res = await changeQuantity(formData);
    if (res.success) {
      const {
        result: { quantity: qty },
      } = res;
      console.log('qty', qty);
      updatCartItemQuantity(itemId, Number(qty));
    }
  };

  return (
    <form ref={formRef} className={styles.form} action={handleSubmit}>
      <input type='hidden' name='cartId' value={cartId} />
      <input type='hidden' name='itemId' value={itemId} />
      {isCustomQuantity ? (
        <input
          type='number'
          value={quantity}
          onChange={handleInputChange}
          className={styles.input}
          name='quantity'
        />
      ) : (
        <select
          value={quantity}
          onChange={handleChange}
          className={styles.select}
          name='quantity'
        >
          <option value=''>Select quantity</option>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
          <option value='custom'>More than 10</option>
        </select>
      )}
      {isCustomQuantity && (
        <input type='submit' value='Submit' className={styles.submit} />
      )}
    </form>
  );
}

export default QuantityForm;
