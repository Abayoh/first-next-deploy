import React from 'react';
import AddProductForm from './productForm';
async function Page() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 4rem)',
      }}
    >
      <AddProductForm />
    </div>
  );
}

export default Page;
