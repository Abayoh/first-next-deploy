'use client';
import React from 'react';
import styles from './signupPage.module.css';
import { signup } from '../actions/userActions';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

const SignupPage = () => {
  const { pending } = useFormStatus();
  const handleSignup = async (formData: FormData) => {
    const data = await signup(formData);
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Sign Up</h1>
      <form className={styles.form} action={handleSignup}>
        <input
          className={styles.input}
          type='text'
          placeholder='Name'
          name='name'
        />
        <input
          className={styles.input}
          type='email'
          placeholder='Email'
          name='email'
        />
        <input
          className={styles.input}
          type='password'
          placeholder='Password'
          name='password'
        />
        <input
          className={styles.input}
          type='password'
          placeholder='Confirm Password'
          name='confirm-password'
        />
        <div className={styles.addressSection}>
          <h2 className={styles.subHeading}>Address</h2>
          <div className={styles.addressField}>
            <label htmlFor='addressLine1'>Address Line 1</label>
            <input
              id='addressLine1'
              className={styles.input}
              type='text'
              placeholder='Address Line 1'
              name='addr1'
            />
          </div>
          <div className={styles.addressField}>
            <label htmlFor='city'>City</label>
            <input
              id='city'
              className={styles.input}
              type='text'
              placeholder='City'
              name='city'
            />
          </div>
        </div>
        <button className={styles.button} type='submit' disabled={pending}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
