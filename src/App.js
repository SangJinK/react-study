import './App.css';
import React, { useState } from 'react';

import Header from './components/Food/Layout/Header';
import Meals from './components/Food/Meals/Meals';
import CartProvider from './components/store/CartProvider';
import Cart from './components/Food/Cart/Cart';

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => setCartIsShown(true);
  const hideCartHandler = () => setCartIsShown(false);
  return (
    <>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <div id="main">
          <Meals />
        </div>
      </CartProvider>
    </>
  );
};

export default App;
