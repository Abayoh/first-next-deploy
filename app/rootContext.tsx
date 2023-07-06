'use client';
import React, { createContext, useContext, useEffect } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  address: {
    addr1: string;
    city: string;
  };
}

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  isSelected: boolean;
}

export interface Cart {
  itemsCount: number;
  _id: string;
  total: number;
  items: CartItem[];
}

interface RootContextType {
  user: User | null;
  searchTerm: string;
  cart: Cart;
  setSearchTerm:(searchTerm:string)=>void;
  setUser: (user: User) => void;
  setCart: (cart: Cart) => void;
  updatCartItemQuantity: (itemId: string, quantity: number) => void;
  removeCartItem: (itemId: string) => void;
  addItemToCart: (item: CartItem) => void;
  changeItemSelection: (itemId: string, selection: boolean) => void;
}

function loadState<T>(key: string, defaultValue: T): T {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return defaultValue;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error(`Error loading state from localStorage key "${key}"`, err);
    return defaultValue;
  }
}

function saveState(key: string, value: any) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error(`Error saving state to localStorage key "${key}"`, err);
  }
}

const RootContext = createContext<RootContextType>({
  user: null,
  searchTerm:"",
  cart: {
    itemsCount: 0,
    _id: '',
    total: 0,
    items: [],
  },
  setSearchTerm:()=>{},
  setUser: () => {},
  setCart: () => {},
  updatCartItemQuantity: () => {},
  removeCartItem: () => {},
  addItemToCart: () => {},
  changeItemSelection: () => {},
});

interface RootProviderProps {
  children: React.ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
  const [user, setUser] = React.useState<User | null>(null);

  const [cart, setCart] = React.useState<Cart>({
    itemsCount: 0,
    _id: '',
    total: 0,
    items: [],
  });

  const [searchTerm, setSearchTerm]= React.useState<string>("");

  const updatCartItemQuantity = (itemId: string, quantity: number) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      const itemIndex = newCart.items.findIndex((item) => item._id === itemId);
      newCart.items[itemIndex].quantity = quantity;
      newCart.items[itemIndex].total =
        newCart.items[itemIndex].price * quantity;
      newCart.total = newCart.items.reduce((acc, item) => {
        if (item.isSelected === false) return acc;

         return acc + item.total
      }, 0);
      return newCart;
    });
  };

  const removeCartItem = (itemId: string) => {
    setCart((prevCart) => {
      const items = prevCart.items.filter((item) => item._id !== itemId);

      const itemsCount = items.length;
      const total = items.reduce((acc, item) => {
        if (item.isSelected === false) return acc;
        return acc + item.total;
      }, 0);

      return { ...prevCart, itemsCount, total, items };
    });
  };

  const addItemToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };

      //check if the item is already in the cart
      const itemIndex = newCart.items.findIndex((cartItem) => {
        if (!cartItem) return false;
        return cartItem._id === item._id;
      });

      if (itemIndex === -1) {
        newCart.items.push(item);
      }

      const itemsCount = newCart.items.length;

      const total = newCart.items.reduce((acc, item) => {
        if (item.isSelected === false) return acc;
        return acc + item.total;
      }, 0);

      return { ...newCart, itemsCount, total };
    });
  };

  const changeItemSelection = (itemId: string, selection: boolean) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      const itemIndex = newCart.items.findIndex((item) => item._id === itemId);
      newCart.items[itemIndex].isSelected = selection;
      const total = newCart.items.reduce((acc, item) => {
        if (item.isSelected === false) return acc;
        return acc + item.total;
      }, 0);
      return { ...newCart, total };
    });
  };


  useEffect(() => {
    const user = loadState<User | null>('user', null);
    const cart = loadState<Cart>('cart', {
      itemsCount: 0,
      _id: '',
      total: 0,
      items: [],
    });

    setCart(cart);
    setUser(user);
  }, []);

  useEffect(() => {
    saveState('user', user);
    saveState('cart', cart);
  }, [user, cart]);

  return (
    <RootContext.Provider
      value={{
        user,
        cart,
        searchTerm,
        setSearchTerm,
        setUser,
        setCart,
        updatCartItemQuantity,
        removeCartItem,
        addItemToCart,
        changeItemSelection,
      }}
    >
      {children}
    </RootContext.Provider>
  );
}

export function useRoot() {
  return useContext(RootContext);
}
