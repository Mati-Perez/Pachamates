// src/context/CartProvider.jsx
import { useState, useEffect } from 'react';
import { CartContext } from './CartContext';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('pachamates_cart');
    if(storedCart){
      setCartItems(JSON.parse(storedCart));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('pachamates_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (producto) => {
    setCartItems((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const removeFromCart = (id) => setCartItems((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => setCartItems([]);
  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      clearCart,
      increaseQuantity,
      decreaseQuantity, 
      totalItems,
      totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

