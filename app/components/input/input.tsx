import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormInput.module.css';

interface FormInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({ label, value, onChange }:FormInputProps) => {
  return (
    <div className={styles.formInput}>
      <label className={styles.inputLabel}>{label}</label>
      <input
        type="text"
        className={styles.inputField}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};



export default FormInput;