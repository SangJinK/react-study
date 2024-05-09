import React, { useContext, useEffect, useState } from 'react';
import styles from './HeaderCartButton.module.scss';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
const HeaderCartButton = ({ onShow }) => {
  const { items } = useContext(CartContext);
  const [isBump, setIsBump] = useState(false);
  const numberOfItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsBump(true);
    const aniTimer = setTimeout(() => {
      setIsBump(false);
    }, 300);
    return () => {
      clearTimeout(aniTimer);
    };
  }, [items]);
  return (
    <button
      className={`${styles.button} ${isBump ? styles.bump : ''}`}
      onClick={onShow}
    >
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>My Cart</span>
      <span className={styles.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
