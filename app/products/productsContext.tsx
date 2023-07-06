'use client';
import React, { useState, createContext, useContext } from 'react';

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}

interface ProductsContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  deleteProduct: (id: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
}
const ProductsContext = createContext<ProductsContextType>({
  products: [],
  setProducts: () => {},
  deleteProduct: () => {},
  addProduct: () => {},
  updateProduct: () => {},
});

interface ProductProviderProps {
  children: React.ReactNode;
}
export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);

  const deleteProduct = (id: string) => {
    console.log(id);
    setProducts(products.filter((product) => product._id !== id));
  };
  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };
  const updateProduct = (product: Product) => {
    const index = products.findIndex((p) => p._id === product._id);
    const newProducts = [...products];
    newProducts[index] = product;
    setProducts(newProducts);
  };
  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        deleteProduct,
        addProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
