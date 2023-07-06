'use client';
import React, { useEffect } from 'react';
import styles from './cart.module.css';
import QuantityForm from './component/cartQuantityForm';
import { useRoot } from '@/app/rootContext';
import RemoveCartItemForm from './component/removeCartItemForm';
import CheckItemForm from './component/checkItemForm';
import { useRouter } from 'next/navigation';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
}

const Cart = ({ items: initialItems }: CartProps) => {
  const {
    cart: { items = [], _id: cartId, itemsCount, total },
    setCart,
  } = useRoot();

  const router = useRouter();

  const onCheckout = async () => {};

  useEffect(() => {
    //@ts-ignore
    setCart((prevCart) => ({ ...prevCart, items: initialItems }));
  }, [initialItems, setCart]);

  const handleCheckout = async () => {
    router.push('/checkout');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cart</h2>
      {items.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item._id}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <CheckItemForm
                  itemId={item._id}
                  cartId={cartId}
                  selected={item.isSelected}
                />
                <p className={styles.itemName}>{item.name}</p>
                <p className={styles.itemPrice}>Price: {item.price}</p>
                <div
                  style={{
                    marginRight: '1rem',
                  }}
                >
                  <QuantityForm
                    itemId={item._id}
                    quantity={item.quantity}
                    cartId={cartId}
                  />
                </div>
                <p className={styles.itemTotal}>
                  Total: {item.quantity * item.price}
                </p>
                <RemoveCartItemForm itemId={item._id} cartId={cartId} />
              </div>
            </div>
          ))}
          <p
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'green',
            }}
          >
            Total: {total}
          </p>
          <button  className={styles.checkoutButton} onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
