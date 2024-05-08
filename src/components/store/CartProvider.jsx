import React, { useReducer } from 'react';
import CartContext from './cart-context';
const defaultState = {
  items: [],
};
const CartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedItems = [...state.items, action.item];
    console.log(updatedItems);
    return { items: updatedItems };
  } else if (action.type === 'REMOVE') {
    const updatedItems = state.items.filter((item) => item.id !== action.id);
    return { items: updatedItems };
  }
};
const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(CartReducer, defaultState);
  const cartContext = {
    items: cartState.items,
    addItem: (item) => dispatchCartAction({ type: 'ADD', item }),
    removeItem: (id) => dispatchCartAction({ type: 'REMOVE', id }),
    clearCart: () => dispatchCartAction({ type: 'CLEAR' }),
    totalAmount: cartState.items
      .map((item) => item.price * item.amount)
      .reduce((acc, curr) => acc + curr, 0),
    totalCount: cartState.items.reduce((acc, curr) => acc + curr.amount, 0),
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
