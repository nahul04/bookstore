// src/context/CartContext.js
import { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (book) => {
    console.log('addToCart called with book:', book); // Debug log
    setCartItems((prevItems) => [...prevItems, book]);
    // Send to backend
    const user = JSON.parse(localStorage.getItem('user'));
    // Try both book.id and book.book_id for compatibility
    const bookId = book.id || book.book_id;
    if (user && user.id && bookId) {
      fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, book_id: bookId })
      });
    } else {
      console.warn('Missing user.id or book.id/book.book_id', { user, book });
    }
  };

  const removeFromCart = (index) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
