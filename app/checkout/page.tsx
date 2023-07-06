import React from 'react';
import { cookies } from 'next/headers';
import { APIResponse, cookieNames } from '../types';
import Checkout from './checkout';

const getCartSelectedProducts = async (): Promise<APIResponse> => {
  const token = cookies().get(cookieNames.SESSION)?.value || '';
  const cartId = cookies().get(cookieNames.CART)?.value || '';
  const response = await fetch(
    `${process.env.API_BASE_URL}/checkout/${cartId}`,
    {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['checkout'],
      },
    }
  );
  const res = await response.json();
  return res;
};

async function CheckoutPage() {
  const res = (await getCartSelectedProducts()) || [];
  if (!res.success) {
    return <div>Something went wrong</div>;
  }

  const { result } = res;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 100px)',
      }}
    >
      <Checkout checkoutData={result} />
    </div>
  );
}

export default CheckoutPage;
