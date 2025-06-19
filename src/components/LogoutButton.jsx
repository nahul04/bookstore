import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo"); // illa na ithu remove pannunga
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} style={{ cursor: "pointer" }}>
      Logout
    </button>
  );
};

export default LogoutButton;
