'use client';
import React, { useRef, useState, useEffect } from 'react';
import { toggleItemSelection } from '@/app/actions/cartActions';
import { useRoot } from '@/app/rootContext';

interface CheckItemFormProps {
  itemId: string;
  cartId: string;
  selected: boolean;
}

function CheckItemForm({ itemId, cartId, selected }: CheckItemFormProps) {

  const formRef = useRef<HTMLFormElement>(null);
  const initialRender = useRef(true);

  const { changeItemSelection } = useRoot();
  const [isSelected, setIsSelected] = useState(selected);

  const onSelectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(event.target.checked);    
  };

  const handleSubmitOnSelectionChange = async (formData: FormData) => {
    const res = await toggleItemSelection(formData);
    
    if (res.success) {
      changeItemSelection(itemId, res.result.isSelected);
    }else{
        setIsSelected(!isSelected);
    }
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      formRef.current?.requestSubmit();
    }
  }, [isSelected]);

  return (
    <form ref={formRef} action={handleSubmitOnSelectionChange}>
      <input type='hidden' name='itemId' value={itemId} />
      <input type='hidden' name='cartId' value={cartId} />
      <input
        onChange={onSelectionChange}
        style={{
          marginRight: '1rem',
          width: '24px',
          height: '24px',
        }}
        type='checkbox'
        name='selection'
        checked={isSelected}
      />
    </form>
  );
}

export default CheckItemForm;
