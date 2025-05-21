
import React from "react";
import { Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; 

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useCart();

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
