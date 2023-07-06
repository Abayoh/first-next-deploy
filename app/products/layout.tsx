import React from 'react';
import InitializeContext from './initializeContext';
import { Product, ProductProvider } from './productsContext';

// const products: Product[] = [
//   {
//     _id: '1',
//     name: 'Product 1',
//     price: 100,

//     description: 'This is product 1',
//   },
//   {
//     _id: '2',
//     name: 'Product 2',
//     price: 200,
//     description: 'This is product 2',
//   },
//   {
//     _id: '3',
//     name: 'Product 3',
//     price: 300,
//     description: 'This is product 3',
//   },
//   {
//     _id: '4',
//     name: 'Product 4',
//     price: 400,
//     description: 'This is product 4',
//   },
//   {
//     _id: '5',
//     name: 'Product 5',
//     price: 500,
//     description: 'This is product 5',
//   },
// ];

const getProducts = async () => {
  const response = await fetch('http://196.49.16.7:3003/api/products', {
    cache: 'no-cache',
  });
  const { products } = await response.json();
  return products;
};

interface ProductsLayoutProps {
  children: React.ReactNode;
}
async function ProductsLayout({ children }: ProductsLayoutProps) {
  
  return (
    <>
      {children}
      </>
  );
}

export default ProductsLayout;
