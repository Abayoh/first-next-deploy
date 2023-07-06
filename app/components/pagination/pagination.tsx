'use client';
import React from 'react';
import Link from 'next/link';
import styles from './pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
}
const Pagination = ({ currentPage, totalPages, limit }: PaginationProps) => {
  const renderPageLink = (pageNumber: number) => {
    const url = `?page=${pageNumber}limit=${limit}`;
    return (
      <Link href={url} key={pageNumber} className={styles.button}>
        {pageNumber}
      </Link>
    );
  };

  return (
    <div className={styles.container}>
      {currentPage > 1 && (
        <Link
          href={`?page=${currentPage - 1}&limit=${limit}`}
          className={styles.button}
        >
          Prev
        </Link>
      )}

      {renderPageLink(currentPage)}

      {currentPage < totalPages && (
        <Link
          href={`?page=${currentPage + 1}&limit=${limit}`}
          className={styles.button}
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
