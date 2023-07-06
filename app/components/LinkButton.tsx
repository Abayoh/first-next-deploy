import React from 'react';
import Link from 'next/link';
import styles from './linkButton.module.css';

interface LinkButtonProps {
  to: string;
  children: React.ReactNode;
}
const LinkButton = ({ to, children}: LinkButtonProps) => {
  return (
    <Link href={to} className={styles.linkButton}>
      {children}
    </Link>
  );
};

export default LinkButton;
