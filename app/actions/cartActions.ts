'use server';
import { revalidateTag } from 'next/cache';
import { APIResponse } from '../types';
import { cookies } from 'next/headers';

export async function changeQuantity(formData: FormData): Promise<APIResponse> {
  try {
    const quantity = {
      quantity: formData.get('quantity') || '',
      cartId: formData.get('cartId') || '',
      itemId: formData.get('itemId') || '',
    };

    //get access token from cookie
    const { value } = cookies().get('x-session') || { value: '' };

    const post = await fetch(
      `${process.env.API_BASE_URL}/carts/${quantity.cartId}/items/${quantity.itemId}/quantity`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${value}`,
        },
        body: JSON.stringify({ quantity: quantity.quantity }),
        cache: 'no-cache',
      }
    );

    const data = await post.json();

    return data;
  } catch (error) {
    return {
      result: null,
      error: { message: (error as Error).message, status: 500 },
      success: false,
      messages: [],
    };
  }
}

export async function deleteItem(formData: FormData): Promise<APIResponse> {
  try {
    const item = {
      cartId: formData.get('cartId') || '',
      itemId: formData.get('itemId') || '',
    };

    //get access token from cookie
    const { value } = cookies().get('x-session') || { value: '' };

    const post = await fetch(
      `${process.env.API_BASE_URL}/carts/${item.cartId}/items/${item.itemId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${value}`,
        },
        cache: 'no-cache',
      }
    );

    revalidateTag('cart');

    const data = await post.json();

    return data;
  } catch (error) {
    return {
      result: null,
      error: { message: (error as Error).message, status: 500 },
      success: false,
      messages: [],
    };
  }
}

export async function saveItemToCart(formData: FormData): Promise<APIResponse> {
  try {
    const item = {
      cartId: formData.get('cartId') || '',
      productId: formData.get('productId') || '',
    };

    //get access token from cookie
    const { value } = cookies().get('x-session') || { value: '' };

    const post = await fetch(
      `${process.env.API_BASE_URL}/carts/${item.cartId}/items`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${value}`,
        },
        body: JSON.stringify({ productId: item.productId }),
        cache: 'no-cache',
      }
    );

    const data = await post.json();

    return data;
  } catch (error) {
    return {
      result: null,
      error: { message: (error as Error).message, status: 500 },
      success: false,
      messages: [],
    };
  }
}

export async function toggleItemSelection(
  form: FormData
): Promise<APIResponse> {
  try {
    //get access token from cookie
    const { value } = cookies().get('x-session') || { value: '' };

    const cartId = form.get('cartId') || '';
    const itemId = form.get('itemId') || '';
    const selected = form.get('selection') || '';

    const post = await fetch(
      `${process.env.API_BASE_URL}/carts/${cartId}/items/${itemId}/selected`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${value}`,
        },
        cache: 'no-cache',
        body: JSON.stringify({ selected: selected ? true : false }),
      }
    );

    const data = await post.json();

    return data;
  } catch (error) {
    return {
      result: null,
      error: { message: (error as Error).message, status: 500 },
      success: false,
      messages: [],
    };
  }
}
