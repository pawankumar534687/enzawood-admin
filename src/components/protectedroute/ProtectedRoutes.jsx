import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); 

  if (!token) {
    return <Navigate to="/admin" />;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default ProtectedRoute;
