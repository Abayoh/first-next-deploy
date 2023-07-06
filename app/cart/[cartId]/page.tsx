import React from 'react';
import Cart from './cart';
import { cookies } from 'next/headers';

const getCartItems = async (cartId: string) => {
  const { value } = cookies().get('x-session') || { value: '' };
  const response = await fetch(
    `${process.env.API_BASE_URL}/carts/${cartId}/items`,
    {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${value}`,
      },
      next:{
        tags: ['cart']
      }
    }
  );
  const res = await response.json();
  return res;
};

interface CartPageProps {
  params: {
    cartId: string;
  };
}

async function CartPage({ params: { cartId } }: CartPageProps) {
  const res = (await getCartItems(cartId)) || [];
  console.log(res.result);
  return (
    <>
      <Cart items={res.result.items} />
    </>
  );
}

export default CartPage;
