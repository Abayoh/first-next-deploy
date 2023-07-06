'use client';
import React from 'react';
import styles from './loginPage.module.css';
import { login } from '../actions/userActions';
import { useRouter } from 'next/navigation';
import { Cart, useRoot } from '../rootContext';

const LoginPage = () => {
  const [error, setError] = React.useState('');
  const router = useRouter();
  const { setUser, setCart } = useRoot();
  const handleLogin = async (formData: FormData) => {
    const res = await login(formData);

    if (!res.success) {
      setError(res.error.message);
      return;
    }

    setUser(res.result.user);
    console.log(res.result.cart);
    //@ts-ignore
    setCart((cart: Cart)=>({...cart, ...res.result.cart}));

    router.push('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Login</h1>
      <form className={styles.form} action={handleLogin}>
        {error && <p className={styles.error}>{error}</p>}
        <input
          className={styles.input}
          type='email'
          placeholder='Email'
          name='email'
          onChange={handleChange}
        />
        <input
          className={styles.input}
          type='password'
          placeholder='Password'
          name='password'
          onChange={handleChange}
        />
        <button className={styles.button} type='submit'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
