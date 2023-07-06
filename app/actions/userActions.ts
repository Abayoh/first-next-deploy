'use server';
import { APIResponse, cookieNames } from '../types';

import { cookies, headers } from 'next/headers';

export async function signup(formData: FormData): Promise<APIResponse> {
  try {
    const newUser = {
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      password: formData.get('password') || '',
      address: {
        addr1: formData.get('addr1') || '',
        city: formData.get('city') || '',
      },
    };

    const post = await fetch(`${process.env.API_BASE_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    const data = await post.json();

    if (!data.success) {
      cookies().set({
        name: 'x-session',
        value: '',
        httpOnly: true,
        path: '/',
      });
      return data;
    }

    cookies().set({
      name: 'x-session',
      value: data.result.user._id,
      httpOnly: true,
      path: '/',
    });

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

export async function login(formData: FormData): Promise<APIResponse> {
  try {
    const user = {
      email: formData.get('email') || '',
      password: formData.get('password') || '',
    };

    const post = await fetch(`${process.env.API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
      cache: 'no-cache',
    });

    const data = await post.json();

    if (!data.success) {
      cookies().set({
        name: cookieNames.SESSION,
        value: '',
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
      });
      cookies().set({
        name: cookieNames.CART,
        value: '',
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
      });
      return data;
    }

    cookies().set({
      name: cookieNames.SESSION,
      value: data.result.user._id,
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
    });

    cookies().set({
      name: cookieNames.CART,
      value: data.result.cart._id,
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
    });

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
