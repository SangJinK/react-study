import React, { useContext } from 'react';
import styles from './MealItem.module.scss';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

const MealItem = ({ id, price, description, name }) => {
  const { meal, description: desc, price: priceStyle } = styles;
  const { addItem } = useContext(CartContext);
  const addToCartHandler = (amount) => {
    const item = {
      id,
      name,
      price: +price,
      amount: +amount,
    };
    addItem(item);
  };
  const formatPrice = new Intl.NumberFormat('ko-KR').format(price);
  return (
    <li className={meal}>
      <div>
        <h3>{name}</h3>
        <div className={desc}>{description}</div>
        <div className={priceStyle}>{formatPrice}원</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
