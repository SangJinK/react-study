import React, { useContext } from 'react';
import styles from './Cart.module.scss';
import CartModal from '../../UI/Modal/CartModal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = ({ onClose }) => {
  const {
    'cart-items': cartItemStyle,
    total,
    actions,
    'button--alt': btnAlt,
    button,
  } = styles;

  const { items, totalPrice } = useContext(CartContext);
  return (
    <CartModal onClose={onClose}>
      <ul className={cartItemStyle}>
        {items.map((cartItem) => (
          <CartItem key={cartItem.id} cart={cartItem} />
        ))}
      </ul>
      <div className={total}>
        <span>주문 총액</span>
        <span>{new Intl.NumberFormat('ko-KR').format(totalPrice)}</span>
      </div>
      <div className={actions}>
        <button className={btnAlt} onClick={onClose}>
          닫기
        </button>
        {items.length > 0 && <button className={button}>주문</button>}
      </div>
    </CartModal>
  );
};

export default Cart;
