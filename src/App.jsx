import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminLogin from './pages/AdminLogin';
import Login from './pages/login';
import AdminDashboard from './components/AdminDashboard';
import Home from './pages/Home';
import BookList from './pages/Booklist';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';
import Register from './pages/Register';
import Payment from './pages/payment';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<BookList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />  
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
