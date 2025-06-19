
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './pages/login';
import Home from './pages/Home';
import Aboutus from './pages/AboutUs';
import BookList from './pages/Booklist';
import Cart from './pages/Cart';
import Register from './pages/Register';
import LogoutButton from "./components/LogoutButton";
import Payment from './pages/payment';
import { CartProvider } from './context/CartContext';


// Admin Components
import AdminDashboard from './Admin/AdminDashboard';
import AdminLogin from './Admin/AdminLogin'; 
import ManageUsers from './Admin/ManageUser';
import ManageBooks from './Admin/ManageBooks';
import ViewOrders from './Admin/ViewOrders'; 
import AddBook from './Admin/AddBook';
import EditBook from './Admin/EditBook';
import BookDetails from './components/BookDetails';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<BookList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/book/:id" element={<BookDetails />} />
          


          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              isAdminLoggedIn ? (
                <AdminDashboard />
              ) : (
                <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />
              )
            }
          />
         <Route path="/admin/dashboard" element={<AdminDashboard />} />
         <Route path="/admin/add-book" element={<AddBook />} />
         <Route path="/admin/manage-books" element={<ManageBooks />} />
         <Route path="/admin/manage-users" element={<ManageUsers />} />
         <Route path="/admin/view-orders" element={<ViewOrders />} />
         <Route path="/admin" element={<AdminLogin />} />
         <Route path="/admin/edit-book/:id" element={<EditBook />} />
         <Route path="/book/:id" element={<BookDetails />} />


        </Routes>
        
        
      </Router>
    </CartProvider>
  );
}

export default App;
