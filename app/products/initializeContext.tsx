'use client';
import React from 'react';
import { Product, useProducts } from './productsContext';

interface InitializeContextProps {
  products: Product[];
}
function InitializeContext({ products }: InitializeContextProps) {
  const { setProducts } = useProducts();
  //setProducts(products);
  React.useEffect(() => {
    setProducts(products);
    }, [products, setProducts]);
  return <></>;
}

export default InitializeContext;
