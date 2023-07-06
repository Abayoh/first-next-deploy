'use server';
import { APIResponse } from '../types';
import { cookies } from 'next/headers';

export async function createProduct(formData: FormData): Promise<APIResponse> {
  try {
    const product = {
      name: formData.get('name') || '',
      price: formData.get('price') || '',
      description: formData.get('description') || '',
      quantity: formData.get('quantity') || '',
      brand: formData.get('brand') || '',
      condition: formData.get('condition') || '',
      rating: formData.get('rating') || '',
      category: formData.get('category') || '',
      specs: formData.get('specs') || '',
    };
    console.log(product);
    //get access token from cookie
    const { value } = cookies().get('x-session') || { value: '' };

    const post = await fetch(`${process.env.API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${value}`,
      },
      body: JSON.stringify(product),
      cache: 'no-cache',
    });

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
