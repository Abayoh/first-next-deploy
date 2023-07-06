import React from 'react';
import ProductsTable from './productsTable';

const getProducts = async () => {
  const response = await fetch(`${process.env.API_BASE_URL}/products`, {
    cache: 'no-cache',
  });
  const { products } = await response.json();
  console.log(products);
  return products;
};

async function ProductsPage() {
  const products = (await getProducts()) || [];
  return <ProductsTable products={products} />;
}

export default ProductsPage;
