import React, { useContext, useState } from 'react';
import styles from './MealItemForm.module.scss';
import Input from '../../../UI/Input/Input';

const MealItemForm = ({ id, onAddToCart }) => {
  const [amount, setAmount] = useState(1);
  const [value, setValue] = useState('1');
  const amountHandler = (amt) => {
    setValue(amt);
    setAmount(amt);
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    setValue(1);
    onAddToCart(amount);
  };

  return (
    <form className={styles.form} onSubmit={formSubmitHandler}>
      <Input
        onAdd={amountHandler}
        label="수량"
        input={{
          id: 'amount_' + id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',

          value,
        }}
      />
      <button>담기</button>
    </form>
  );
};

export default MealItemForm;
