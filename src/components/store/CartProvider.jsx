import React, { useReducer } from 'react';
import CartContext from './cart-context';
const defaultState = {
  items: [],
  totalPrice: 0,
};
const CartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const newCartItem = action.item;
    const index = state.items.findIndex((item) => item.id === newCartItem.id);
    if (index >= 0) {
      const updatedItems = [...state.items];
      updatedItems[index].amount += action.item.amount;
      return {
        items: updatedItems,
        totalPrice: state.totalPrice + action.item.price,
      };
    }
    const updatedItems = [...state.items, action.item];
    console.log(updatedItems);
    const updatedPrice =
      state.totalPrice + action.item.price * action.item.amount;
    return { items: updatedItems, totalPrice: updatedPrice };
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
    totalPrice: cartState.totalPrice,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
